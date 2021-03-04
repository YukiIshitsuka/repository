#!/usr/bin/env node
import { ColorConsole } from "./lib/color";

import { cliWrap } from "./lib/wrap";

if (typeof require !== "undefined" && require.main === module) {
	// optionをたす場合はここにたす。
	ColorConsole.info("start drop mongo collection data!!");
	(async () => {
		await cliWrap(async (mongo) => {
			const collections = await mongo.getMongoCollections();
			const promises = collections.map((collection) => collection.drop());
			await Promise.all(promises);
			ColorConsole.success("droped mongo collection data!!");
		});
	})();
} else {
	ColorConsole.error("It cannot be called from the outside...");
}
