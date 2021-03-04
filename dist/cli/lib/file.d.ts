/// <reference types="node" />
import { promises as fsp } from "fs";
export declare const write: typeof fsp.writeFile;
export declare const exists: (filepath: string) => Promise<boolean>;
export declare const isDirectory: (path: string) => Promise<boolean>;
export declare const mkdir: (path: string) => Promise<void>;
export declare const getOutputDirectory: (enqueteId: string) => string;
export declare const makeOutputDirectory: (enqueteId: string) => Promise<void>;
export declare const getOutputFilepath: (enqueteId: string, filename: string) => string;
export declare const findTargetFiles: (targertDirectory: string, filename: string) => Promise<string[]>;
