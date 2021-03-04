import { ObjectId, FilterQuery } from "mongodb";
import { Repository, SchemaRules, DefaultSchema, AutoIncrementColumn, Key, UniqueCandidate } from "../../repository";

export type Test2 = AutoIncrementColumn<"no"> & {
	a: string;
	b: number;
	date: Date;
} & DefaultSchema;

export class Test2Pepository extends Repository<Test2> {
	protected collectionName = "test2";
	protected uniques: UniqueCandidate<Test2>[][] = [];
	protected indexes: UniqueCandidate<Test2>[][] = [[]];
	protected rules: SchemaRules<Test2> = {
		a: {
			type: "string",
			label: "a",
		},
		b: {
			type: "number",
			label: "b",
		},
		date: {
			type: "date",
			label: "日付",
		},
		no: {
			type:"autoincrement"
		}
	};
	public static async findOne(id: Key): Promise<Test2> {
		return this.one(id);
	}
	public static async find(filterQuery: FilterQuery<Test2>): Promise<Test2[]> {
		return this.select(filterQuery);
	}
}
