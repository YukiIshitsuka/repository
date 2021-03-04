import { MongoClient, Db, Collection, ClientSession, ReadPreferenceOrMode } from "mongodb";
export declare class MongoDB {
    private mongoClient;
    private DB;
    closing: boolean;
    init(): Promise<this>;
    executeDbAdminCommand(command: object, options?: {
        readPreference?: ReadPreferenceOrMode;
        session?: ClientSession;
    }): Promise<void>;
    getMongoClient(): MongoClient;
    getMongoDb(): Db;
    getMongoCollection<T>(name: string): Collection<T>;
    getMongoCollections(): Promise<Collection[]>;
    getMongoStartSession(): ClientSession;
    arraytojson<T>(rows: T[], key: string): {
        [key: string]: T;
    };
    existsCollection(collectionName: string): Promise<boolean>;
    createCollection<T = any>(collectionName: string): Promise<Collection<T>>;
    close(): Promise<void>;
}
export declare class MongoConnection {
    private static instance;
    static get connected(): boolean;
    static get(): Promise<MongoDB>;
}
