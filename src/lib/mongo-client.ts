import { MongoClient, Db, Collection, ClientSession, ReadPreferenceOrMode } from "mongodb";

export class MongoDB {
	private mongoClient: MongoClient | undefined;
	private DB: Db | undefined;
	public closing = false;
	public async init(): Promise<this> {
		const user = encodeURIComponent(process.env.MONGO_USER as string);
		const password = encodeURIComponent(process.env.MONGO_PASSWORD as string);
		const authDB = encodeURIComponent(process.env.MONGO_AUTHDB as string);

		const url = `mongodb://${user}:${password}@${process.env.MONGO_PRIMARY_SERVER},${process.env.MONGO_SECONDARY_SERVER},${process.env.MONGO_ARBITER_SERVER}/${authDB}`;
		this.mongoClient = await MongoClient.connect(url, {
			useNewUrlParser: true,
			replicaSet: process.env.MONGO_REPRICASET,
			useUnifiedTopology: true,
		});

		this.DB = this.mongoClient.db(process.env.MONGO_DB);
		this.DB.on("close", () => {
			this.closing = true;
		});
		// initの際に入れ込む
		await this.executeDbAdminCommand({
			setParameter: 1,
			maxTransactionLockRequestTimeoutMillis: 1000,
		});
		return this;
	}
	public async executeDbAdminCommand(
		command: object,
		options?: { readPreference?: ReadPreferenceOrMode; session?: ClientSession }
	): Promise<void> {
		await this.DB.executeDbAdminCommand(command, options);
	}
	public getMongoClient(): MongoClient {
		return this.mongoClient as MongoClient;
	}
	public getMongoDb(): Db {
		return this.DB as Db;
	}
	public getMongoCollection<T>(name: string): Collection<T> {
		return this.getMongoDb().collection<T>(name);
	}
	public async getMongoCollections(): Promise<Collection[]> {
		return this.getMongoDb().collections();
	}
	public getMongoStartSession(): ClientSession {
		return this.getMongoClient().startSession();
	}
	public arraytojson<T>(rows: T[], key: string): { [key: string]: T } {
		const param: { [key: string]: any } = {};
		for (const row of rows) {
			param[row[key]] = row;
		}
		return param;
	}
	public async existsCollection(collectionName: string): Promise<boolean> {
		const cols = await this.getMongoDb().listCollections({ name: collectionName }).toArray();
		return cols.length !== 0;
	}
	public createCollection<T = any>(collectionName: string): Promise<Collection<T>> {
		return this.getMongoDb().createCollection<T>(collectionName);
	}
	public async close(): Promise<void> {
		if (!this.closing) {
			this.closing = true;
			await this.getMongoClient().close();
		}
	}
}

//しんぐるとん
export class MongoConnection {
	private static instance: MongoDB | undefined;
	public static get connected(): boolean {
		if (this.instance) {
			return this.instance.getMongoClient().isConnected();
		} else {
			return false;
		}
	}
	public static async get(): Promise<MongoDB> {
		if (!this.instance) {
			const mongo = await new MongoDB().init();
			if (!this.instance) {
				this.instance = mongo;
			} else {
				await mongo.close();
			}
		} else if (this.instance.closing) {
			//閉じていたら新しくつくる

			const mongo = await new MongoDB().init();
			this.instance = mongo;
		}
		if (!this.instance.getMongoClient().isConnected) {
			try {
				await this.instance.close();
			} catch (e) {
				console.error(e, "failed to close mongodbclient");
			}
			const mongo = await new MongoDB().init();
			this.instance = mongo;
		}
		return this.instance;
	}
}
