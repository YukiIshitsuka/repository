import * as path from "path";
import { SeedBase } from "../../seed";
import { RepositoryCLIError } from "../error";
import { exists, mkdir, write } from "../lib/file";
import { MongoConnection } from "../../lib/mongo-client";
import { capitalizeFirstLetter } from "../lib/text";

export class Seed {
	public static async generate(name: string): Promise<void> {
		const seed = new Seed();
		await seed.generate(name);
	}
	public static async up(name: string): Promise<void> {
		const seed = new Seed();
		await seed.do(name);
	}
	public static async down(name: string): Promise<void> {
		const seed = new Seed();
		await seed.down(name);
	}
	private getTargetFilepath(name: string): string {
		if (!process.env.SEED_DIRECTORY) throw new RepositoryCLIError(`SEED_DIRECTORY is not set...`);
		return path.join(process.env.SEED_DIRECTORY, `${name}.ts`);
	}
	protected async do(name: string): Promise<void> {
		const mongo = await MongoConnection.get();
		const seed = await this.importSeedMocules(name);
		await seed.up(mongo);
		await mongo.close();
	}
	protected async down(name: string): Promise<void> {
		const mongo = await MongoConnection.get();
		const seed = await this.importSeedMocules(name);
		await seed.down(mongo);
		await mongo.close();
	}
	protected async generate(name: string): Promise<void> {
		await this.createDirectory();
		const filepath = this.getTargetFilepath(name);
		if (await exists(filepath)) throw new RepositoryCLIError(`${name} is already exits...`);
		const targetName = capitalizeFirstLetter(name);
		const text = `import { SeedBase, MongoDB } from "@lu/repository";

export class ${targetName}Seed extends SeedBase {
	public async up(mongo: MongoDB): Promise<void> {

	}
	public async down(mongo: MongoDB): Promise<void> {

	}
}
`;
		const targetFilepath = this.getTargetFilepath(name);
		await write(targetFilepath, text);
	}
	private async createDirectory(): Promise<void> {
		if (!process.env.SEED_DIRECTORY) {
			throw new RepositoryCLIError("SEED_DIRECTORY is not set...");
		}
		await mkdir(process.env.SEED_DIRECTORY);
	}

	protected async importSeedMocules(name: string): Promise<SeedBase> {
		const filepath = this.getTargetFilepath(name);
		if ((await exists(filepath)) === false) throw new RepositoryCLIError(`${name} is not fount...`);
		const result = await import(path.join(process.cwd(), filepath));
		if (typeof result !== "object") return undefined;
		for (const [key, target] of Object.entries(result)) {
			if (typeof target !== "function") continue;
			if (key !== target.name || !target.prototype.constructor) continue;
			const instance = new target.prototype.constructor();
			if (instance instanceof SeedBase) {
				return instance;
			}
		}
	}
}
