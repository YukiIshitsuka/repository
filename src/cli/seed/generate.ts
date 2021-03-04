#!/usr/bin/env node
import { ColorConsole } from "../lib/color";
import { Seed } from "./seed";
import * as program from "commander";
import { cliWrap } from "../lib/wrap";

if (typeof require !== "undefined" && require.main === module) {
	// optionをたす場合はここにたす。
	ColorConsole.info("seed generate start");
	(async () => {
		await cliWrap(async () => {
			program.option("-f, --file <string>", "seed file name");
			program.parse(process.argv);
			const seedName = program.file;
			await Seed.generate(seedName);
			ColorConsole.success(`${seedName} seed generate!!`);
		});
	})();
} else {
	ColorConsole.error("It cannot be called from the outside...");
}
