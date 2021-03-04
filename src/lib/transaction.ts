import { MongoConnection } from "..";
import { Repository, DefaultSchema } from "../repository";
import { ClientSession } from "mongodb";

//transaction用のdecorator
export function transaction() {
	return (target: any, name: string, descriptor: PropertyDescriptor): void => {
		const method = descriptor.value; //もともとのメソッドを退避しておきます。
		descriptor.value = async function (...args: any[]) {
			const mongo = await MongoConnection.get();
			const self = this as Repository<DefaultSchema>;
			let ret: any;
			if (!self.getSession()) {
				self.setSession(mongo.getMongoStartSession());
				const session = self.getSession();
				session.startTransaction();

				try {
					//this.session = session;
					ret = await method.call(this, ...args);
					await session.commitTransaction();
				} catch (e) {
					await session.abortTransaction();
					throw e;
				} finally {
					session.endSession();
					self.setSession(undefined);
				}
			} else {
				//すでにトランザクション内の場合
				ret = await method.call(this, ...args);
			}
			return ret;
		};
	};
}

// decoratorを使用しない場合はこっちを使用する。
export const wrapTransaction = async <T>(func: (session: ClientSession) => Promise<T>): Promise<T> => {
	const mongo = await MongoConnection.get();
	const session = mongo.getMongoStartSession();
	let response: T;
	session.startTransaction();
	try {
		response = await func(session);
		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
	return response;
};
