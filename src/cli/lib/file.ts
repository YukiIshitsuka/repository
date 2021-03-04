import * as path from "path";
import { promises as fsp } from "fs";
import { promisify } from "util";
import * as glob from "glob";

const asyncGrob = promisify(glob);

export const write = fsp.writeFile;
export const exists = async (filepath: string): Promise<boolean> => {
	try {
		await fsp.stat(filepath);
		return true;
	} catch (err) {
		return false;
	}
};

export const isDirectory = async (path: string): Promise<boolean> => {
	try {
		const result = await fsp.stat(path);
		return result.isDirectory();
	} catch (error) {
		return false;
	}
};

export const mkdir = async (path: string): Promise<void> => {
	// Directoryかをチェックする。
	if ((await isDirectory(path)) === false) {
		await fsp.mkdir(path);
	}
};

export const getOutputDirectory = (enqueteId: string): string => {
	return path.join(__dirname, `../../../output/${enqueteId}`);
};
export const makeOutputDirectory = async (enqueteId: string): Promise<void> => {
	const directory = getOutputDirectory(enqueteId);
	if ((await exists(directory)) === false) {
		await fsp.mkdir(directory);
	}
};

export const getOutputFilepath = (enqueteId: string, filename: string): string => {
	return `${getOutputDirectory(enqueteId)}/${filename}`;
};

export const findTargetFiles = async (targertDirectory: string, filename: string): Promise<string[]> => {
	return await asyncGrob(path.join(targertDirectory, filename));
};
