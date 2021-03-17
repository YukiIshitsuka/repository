/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MongoConnection, MongoDB } from "../lib/mongo-client";
import {
	FilterQuery,
	UpdateQuery,
	ClientSession,
	ObjectID,
	FindOneOptions,
	CollectionAggregationOptions,
	InsertWriteOpResult,
	InsertOneWriteOpResult,
	Cursor,
	Db,
	Collection,
	OptionalId,
	ObjectId,
} from "mongodb";
import { Rules, Validator, Rule, ValidationError } from "@lu/validator";
import { RepositoryInvalidError } from "../lib/error";
import { transaction, wrapTransaction } from "../lib/transaction";
// import { AutoincrementRepository, Seq } from "./autoincrement";
import { MatchNames, Phantom } from "../types";

export type DefaultTimestampSchema = {
	createdAt: Date;
	updatedAt: Date;
};

export type AutoIncrementColumn<T extends string> = {
	[key in T]: Seq;
};
export type AutoIncrementIds<TShema extends DefaultSchema> = MatchNames<TShema, Seq>;

export type WithoutAutoIncrement<T> = Omit<T, MatchNames<T, Seq>>;

export type Key = ObjectId | string | number;
export type DefaultId = { _id: Key };
export type DefaultSchema = DefaultId & DefaultTimestampSchema;

export type WithoutDefaultColumn<T extends DefaultSchema> = Omit<T, keyof DefaultSchema> & Partial<DefaultId>;

export type WithoutAutoGenerateColumn<T extends DefaultSchema> = WithoutAutoIncrement<WithoutDefaultColumn<T>>;

export type AutoIncrementRule = { type: "autoincrement" };
export type AutoInrementRule<TShema extends DefaultSchema> = AutoIncrementIds<TShema> extends never
	? {}
	: { [key in AutoIncrementIds<TShema>]: AutoIncrementRule };

export type SchemaRules<TShema extends DefaultSchema> = Rules<WithoutAutoIncrement<WithoutDefaultColumn<TShema>>> &
	AutoInrementRule<TShema>;

export type UniqueCandidate<TShema extends DefaultSchema> = keyof WithoutDefaultColumn<TShema>;

class BaseRepository<RepositorySchema extends DefaultSchema> {
	private autoincrementRepo: AutoincrementRepository;
	protected collectionName: string;
	protected rules: SchemaRules<RepositorySchema>;
	protected indexes: UniqueCandidate<RepositorySchema>[][];
	protected uniques: UniqueCandidate<RepositorySchema>[][];
	protected attrebutes: Partial<RepositorySchema>;
	protected autoMigration = true;
	protected temporaryUniqueCheckData: Map<string, Partial<RepositorySchema>>;
	/**
	 * migrationを自動実行するかどうか。
	 * @returns {boolean}
	 */
	public isAutoMigrationTarget(): boolean {
		return this.autoMigration;
	}
	//transaction decoratorがセットしてくれる
	private _session: ClientSession | undefined = undefined;

	constructor(session?: ClientSession) {
		if (session) {
			this._session = session;
		}
	}
	protected getAutoincrementRepository(): AutoincrementRepository {
		if (!this.autoincrementRepo) {
			this.autoincrementRepo = new AutoincrementRepository(this.getSession());
		}
		return this.autoincrementRepo;
	}
	protected getDate() {
		return new Date();
	}
	/**
	 * データのセット
	 * @param {any} attrebutes
	 * @returns {Promise<void>}
	 */
	public async set(attrebutes: any): Promise<void> {
		if (typeof attrebutes !== "object") return;
		if (!this.attrebutes) {
			this.attrebutes = {};
		}
		const tmp = await this.parseOptional(attrebutes);
		this.attrebutes = { ...this.attrebutes, ...tmp };
		if ("_id" in attrebutes && (await BaseRepository.exist(attrebutes["_id"]))) {
			this.attrebutes._id = new ObjectId(attrebutes["_id"]);
		}
	}
	/**
	 * 検索をかけて値をセットする。
	 * @param {Key} id
	 */
	public async findAndSet(id: Key) {
		const target = await this.findOne({ _id: this.parseId(id) } as FilterQuery<RepositorySchema>);
		if (!target) throw new RepositoryInvalidError("targe id is not found...");
		this.attrebutes = target;
	}
	/**
	 * attrebutesにセットされているデータを保存する。
	 * @returns {Promise<void>}
	 */
	public async save(): Promise<void> {
		if (!this.attrebutes) throw new RepositoryInvalidError("must set attrebutes...");
		if (this.attrebutes._id) {
			const { _id, ...attrebutes } = this.attrebutes;
			await this.update({ _id: this.parseId(_id) } as FilterQuery<RepositorySchema>, {
				$set: attrebutes as Partial<RepositorySchema>,
			});
		} else {
			const result = await this.insert(this.attrebutes);
			this.attrebutes._id = result.insertedId;
		}
	}
	/**
	 * コレクション名を取得
	 * @returns {string}
	 */
	public static getCollectionName(): string {
		const repo = new this();
		return repo.collectionName;
	}
	/**
	 * セットしたattrebutestのclear
	 * @returns {void}
	 */
	public clearAttrebutes(): void {
		this.attrebutes = {};
	}
	/**
	 * セッションを取得する。
	 * @returns {ClientSession | undefined}
	 */
	public getSession(): ClientSession | undefined {
		return this._session;
	}
	/**
	 * セッションをセットする
	 * @param {ClientSession} session
	 * @returns {this}
	 */
	public setSession(session?: ClientSession): this {
		this._session = session;
		return this;
	}
	/**
	 * コレクション名の取得
	 * @returns {string}
	 */
	public getCollectionName(): string {
		if (!this.collectionName) throw new RepositoryInvalidError("must setting collection name!!");
		return this.collectionName;
	}
	/**
	 * インスタンスの取得
	 * @returns {Repository<T>}
	 */
	public static getInstance<T extends DefaultSchema>(): Repository<T> {
		return new (this.constructor as new () => Repository<T>)();
	}
	public async getDB(): Promise<Db> {
		const mongodb = await MongoConnection.get();
		return mongodb.getMongoDb();
	}
	public async getMongoDB(): Promise<MongoDB> {
		const mongodb = await MongoConnection.get();
		return mongodb;
	}
	public async collection(): Promise<Collection<RepositorySchema>> {
		return (await this.getDB()).collection<RepositorySchema>(this.getCollectionName());
	}
	protected getRules(): Rules<WithoutAutoGenerateColumn<RepositorySchema>> {
		if (!this.rules) throw new RepositoryInvalidError("must setting document validation rule!!");
		return (Object.entries(this.rules) as [
			keyof WithoutDefaultColumn<RepositorySchema>,
			Rule | AutoIncrementRule
		][]).reduce((a, [key, rule]) => {
			if (rule.type === "autoincrement") return a;
			return {
				...a,
				[key]: rule,
			} as Rules<any>;
		}, {}) as Rules<WithoutAutoGenerateColumn<RepositorySchema>>;
	}
	private getAutoIncrementNames(): MatchNames<RepositorySchema, Seq>[] {
		const tmp = (Object.entries(this.rules) as [
			keyof WithoutDefaultColumn<RepositorySchema>,
			Rule | AutoIncrementRule
		][]).reduce((a, [key, rule]) => {
			if (rule.type !== "autoincrement") return a;
			a.push(key);
			return a;
		}, []);
		return tmp as MatchNames<RepositorySchema, Seq>[];
	}
	public generateAutoincrement(): Promise<Seq> {
		return this.getAutoincrementRepository().geneate(this.collectionName);
	}
	public async generateAutoIncrementColumn(): Promise<{ [key in AutoIncrementIds<RepositorySchema>]: Seq }> {
		const tmp: { [key in AutoIncrementIds<RepositorySchema>]?: Seq } = {};
		for (const columnName of this.getAutoIncrementNames()) {
			tmp[columnName] = await this.generateAutoincrement();
		}
		return tmp as { [key in AutoIncrementIds<RepositorySchema>]: Seq };
	}
	public async parseInsertDoc(doc: any): Promise<WithoutDefaultColumn<RepositorySchema>> {
		return {
			...(await this.parse(doc)),
			...(await this.generateAutoIncrementColumn()),
		} as any;
	}
	public async parse(doc: any): Promise<WithoutAutoGenerateColumn<RepositorySchema>> {
		return Validator.parse(doc, this.getRules());
	}
	public async parseOptional(doc: any): Promise<Partial<WithoutAutoGenerateColumn<RepositorySchema>>> {
		const rules = (Object.entries(this.getRules()) as [
			keyof WithoutAutoGenerateColumn<RepositorySchema>,
			Rule<keyof WithoutAutoGenerateColumn<RepositorySchema>> | AutoIncrementRule
		][]).reduce((a, [key, rule]) => {
			if (rule.type === "autoincrement") return a;
			return {
				...a,
				[key]: {
					...rule,
					isOptional: true,
				},
			};
		}, {}) as Rules<Partial<WithoutAutoGenerateColumn<RepositorySchema>>>;
		return Validator.parse(doc, rules);
	}
	public getTargetRules<K extends keyof WithoutDefaultColumn<RepositorySchema>>(keys: K[]) {
		return (Object.entries(this.getRules()) as [
			keyof WithoutDefaultColumn<RepositorySchema>,
			Rule<WithoutDefaultColumn<RepositorySchema>[keyof WithoutDefaultColumn<RepositorySchema>]>
		][]).reduce((a, [key, rule]) => {
			if (!keys.includes(key as any)) return a;
			return {
				...a,
				[key]: rule,
			};
		}, {}) as Rules<Pick<WithoutDefaultColumn<RepositorySchema>, K>>;
	}
	public getTargetRulesOptional<K extends keyof WithoutDefaultColumn<RepositorySchema>>(keys: K[]) {
		return (Object.entries(this.getRules()) as [
			keyof WithoutDefaultColumn<RepositorySchema>,
			Rule<WithoutDefaultColumn<RepositorySchema>[keyof WithoutDefaultColumn<RepositorySchema>]>
		][]).reduce((a, [key, rule]) => {
			if (!keys.includes(key as any)) return a;
			return {
				...a,
				[key]: { ...rule, isOptional: true } as Rule,
			};
		}, {}) as Rules<Pick<WithoutDefaultColumn<RepositorySchema>, K>>;
	}
	public async parseTargetField<K extends keyof WithoutDefaultColumn<RepositorySchema>>(
		doc: any,
		keys: K[]
	): Promise<Pick<WithoutDefaultColumn<RepositorySchema>, K>> {
		const rules = this.getTargetRules(keys);
		return Validator.parse(doc, rules);
	}
	public async parseTargetFieldOptional<K extends keyof WithoutDefaultColumn<RepositorySchema>>(
		doc: any,
		keys: K[]
	): Promise<Partial<Pick<WithoutDefaultColumn<RepositorySchema>, K>>> {
		const rules = this.getTargetRulesOptional(keys);
		return Validator.parse(doc, rules);
	}
	public async findToArray(
		query: FilterQuery<RepositorySchema>,
		options?: FindOneOptions<RepositorySchema> | undefined
	): Promise<RepositorySchema[]> {
		const cursor = await this.find(query, options);
		return cursor.toArray();
	}
	public async find(
		query: FilterQuery<RepositorySchema>,
		options?: FindOneOptions<RepositorySchema> | undefined
	): Promise<Cursor<RepositorySchema>> {
		const collection = await this.collection();
		return collection.find(query, { ...options, session: this.getSession() } as FindOneOptions<any>);
	}
	/**
	 * 指定キーの最大値を取得する。
	 * @param {T} key
	 * @returns {( RepositorySchema)[T]}
	 */
	public async max<T extends keyof RepositorySchema>(key: T): Promise<RepositorySchema[T]> {
		const collection = await this.collection();
		const maxValue = await collection
			.find({}, { projection: { [key]: 1 } })
			.sort({ [key]: -1 })
			.limit(1)
			.toArray();
		if (!maxValue || maxValue.length === 0) {
			return 0 as any;
		} else {
			return maxValue[0][key];
		}
	}
	/**
	 * 全件取得
	 * @returns {Promise<Cursor<( RepositorySchema)>>}
	 */
	public async all(): Promise<Cursor<RepositorySchema>> {
		const collection = await this.collection();
		return collection.find();
	}
	/**
	 * 取得（1件）
	 * @param {FilterQuery<( RepositorySchema)>} query 検索条件
	 * @param {FindOneOptions<( RepositorySchema)>} findOneOptions 検索オプション
	 * @returns {Promise<RepositorySchema>}
	 */
	public async findOne(
		query: FilterQuery<RepositorySchema>,
		findOneOptions?: FindOneOptions<RepositorySchema>
	): Promise<RepositorySchema> {
		const collection = await this.collection();
		return collection.findOne(query, { ...findOneOptions, session: this.getSession() } as FindOneOptions<any>);
	}
	public async uniqueCheck(doc: WithoutAutoGenerateColumn<DefaultSchema>) {
		for (const uniques of this.uniques) {
			if (uniques.length === 0) continue;
			if (!this.temporaryUniqueCheckData) this.temporaryUniqueCheckData = new Map();
			const query: Partial<RepositorySchema> = uniques.reduce((a, b: any) => {
				return { ...a, [b]: doc[b] } as Partial<RepositorySchema>;
			}, {});
			const key = JSON.stringify(query);
			if (this.temporaryUniqueCheckData.has(key)) {
				const { label } = this.rules[uniques[0] as any];
				throw new ValidationError({ [uniques[0]]: `${label}：${query[uniques[0]]}はすでに登録されています。` });
			}
			const result = await this.findToArray(query);
			if (result.length) {
				const { label } = this.rules[uniques[0] as any];
				throw new ValidationError({ [uniques[0]]: `${label}：${query[uniques[0]]}はすでに登録されています。` });
			}
			this.temporaryUniqueCheckData.set(key, query);
		}
	}
	/**
	 * 作成
	 * @param {any} doc
	 * @param {boolean} validated
	 * @returns {Promise<InsertOneWriteOpResult< RepositorySchema>>}
	 */
	public async insert(
		doc: any | WithoutAutoGenerateColumn<RepositorySchema>,
		validated = false
	): Promise<InsertOneWriteOpResult<RepositorySchema>> {
		const now = this.getDate();
		const insertDoc = validated ? (doc as WithoutAutoGenerateColumn<DefaultSchema>) : await this.parseInsertDoc(doc);
		console.log(this.getCollectionName(), this.getSession() ? this.getSession().id : undefined);
		const collection = await this.collection();
		// ユニークが制約があれば、ユニークチェック
		if (this.uniques.length) await this.uniqueCheck(insertDoc);
		const result = await collection.insertOne(
			{ ...insertDoc, createdAt: now, updatedAt: now } as OptionalId<RepositorySchema>,
			{ session: this._session } as FindOneOptions<any>
		);
		return result as InsertOneWriteOpResult<RepositorySchema>;
	}
	/**
	 * 作成（複数）
	 * @param {any[]} docs
	 * @returns {Promise<InsertWriteOpResult< RepositorySchema>>}
	 */
	@transaction()
	public async insertMany(
		docs: any[] | WithoutAutoGenerateColumn<RepositorySchema>[]
	): Promise<InsertWriteOpResult<RepositorySchema>> {
		if (!Array.isArray(docs)) {
			throw new RepositoryInvalidError("不正なリクエストです。");
		}
		const insertDocs: WithoutDefaultColumn<RepositorySchema>[] = [];
		const doUniqueCheck = this.uniques.length > 0;
		for (const doc of docs) {
			const insertDoc = await this.parseInsertDoc(doc);
			if (doUniqueCheck) await this.uniqueCheck(doc);
			insertDocs.push(insertDoc);
		}
		const collection = await this.collection();
		const now = this.getDate();
		const result = await collection.insertMany(
			insertDocs.map((doc) => {
				return { ...doc, createdAt: now, updatedAt: now };
			}) as OptionalId<RepositorySchema>[],
			{
				session: this._session,
			}
		);
		return result as InsertWriteOpResult<RepositorySchema>;
	}
	/**
	 * 指定のキーを元にjsonを作成
	 * @param {T[]} rows データの配列
	 * @param {string} usekey 対象とするキー名称
	 * @returns { [k: string]: T }
	 */
	public static arraytojson<T>(rows: T[], usekey: string): { [k: string]: T } {
		const param: { [k: string]: T } = {};
		for (const row of rows) {
			const k = (row as any)[usekey];
			let key: string | number;
			if (typeof k === "object") {
				key = (k as ObjectID).toHexString();
			} else {
				key = k;
			}
			param[key] = row;
		}
		return param;
	}
	/**
	 * upsertする。（あれば更新、なければ作成）
	 * @param {FilterQuery< RepositorySchema>} filter 検索条件
	 * @param {UpdateQuery< RepositorySchema>} query 更新内容
	 * @returns {Promise<Key>} _idを返却
	 */
	public async upsert(filter: FilterQuery<RepositorySchema>, query: UpdateQuery<RepositorySchema>): Promise<Key> {
		const collection = await this.collection();
		return new Promise((resolve, reject) => {
			collection.updateOne(filter, query, { upsert: true, session: this._session }, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					if (result.upsertedId) {
						resolve(result.upsertedId._id);
					} else {
						resolve(undefined);
					}
				}
			});
		});
	}
	/**
	 * データの削除（複数）
	 * @param {FilterQuery< RepositorySchema>} filter 検索条件
	 * @returns {Promise<number>} 削除件数
	 */
	public async deleteMany(filter: FilterQuery<RepositorySchema>): Promise<number> {
		const collection = await this.collection();
		return new Promise((resolve, reject) => {
			collection.deleteMany(filter, { session: this._session }, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.deletedCount);
				}
			});
		});
	}

	/**
	 * データの削除
	 * @param {FilterQuery< RepositorySchema>} filter 検索条件
	 * @returns {Promise<number>} 削除件数
	 */
	public async delete(filter: FilterQuery<RepositorySchema>): Promise<number> {
		const collection = await this.collection();
		return new Promise((resolve, reject) => {
			collection.deleteOne(filter, { session: this._session }, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.deletedCount);
				}
			});
		});
	}
	/**
	 * データを更新する。（複数レコード）
	 * @param {FilterQuery< RepositorySchema>} filter 検索条件
	 * @param {UpdateQuery< RepositorySchema>} query 更新内容
	 * @returns {Promise<number>} 更新件数
	 */

	public async updateMany(
		filter: FilterQuery<RepositorySchema>,
		query: UpdateQuery<RepositorySchema>
	): Promise<number> {
		const collection = await this.collection();
		// 更新時間を必ずsetする
		if (!query.$set) query.$set = {};
		if (!query.$set.updatedAt) {
			query.$set = { ...query.$set, updatedAt: this.getDate() };
		}
		return new Promise((resolve, reject) => {
			collection.updateMany(filter, query, { upsert: false, session: this._session }, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.matchedCount);
				}
			});
		});
	}
	/**
	 * データを更新する。
	 * @param {FilterQuery< RepositorySchema>} filter 検索条件
	 * @param {UpdateQuery< RepositorySchema>} query 更新内容
	 * @returns {Promise<number>} 更新件数
	 */
	public async update(filter: FilterQuery<RepositorySchema>, query: UpdateQuery<RepositorySchema>): Promise<number> {
		const collection = await this.collection();
		// 更新時間を必ずsetする
		if (!query.$set) query.$set = {};
		if (!query.$set.updatedAt) {
			query.$set = { ...query.$set, updatedAt: this.getDate() };
		}
		return new Promise((resolve, reject) => {
			collection.updateOne(filter, query, { upsert: false, session: this._session }, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.matchedCount);
				}
			});
		});
	}
	/**
	 * コレクションを作成する。
	 * @returns {Promise<void>}
	 */
	public async makeCollection(): Promise<void> {
		const collectionName = this.getCollectionName();
		console.log(`collection ${collectionName} created!!`);
		const mongodb = await this.getMongoDB();
		if (await mongodb.existsCollection(collectionName)) {
			return console.log(`collection "${collectionName}" already exists. skipping...`);
		}
		await mongodb.createCollection(collectionName);
		const collection = await this.collection();
		console.log("indexes::", this.indexes);
		const indexes = this.indexes.map((index) => {
			const tmp: { [key in UniqueCandidate<RepositorySchema>]?: 1 } = {};
			for (const key of index) {
				tmp[key] = 1;
			}
			return { key: tmp };
		});
		console.log("uniques::", this.uniques);
		const uniques = this.uniques.map((unique) => {
			const tmp: { [key in UniqueCandidate<RepositorySchema>]?: 1 } = {};
			for (const key of unique) {
				tmp[key] = 1;
			}
			return { key: tmp, unique: true }; // unique制約を追加
		});
		if (indexes.length || uniques.length) {
			await collection.createIndexes([...indexes, ...uniques]);
		}
		console.log(`collection ${this.collectionName} created!!`);
	}
	/**
	 *
	 * @param {object[]} pipeline
	 * @param {CollectionAggregationOptions} [options = undefined]
	 * @returns {Promise<T[]>}
	 */
	public async aggregate<T>(pipeline: object[], options?: CollectionAggregationOptions): Promise<T[]> {
		const collection = await this.collection();
		return await collection.aggregate<T>(pipeline, options).toArray();
	}
	/**
	 * データがいくつか
	 * @returns {Promise<number>}
	 */
	public static async count(): Promise<number> {
		const repo = new this();
		const cursor = await repo.all();
		return cursor.count();
	}
	/**
	 * 対象のIDのデータが存在するか
	 * @param {Key} id 検索対象のID
	 * @returns {Promise<boolean>}
	 */
	public async exist(id: Key): Promise<boolean> {
		return !!id && !!(await this.findOne({ _id: this.parseId(id) as any }));
	}
	/**
	 * 対象のIDのデータが存在するか
	 * @param {Key} id 検索対象のID
	 * @returns {Promise<boolean>}
	 */
	public static async exist(id: Key): Promise<boolean> {
		const repo = new this();
		return !!id && !!(await repo.findOne({ _id: repo.parseId(id) }));
	}
	/**
	 * 作成
	 * @param {WithoutAutoGenerateColumn<TSchema>} doc
	 * @returns {Promise<Key>}
	 */
	public static async create<TSchema extends DefaultSchema = any>(
		doc: WithoutAutoGenerateColumn<TSchema>
	): Promise<Key> {
		return await wrapTransaction(async (session) => {
			const repo = new this(session);
			const response = await repo.insert(doc);
			return response.insertedId;
		});
	}
	/**
	 * 作成（複数）
	 * @param {WithoutAutoGenerateColumn<TSchema>[]} docs
	 * @returns {Promise<void>}
	 */
	public static async createMany<TSchema extends DefaultSchema = any>(
		docs: WithoutAutoGenerateColumn<TSchema>[]
	): Promise<void> {
		const repo = new this();
		await repo.insertMany(docs);
	}
	/**
	 * 更新。更新したIDを返す。
	 * @param {Key} id 更新対象のID
	 * @param {any} doc
	 * @returns {Promise<TSchema>}
	 */
	public static async update<TSchema extends DefaultSchema = any>(
		id: Key,
		doc: Partial<WithoutAutoGenerateColumn<TSchema>>
	): Promise<Key> {
		const repo = new this();
		const tmp = await repo.parseOptional(doc);
		if (Object.keys(tmp).length === 0) throw new RepositoryInvalidError("update data is required!!");
		const targetId = repo.parseId(id);
		const target = await repo.findOne({ _id: targetId });
		if (!target) throw new RepositoryInvalidError(`更新対象が見つかりません。 (対象のID:${id})`);
		// ユニーク制約がある場合はユニークチェック。
		if (repo.uniques.length) {
			for (const uniques of repo.uniques) {
				if (uniques.length === 0) continue;
				if (uniques.every((unique) => !tmp[unique] || tmp[unique] === target[unique])) continue;
				const result = await repo.findToArray({
					$and: [...uniques.map((unique) => ({ [unique]: tmp[unique] })), { _id: { $ne: targetId } }],
				});
				if (result.length) {
					const { label } = repo.getRules()[uniques[0]];
					throw new ValidationError({ [uniques[0]]: `${label}：${tmp[uniques[0]]}はすでに登録されています。` });
				}
			}
		}
		await repo.update({ _id: targetId }, { $set: tmp });
		return targetId;
	}
	/**
	 * 対象のIDのデータを削除する
	 * @param {Key} id 削除対象のID
	 * @returns {Promise<number>}
	 */
	public static async delete(id: Key): Promise<number> {
		const repo = new this();
		return await repo.delete({ _id: repo.parseId(id) });
	}
	/**
	 * データをクリアする
	 * @returns {Promise<void>}
	 */
	public static async clear(): Promise<void> {
		const repo = new this();
		await repo.clear();
	}
	/**
	 * データをクリアする
	 * @returns {Promise<void>}
	 */
	public async clear(): Promise<void> {
		this.deleteMany({});
	}
	/**
	 * IDを取得する。
	 * @param id
	 * @returns {Promise<Key>}
	 */
	public static async getId(id: Key): Promise<Key> {
		const repo = new this();
		const result = await repo.findOne({ _id: repo.parseId(id) });
		if (!result) throw new RepositoryInvalidError("データが存在しません。");
		return result._id;
	}
	// read系はgenericが必要になるのでprotectedで定義し、publicなmethodは個別で作成する。
	protected static async select<T extends DefaultSchema>(
		filterQuery: FilterQuery<T>,
		options?: FindOneOptions<T> | undefined
	): Promise<T[]> {
		const repo = new this<T>();
		return await repo.findToArray(filterQuery, options);
	}
	protected static async one<T extends DefaultSchema>(id: Key, options?: FindOneOptions<T> | undefined): Promise<T> {
		const repo = new this<T>();
		return await repo.findOne({ _id: repo.parseId(id) } as FilterQuery<T>, options);
	}
	public parseId(id: Key): Key {
		if ("_id" in this.rules) {
			return id;
		}
		return new ObjectId(id);
	}
}
export abstract class Repository<RepositorySchema extends DefaultSchema> extends BaseRepository<RepositorySchema> {
	protected abstract collectionName: string;
	protected abstract rules: SchemaRules<RepositorySchema>;
	protected abstract indexes: UniqueCandidate<RepositorySchema>[][];
	protected abstract uniques: UniqueCandidate<RepositorySchema>[][];
}

// 以下autoincrementの定義
export type Seq = Phantom<number, "seq">;
export type Autoincrement = {
	collectionName: string;
	seq: number;
} & DefaultSchema;

export class AutoincrementRepository extends Repository<Autoincrement> {
	protected collectionName = "autoincrement";
	protected uniques: UniqueCandidate<Autoincrement>[][] = [["collectionName"]];
	protected indexes: UniqueCandidate<Autoincrement>[][] = [];
	protected rules: SchemaRules<Autoincrement> = {
		collectionName: {
			type: "string",
			label: "collectionName",
		},
		seq: {
			type: "number",
			label: "seq",
		},
	};
	/**
	 * auto incrementのIDを発行する。
	 * @param collectionName
	 * @param session
	 * @returns {Promise<Seq>}
	 */
	public static async generate(collectionName: string, session: ClientSession): Promise<Seq> {
		const repo = new AutoincrementRepository(session);
		return repo.geneate(collectionName);
	}
	public getSeq(seq: number): Seq {
		return seq as Seq;
	}
	/**
	 * auto incrementのIDを発行する。
	 * @param collectionName
	 * @returns {Promise<Seq>}
	 */
	public async geneate(collectionName: string): Promise<Seq> {
		if (!this.getSession()) throw new RepositoryInvalidError("generate autoincrement is wrap transaction!!");
		console.log(this.getCollectionName(), this.getSession().id);
		await this.upsert({ collectionName }, { $inc: { seq: 1 } });
		const tmp = await this.findOne({ collectionName });
		return this.getSeq(tmp.seq);
	}
}
