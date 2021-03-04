import { ObjectId, FilterQuery } from "mongodb";
import { Repository, SchemaRules, DefaultSchema, Key, UniqueCandidate } from "../../../repository";

export type Test1 = {
	param1: string;
	param2: number;
	test: {
		aaa: number;
		bbb: string;
	};
} & DefaultSchema;

export class Test1Pepository extends Repository<Test1> {
	protected collectionName = "test1";
	protected uniques: UniqueCandidate<Test1>[][] = [];
	protected indexes: UniqueCandidate<Test1>[][] = [];
	protected rules: SchemaRules<Test1> = {
		param1: {
			type: "string",
			label: "param1",
		},
		param2: {
			type: "number",
			label: "param2",
		},
		test: {
			type: "nest",
			label: "テスト",
			rules: {
				aaa: {
					type: "number",
					label: "aaa",
				},
				bbb: {
					type: "string",
					label: "bbb",
				},
			},
		},
	};
	public static async findOne(id: Key): Promise<Test1> {
		return this.one(id);
	}
	public static async find(filterQuery: FilterQuery<Test1>): Promise<Test1[]> {
		return this.select(filterQuery);
	}
}
