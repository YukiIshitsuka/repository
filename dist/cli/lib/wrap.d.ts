import { MongoDB } from "../../lib/mongo-client";
export declare const cliWrap: (func: (mongo: MongoDB) => Promise<void>) => Promise<void>;
