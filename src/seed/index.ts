import { MongoDB } from "../lib/mongo-client";

export abstract class SeedBase {
	public abstract up(mongo: MongoDB): Promise<void>;
	public abstract down(mongo: MongoDB): Promise<void>;
}
