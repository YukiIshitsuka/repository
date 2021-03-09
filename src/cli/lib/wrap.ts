import { MongoConnection } from "../..";
import { MongoDB } from "../../lib/mongo-client";
import { ColorConsole } from "./color";
import { config } from "dotenv";

export const cliWrap = async (func: (mongo: MongoDB) => Promise<void>): Promise<void> => {
	config();
	const mongo = await MongoConnection.get();
	try {
		await func(mongo);
	} catch (error) {
		console.error(error.errors);
		ColorConsole.error("cli error!!");
	} finally {
		await mongo.close();
	}
};
