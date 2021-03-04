#!/usr/bin/env node
import { ColorConsole } from "./lib/color";
import { config } from "dotenv";
import { findTargetFiles } from "./lib/file";
import { Repository, AutoincrementRepository } from "../repository";
import * as path from "path";
import { MongoConnection } from "../lib/mongo-client";
import { RepositoryCLIError } from "./error";
import { cliWrap } from "./lib/wrap";

export class ReposiotyMigrate {
	public static async do(): Promise<void> {
		const migrate = new ReposiotyMigrate();
		await migrate.do();
	}
	private async do(): Promise<void> {
		const repos = await this.findTargetRepository();
		await this.migration(repos);
	}
	private async migration(repositories: Repository<any>[]): Promise<void> {
		const mongodb = await MongoConnection.get();
		mongodb.getMongoClient();
		try {
			// autoincrementはつくっておく。
			const repo = new AutoincrementRepository();
			await repo.makeCollection();
			for (const repository of repositories) {
				const collectionName = repository.getCollectionName();
				ColorConsole.info(`creating collection "${collectionName}"`);
				await repository.makeCollection();
			}
		} finally {
			await mongodb.close();
		}
	}
	private async findTargetRepository() {
		const repos: Repository<any>[] = [];
		if (!process.env.REPOSITORIES_DIRECTORY) {
			throw new RepositoryCLIError("REPOSITORIES_DIRECTORY is not set...");
		}
		const candFiles = await findTargetFiles(process.env.REPOSITORIES_DIRECTORY, "**/*.ts");
		for (const file of candFiles) {
			const repo = await this.importTarget(file);
			if (repo) repos.push(repo);
		}
		return repos;
	}
	private async importTarget(filepath: string): Promise<Repository<any>> {
		const result = await import(path.join(process.cwd(), filepath));
		if (typeof result !== "object") return undefined;
		for (const [key, target] of Object.entries(result)) {
			if (typeof target !== "function") continue;
			if (key !== target.name || !target.prototype.constructor) continue;
			const instance = new target.prototype.constructor();
			if (instance instanceof Repository && instance.isAutoMigrationTarget()) {
				return instance;
			}
		}
		return undefined;
	}
}

if (typeof require !== "undefined" && require.main === module) {
	// optionをたす場合はここにたす。
	ColorConsole.info("migration start");
	(async () => {
		await cliWrap(async () => {
			config();
			await ReposiotyMigrate.do();
			ColorConsole.success(`migration complete!!`);
		});
	})();
} else {
	ColorConsole.error("It cannot be called from the outside...");
}
