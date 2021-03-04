import { ObjectId, FilterQuery } from "mongodb";
import { Repository, SchemaRules, DefaultSchema, Key, UniqueCandidate } from "../../repository";

export type Test3 = {
	param1: string;
	param2: number;
	no: number;
	test: {
		aaa: number;
		bbb: string;
	};
} & DefaultSchema;

export class Test3Pepository extends Repository<Test3> {
	protected collectionName = "test3";
	protected uniques: UniqueCandidate<Test3>[][] = [["no"]];
	protected indexes: UniqueCandidate<Test3>[][] = [["param1", "param2"]];
	protected rules: SchemaRules<Test3> = {
		param1: {
			type: "string",
			label: "param1",
		},
		no: {
			type: "number",
			label: "aaa",
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
	public static async findOne(id: Key): Promise<Test3> {
		return this.one(id);
	}
	public static async find(filterQuery: FilterQuery<Test3>): Promise<Test3[]> {
		return this.select(filterQuery);
	}
}
