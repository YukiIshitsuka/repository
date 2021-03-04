import { MongoDB } from "../lib/mongo-client";
import { FilterQuery, UpdateQuery, ClientSession, FindOneOptions, CollectionAggregationOptions, InsertWriteOpResult, InsertOneWriteOpResult, Cursor, Db, Collection, ObjectId } from "mongodb";
import { Rules } from "@lu/validator";
import { MatchNames, Phantom } from "../types";
export declare type DefaultTimestampSchema = {
    createdAt: Date;
    updatedAt: Date;
};
export declare type AutoIncrementColumn<T extends string> = {
    [key in T]: Seq;
};
export declare type AutoIncrementIds<TShema extends DefaultSchema> = MatchNames<TShema, Seq>;
export declare type WithoutAutoIncrement<T> = Omit<T, MatchNames<T, Seq>>;
export declare type Key = ObjectId | string | number;
export declare type DefaultId = {
    _id: Key;
};
export declare type DefaultSchema = DefaultId & DefaultTimestampSchema;
export declare type WithoutDefaultColumn<T extends DefaultSchema> = Omit<T, keyof DefaultSchema> & Partial<DefaultId>;
export declare type WithoutAutoGenerateColumn<T extends DefaultSchema> = WithoutAutoIncrement<WithoutDefaultColumn<T>>;
export declare type AutoIncrementRule = {
    type: "autoincrement";
};
export declare type AutoInrementRule<TShema extends DefaultSchema> = AutoIncrementIds<TShema> extends never ? {} : {
    [key in AutoIncrementIds<TShema>]: AutoIncrementRule;
};
export declare type SchemaRules<TShema extends DefaultSchema> = Rules<WithoutAutoIncrement<WithoutDefaultColumn<TShema>>> & AutoInrementRule<TShema>;
export declare type UniqueCandidate<TShema extends DefaultSchema> = keyof WithoutDefaultColumn<TShema>;
declare class BaseRepository<RepositorySchema extends DefaultSchema> {
    private autoincrementRepo;
    protected collectionName: string;
    protected rules: SchemaRules<RepositorySchema>;
    protected indexes: UniqueCandidate<RepositorySchema>[][];
    protected uniques: UniqueCandidate<RepositorySchema>[][];
    protected attrebutes: Partial<RepositorySchema>;
    protected autoMigration: boolean;
    protected temporaryUniqueCheckData: Map<string, Partial<RepositorySchema>>;
    /**
     * migrationを自動実行するかどうか。
     * @returns {boolean}
     */
    isAutoMigrationTarget(): boolean;
    private _session;
    constructor(session?: ClientSession);
    protected getAutoincrementRepository(): AutoincrementRepository;
    protected getDate(): Date;
    /**
     * データのセット
     * @param {any} attrebutes
     * @returns {Promise<void>}
     */
    set(attrebutes: any): Promise<void>;
    /**
     * 検索をかけて値をセットする。
     * @param {Key} id
     */
    findAndSet(id: Key): Promise<void>;
    /**
     * attrebutesにセットされているデータを保存する。
     * @returns {Promise<void>}
     */
    save(): Promise<void>;
    /**
     * コレクション名を取得
     * @returns {string}
     */
    static getCollectionName(): string;
    /**
     * セットしたattrebutestのclear
     * @returns {void}
     */
    clearAttrebutes(): void;
    /**
     * セッションを取得する。
     * @returns {ClientSession | undefined}
     */
    getSession(): ClientSession | undefined;
    /**
     * セッションをセットする
     * @param {ClientSession} session
     * @returns {this}
     */
    setSession(session?: ClientSession): this;
    /**
     * コレクション名の取得
     * @returns {string}
     */
    getCollectionName(): string;
    /**
     * インスタンスの取得
     * @returns {Repository<T>}
     */
    static getInstance<T extends DefaultSchema>(): Repository<T>;
    getDB(): Promise<Db>;
    getMongoDB(): Promise<MongoDB>;
    collection(): Promise<Collection<RepositorySchema>>;
    protected getRules(): Rules<WithoutAutoGenerateColumn<RepositorySchema>>;
    private getAutoIncrementNames;
    generateAutoincrement(): Promise<Seq>;
    generateAutoIncrementColumn(): Promise<{
        [key in AutoIncrementIds<RepositorySchema>]: Seq;
    }>;
    parseInsertDoc(doc: any): Promise<WithoutDefaultColumn<RepositorySchema>>;
    parse(doc: any): Promise<WithoutAutoGenerateColumn<RepositorySchema>>;
    parseOptional(doc: any): Promise<Partial<WithoutAutoGenerateColumn<RepositorySchema>>>;
    getTargetRules<K extends keyof WithoutDefaultColumn<RepositorySchema>>(keys: K[]): Rules<Pick<WithoutDefaultColumn<RepositorySchema>, K>>;
    getTargetRulesOptional<K extends keyof WithoutDefaultColumn<RepositorySchema>>(keys: K[]): Rules<Pick<WithoutDefaultColumn<RepositorySchema>, K>>;
    parseTargetField<K extends keyof WithoutDefaultColumn<RepositorySchema>>(doc: any, keys: K[]): Promise<Pick<WithoutDefaultColumn<RepositorySchema>, K>>;
    parseTargetFieldOptional<K extends keyof WithoutDefaultColumn<RepositorySchema>>(doc: any, keys: K[]): Promise<Partial<Pick<WithoutDefaultColumn<RepositorySchema>, K>>>;
    findToArray(query: FilterQuery<RepositorySchema>, options?: FindOneOptions<RepositorySchema> | undefined): Promise<RepositorySchema[]>;
    find(query: FilterQuery<RepositorySchema>, options?: FindOneOptions<RepositorySchema> | undefined): Promise<Cursor<RepositorySchema>>;
    /**
     * 指定キーの最大値を取得する。
     * @param {T} key
     * @returns {( RepositorySchema)[T]}
     */
    max<T extends keyof RepositorySchema>(key: T): Promise<RepositorySchema[T]>;
    /**
     * 全件取得
     * @returns {Promise<Cursor<( RepositorySchema)>>}
     */
    all(): Promise<Cursor<RepositorySchema>>;
    /**
     * 取得（1件）
     * @param {FilterQuery<( RepositorySchema)>} query 検索条件
     * @param {FindOneOptions<( RepositorySchema)>} findOneOptions 検索オプション
     * @returns {Promise<RepositorySchema>}
     */
    findOne(query: FilterQuery<RepositorySchema>, findOneOptions?: FindOneOptions<RepositorySchema>): Promise<RepositorySchema>;
    uniqueCheck(doc: WithoutAutoGenerateColumn<DefaultSchema>): Promise<void>;
    /**
     * 作成
     * @param {any} doc
     * @param {boolean} validated
     * @returns {Promise<InsertOneWriteOpResult< RepositorySchema>>}
     */
    insert(doc: any | WithoutAutoGenerateColumn<RepositorySchema>, validated?: boolean): Promise<InsertOneWriteOpResult<RepositorySchema>>;
    /**
     * 作成（複数）
     * @param {any[]} docs
     * @returns {Promise<InsertWriteOpResult< RepositorySchema>>}
     */
    insertMany(docs: any[] | WithoutAutoGenerateColumn<RepositorySchema>[]): Promise<InsertWriteOpResult<RepositorySchema>>;
    /**
     * 指定のキーを元にjsonを作成
     * @param {T[]} rows データの配列
     * @param {string} usekey 対象とするキー名称
     * @returns { [k: string]: T }
     */
    static arraytojson<T>(rows: T[], usekey: string): {
        [k: string]: T;
    };
    /**
     * upsertする。（あれば更新、なければ作成）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<Key>} _idを返却
     */
    upsert(filter: FilterQuery<RepositorySchema>, query: UpdateQuery<RepositorySchema>): Promise<Key>;
    /**
     * データの削除（複数）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @returns {Promise<number>} 削除件数
     */
    deleteMany(filter: FilterQuery<RepositorySchema>): Promise<number>;
    /**
     * データの削除
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @returns {Promise<number>} 削除件数
     */
    delete(filter: FilterQuery<RepositorySchema>): Promise<number>;
    /**
     * データを更新する。（複数レコード）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<number>} 更新件数
     */
    updateMany(filter: FilterQuery<RepositorySchema>, query: UpdateQuery<RepositorySchema>): Promise<number>;
    /**
     * データを更新する。
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<number>} 更新件数
     */
    update(filter: FilterQuery<RepositorySchema>, query: UpdateQuery<RepositorySchema>): Promise<number>;
    /**
     * コレクションを作成する。
     * @returns {Promise<void>}
     */
    makeCollection(): Promise<void>;
    /**
     *
     * @param {object[]} pipeline
     * @param {CollectionAggregationOptions} [options = undefined]
     * @returns {Promise<T[]>}
     */
    aggregate<T>(pipeline: object[], options?: CollectionAggregationOptions): Promise<T[]>;
    /**
     * データがいくつか
     * @returns {Promise<number>}
     */
    static count(): Promise<number>;
    /**
     * 対象のIDのデータが存在するか
     * @param {Key} id 検索対象のID
     * @returns {Promise<boolean>}
     */
    exist(id: Key): Promise<boolean>;
    /**
     * 対象のIDのデータが存在するか
     * @param {Key} id 検索対象のID
     * @returns {Promise<boolean>}
     */
    static exist(id: Key): Promise<boolean>;
    /**
     * 作成
     * @param {WithoutAutoGenerateColumn<TSchema>} doc
     * @returns {Promise<Key>}
     */
    static create<TSchema extends DefaultSchema = any>(doc: WithoutAutoGenerateColumn<TSchema>): Promise<Key>;
    /**
     * 作成（複数）
     * @param {WithoutAutoGenerateColumn<TSchema>[]} docs
     * @returns {Promise<void>}
     */
    static createMany<TSchema extends DefaultSchema = any>(docs: WithoutAutoGenerateColumn<TSchema>[]): Promise<void>;
    /**
     * 更新。更新したIDを返す。
     * @param {Key} id 更新対象のID
     * @param {any} doc
     * @returns {Promise<TSchema>}
     */
    static update<TSchema extends DefaultSchema = any>(id: Key, doc: Partial<WithoutAutoGenerateColumn<TSchema>>): Promise<Key>;
    /**
     * 対象のIDのデータを削除する
     * @param {Key} id 削除対象のID
     * @returns {Promise<number>}
     */
    static delete(id: Key): Promise<number>;
    /**
     * データをクリアする
     * @returns {Promise<void>}
     */
    static clear(): Promise<void>;
    /**
     * データをクリアする
     * @returns {Promise<void>}
     */
    clear(): Promise<void>;
    /**
     * IDを取得する。
     * @param id
     * @returns {Promise<Key>}
     */
    static getId(id: Key): Promise<Key>;
    protected static select<T extends DefaultSchema>(filterQuery: FilterQuery<T>, options?: FindOneOptions<T> | undefined): Promise<T[]>;
    protected static one<T extends DefaultSchema>(id: Key, options?: FindOneOptions<T> | undefined): Promise<T>;
    parseId(id: Key): Key;
}
export declare abstract class Repository<RepositorySchema extends DefaultSchema> extends BaseRepository<RepositorySchema> {
    protected abstract collectionName: string;
    protected abstract rules: SchemaRules<RepositorySchema>;
    protected abstract indexes: UniqueCandidate<RepositorySchema>[][];
    protected abstract uniques: UniqueCandidate<RepositorySchema>[][];
}
export declare type Seq = Phantom<number, "seq">;
export declare type Autoincrement = {
    collectionName: string;
    seq: number;
} & DefaultSchema;
export declare class AutoincrementRepository extends Repository<Autoincrement> {
    protected collectionName: string;
    protected uniques: UniqueCandidate<Autoincrement>[][];
    protected indexes: UniqueCandidate<Autoincrement>[][];
    protected rules: SchemaRules<Autoincrement>;
    /**
     * auto incrementのIDを発行する。
     * @param collectionName
     * @param session
     * @returns {Promise<Seq>}
     */
    static generate(collectionName: string, session: ClientSession): Promise<Seq>;
    getSeq(seq: number): Seq;
    /**
     * auto incrementのIDを発行する。
     * @param collectionName
     * @returns {Promise<Seq>}
     */
    geneate(collectionName: string): Promise<Seq>;
}
export {};
