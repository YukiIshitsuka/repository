#!/usr/bin/env node
import * as path from "path";
import * as program from "commander";
import { ColorConsole } from "./lib/color";
import { exists, mkdir, write } from "./lib/file";
import { RepositoryCLIError } from "./error";
import { capitalizeFirstLetter } from "./lib/text";
import { cliWrap } from "./lib/wrap";

export class RepositoryGenerator {
	public static async do(name: string): Promise<void> {
		const generator = new RepositoryGenerator();
		await generator.createDirectory();
		await generator.do(name);
	}
	private async do(name: string): Promise<void> {
		const directory = this.getTargetDirectory(name);
		if (await exists(directory)) throw new RepositoryCLIError(`${name} is already exits...`);
		await mkdir(directory);
		const targetName = capitalizeFirstLetter(name);

		await write(
			path.join(directory, "index.ts"),
			`import { Repository, SchemaRules, Key, UniqueCandidate } from "@lu/repository";
import { ${targetName} } from "./model";

export class ${targetName}Repository extends Repository<${targetName}> {
	protected readonly collectionName = "${name}s";
	protected rules: SchemaRules<${targetName}> = {

	};
	protected indexes: UniqueCandidate<${targetName}>[][] = [];
	protected uniques: UniqueCandidate<${targetName}>[][] = [];
	public static async getAll(): Promise<${targetName}[]> {
		return this.select<${targetName}>({});
	}
	public static async get(id: Key): Promise<${targetName}> {
		return this.one<${targetName}>(id);
	}
}
`
		);
		await write(
			path.join(directory, "model.ts"),
			`import { DefaultSchema } from "@lu/repository";
export type ${targetName} = {
	
} & DefaultSchema;
`
		);
	}
	public async createDirectory(): Promise<void> {
		if (!process.env.REPOSITORIES_DIRECTORY) {
			throw new RepositoryCLIError("REPOSITORIES_DIRECTORY is not set...");
		}
		await mkdir(process.env.REPOSITORIES_DIRECTORY);
	}
	private getTargetDirectory(name: string): string {
		return path.join(process.env.REPOSITORIES_DIRECTORY, name);
	}
}

if (typeof require !== "undefined" && require.main === module) {
	// optionをたす場合はここにたす。
	ColorConsole.info("generate start");

	program.option("-r, --repository <string>", "generate repository name");
	program.parse(process.argv);
	(async () => {
		await cliWrap(async () => {
			const repositoryName = program.repository;
			if (!repositoryName) {
				throw "repository name is required!!";
			}
			await RepositoryGenerator.do(repositoryName);
			ColorConsole.success(`${repositoryName} repostiory generated!!`);
		});
	})();
} else {
	ColorConsole.error("It cannot be called from the outside...");
}
