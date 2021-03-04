import { MongoConnection, MongoDB } from "../lib/mongo-client";
import { config } from "dotenv";
import { Test1Pepository, Test1 } from "./lib/test1";
import { randNumber, generateMoji, deepCopy } from "./lib/common";
import { WithoutDefaultColumn } from "../repository";
import { Test2Pepository, Test2 } from "./lib/test2";
import { Test3Pepository, Test3 } from "./lib/test3";
import { wrapTransaction } from "../lib/transaction";
import { ClientSession, InsertOneWriteOpResult } from "mongodb";
import { ValidationError } from "@lu/validator";
import { count } from "console";
config();

describe("repositoryのテスト", () => {
	let mongoDB: MongoDB;
	const insertCount = 100;
	beforeAll(async () => {
		mongoDB = await MongoConnection.get();
		await Test1Pepository.clear();
		await Test2Pepository.clear();
		await Test3Pepository.clear();
	});
	afterAll(async () => {
		await Test1Pepository.clear();
		await Test2Pepository.clear();
		await Test3Pepository.clear();
		if (mongoDB) await mongoDB.close();
	});
	it("insert、update、delete（正常終了）", async () => {
		const insertData: WithoutDefaultColumn<Test1> = {
			param1: generateMoji(),
			param2: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			},
		};
		// 1. insert
		const insertId = await Test1Pepository.create(insertData);
		let test1 = await Test1Pepository.findOne(insertId);
		expect(test1).toBeDefined();
		const { updatedAt, createdAt } = test1;
		for (const [key, value] of Object.entries(insertData)) {
			expect(value).toEqual(test1[key]);
		}
		// 2. update
		// 2-1. param1だけ更新
		insertData.param1 = generateMoji();
		await Test1Pepository.update(insertId, { param1: insertData.param1 });
		test1 = await Test1Pepository.findOne(insertId);
		for (const [key, value] of Object.entries(insertData)) {
			expect(value).toEqual(test1[key]);
		}
		// 更新時はupdatedAtは変わるが、createdAtは変わらない
		expect(updatedAt).not.toEqual(test1.updatedAt);
		expect(createdAt).toEqual(test1.createdAt);
		// 2-2. testだけ更新
		insertData.test = { aaa: randNumber(), bbb: generateMoji() };
		await Test1Pepository.update(insertId, { ...insertData });
		test1 = await Test1Pepository.findOne(insertId);
		for (const [key, value] of Object.entries(insertData)) {
			expect(value).toEqual(test1[key]);
		}

		// 3. delete
		await Test1Pepository.delete(insertId);
		test1 = await Test1Pepository.findOne(insertId);
		expect(test1).toBeNull();
	});
	it("insertのエラー（パラメータ不足）", async () => {
		const insertData: WithoutDefaultColumn<Test1> = {
			param1: generateMoji(),
			param2: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			},
		};
		for (const key of Object.keys(insertData)) {
			const tmp = deepCopy(insertData);
			delete tmp[key];
			let error: any;
			try {
				await Test1Pepository.create(tmp);
			} catch (err) {
				expect(err).toBeInstanceOf(ValidationError);
				if (!(err instanceof ValidationError)) throw new Error("意図しないエラー");
				const obj = err.get();
				expect(obj[key]).toBeDefined();
				error = err;
			}
			expect(error).toBeDefined();
		}
	});
	it("updateのエラー（データがない）", async () => {
		const insertData: WithoutDefaultColumn<Test1> = {
			param1: generateMoji(),
			param2: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			},
		};
		const insertId = await Test1Pepository.create(insertData);
		let error: any;
		try {
			// 全く関係ない値を入れてみる。
			await Test1Pepository.update(insertId, { xxx: 11 });
		} catch (err) {
			error = err;
		}
		expect(error).toBeDefined();
	});
	it("insertMany", async () => {
		await Test1Pepository.clear();
		const insertDatas = new Array(insertCount).fill(0).map(() => {
			return {
				param1: generateMoji(),
				param2: randNumber(),
				test: {
					aaa: randNumber(),
					bbb: generateMoji(),
				},
			};
		});
		await Test1Pepository.createMany(insertDatas);
		const count = await Test1Pepository.count();
		expect(count).toBe(insertCount);
	});
	it("clear", async () => {
		await Test1Pepository.clear();
		const count = await Test1Pepository.count();
		expect(count).toBe(0);
	});
	it("insertManyのエラー", async () => {
		const insertCount = 100;
		await Test1Pepository.clear();
		const insertDatas = new Array(insertCount).fill(0).map(() => {
			return {
				param1: generateMoji(),
				param2: randNumber(),
				test: {
					aaa: randNumber(),
					bbb: generateMoji(),
				},
			};
		});
		delete insertDatas[randNumber(insertCount)].param1;
		let error: any;
		try {
			// 全く関係ない値を入れてみる。
			await Test1Pepository.createMany(insertDatas);
		} catch (err) {
			error = err;
		}
		expect(error).toBeDefined();
		const count = await Test1Pepository.count();
		expect(count).toBe(0);
	});
	it("wrap transaction（エラーするか）", async () => {
		await Test1Pepository.clear();
		await Test2Pepository.clear();
		let error: any;
		try {
			await wrapTransaction(async (session: ClientSession) => {
				const test1 = new Test1Pepository(session);
				const test2 = new Test2Pepository(session);
				const result1 = await test1.insert({
					param1: generateMoji(),
					param2: randNumber(),
					test: {
						aaa: randNumber(),
						bbb: generateMoji(),
					},
				});
				const result2 = await test2.insert({
					a: generateMoji(),
					b: randNumber(),
					date: new Date(),
				});
				expect(await test1.findOne({ _id: result1.insertedId })).toBeDefined();
				expect(await test2.findOne({ _id: result2.insertedId })).toBeDefined();
				throw "エラーを起こしてrollbackするか。";
			});
		} catch (err) {
			error = err;
		}
		expect(error).toBeDefined();
		expect(await Test1Pepository.count()).toEqual(0);
		expect(await Test2Pepository.count()).toEqual(0);
	});
	it("wrap transaction（正常終了するか）", async () => {
		await Test1Pepository.clear();
		await Test2Pepository.clear();
		let result1: InsertOneWriteOpResult<Test1>;
		let result2: InsertOneWriteOpResult<Test2>;
		await wrapTransaction(async (session: ClientSession) => {
			const test1 = new Test1Pepository(session);
			const test2 = new Test2Pepository(session);
			result1 = await test1.insert({
				param1: generateMoji(),
				param2: randNumber(),
				test: {
					aaa: randNumber(),
					bbb: generateMoji(),
				},
			});
			result2 = await test2.insert({
				a: generateMoji(),
				b: randNumber(),
				date: new Date(),
			});
			expect(await test1.findOne({ _id: result1.insertedId })).toBeDefined();
			expect(await test2.findOne({ _id: result2.insertedId })).toBeDefined();
		});
		expect(result1).toBeDefined();
		expect(result2).toBeDefined();
		expect(await Test1Pepository.findOne(result1.insertedId)).toBeDefined();
		expect(await Test2Pepository.findOne(result2.insertedId)).toBeDefined();
		expect(await Test1Pepository.count()).toEqual(1);
		expect(await Test2Pepository.count()).toEqual(1);
	});
	it("unique制約チェック", async () => {
		const ins = new Test3Pepository();
		const insertData: WithoutDefaultColumn<Test3> = {
			param1: generateMoji(),
			param2: randNumber(),
			no: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			}
		};
		await Test3Pepository.create(insertData);
		Test3Pepository.create(insertData).then(() => { 
			throw new Error("ユニーク制約がきいていない");
		}).catch((error) => { 
			expect(error).toBeInstanceOf(ValidationError);
			if (error instanceof ValidationError) { 
				const label = ins.getTargetRules(["no"]).no.label;
				const message = `${label}：${insertData.no}はすでに登録されています。`;
				expect({ no: message }).toEqual(error.get());
			}
		})
		const insertId = await Test3Pepository.create({ ...insertData, no: insertData.no + 1 });
		expect(insertId).toBeDefined();
	});
	it("unique制約チェック（複数登録）", async () => {
		await Test3Pepository.clear();
		const ins = new Test3Pepository();
		const insertData: WithoutDefaultColumn<Test3> = {
			param1: generateMoji(),
			param2: randNumber(),
			no: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			}
		};
		await Test3Pepository.createMany([insertData, insertData]).then(() => {
			throw new Error("ユニーク制約がきいていない");
		}).catch((error) => {
			expect(error).toBeInstanceOf(ValidationError);
			if (error instanceof ValidationError) {
				const label = ins.getTargetRules(["no"]).no.label;
				const message = `${label}：${insertData.no}はすでに登録されています。`;
				expect({ no: message }).toEqual(error.get());
			}
		})
	});
	it("unique制約チェック（更新処理）", async () => {
		await Test3Pepository.clear();
		const ins = new Test3Pepository();
		const insertData: WithoutDefaultColumn<Test3> = {
			param1: generateMoji(),
			param2: randNumber(),
			no: randNumber(),
			test: {
				aaa: randNumber(),
				bbb: generateMoji(),
			}
		};
		await Test3Pepository.create(insertData);
		const insertId = await Test3Pepository.create({ ...insertData, no: insertData.no + 1 });
		const updatedId = await Test3Pepository.update(insertId, { no: insertData.no + 2})// 通常の更新は成功するはず。
		expect(insertId).toBe(updatedId);
		await Test3Pepository.update(insertId, { no: insertData.no }).catch((error) => {
			expect(error).toBeInstanceOf(ValidationError);
			if (error instanceof ValidationError) {
				const label = ins.getTargetRules(["no"]).no.label;
				const message = `${label}：${insertData.no}はすでに登録されています。`;
				expect({ no: message }).toEqual(error.get());
			}
		})
	});
});
