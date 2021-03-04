import { MongoDB } from "../lib/mongo-client";
export declare abstract class SeedBase {
    abstract up(mongo: MongoDB): Promise<void>;
    abstract down(mongo: MongoDB): Promise<void>;
}
