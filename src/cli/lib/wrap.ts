import { MongoConnection } from "../..";
import { MongoDB } from "../../lib/mongo-client";
import { ColorConsole } from "./color";
import { config } from "dotenv";
import { ValidationError } from "@lu/validator";

export const cliWrap = async (func: (mongo: MongoDB) => Promise<void>): Promise<void> => {
	config();
	const mongo = await MongoConnection.get();
	try {
		await func(mongo);
	} catch (error) {
		ColorConsole.error("cli error!!");
		if (error instanceof ValidationError) {
			console.error(JSON.stringify(error.errors, undefined, 2));
		}
	} finally {
		await mongo.close();
	}
};
