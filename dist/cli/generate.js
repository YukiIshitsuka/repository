#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryGenerator = void 0;
var path = require("path");
var program = require("commander");
var color_1 = require("./lib/color");
var file_1 = require("./lib/file");
var error_1 = require("./error");
var text_1 = require("./lib/text");
var wrap_1 = require("./lib/wrap");
var RepositoryGenerator = /** @class */ (function () {
    function RepositoryGenerator() {
    }
    RepositoryGenerator.do = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var generator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        generator = new RepositoryGenerator();
                        return [4 /*yield*/, generator.createDirectory()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, generator.do(name)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RepositoryGenerator.prototype.do = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var directory, targetName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directory = this.getTargetDirectory(name);
                        return [4 /*yield*/, file_1.exists(directory)];
                    case 1:
                        if (_a.sent())
                            throw new error_1.RepositoryCLIError(name + " is already exits...");
                        return [4 /*yield*/, file_1.mkdir(directory)];
                    case 2:
                        _a.sent();
                        targetName = text_1.capitalizeFirstLetter(name);
                        return [4 /*yield*/, file_1.write(path.join(directory, "index.ts"), "import { Repository, SchemaRules, Key, UniqueCandidate } from \"@lu/repository\";\nimport { " + targetName + " } from \"./model\";\n\nexport class " + targetName + "Repository extends Repository<" + targetName + "> {\n\tprotected readonly collectionName = \"" + name + "s\";\n\tprotected rules: SchemaRules<" + targetName + "> = {\n\n\t};\n\tprotected indexes: UniqueCandidate<" + targetName + ">[][] = [];\n\tprotected uniques: UniqueCandidate<" + targetName + ">[][] = [];\n\tpublic static async getAll(): Promise<" + targetName + "[]> {\n\t\treturn this.select<" + targetName + ">({});\n\t}\n\tpublic static async get(id: Key): Promise<" + targetName + "> {\n\t\treturn this.one<" + targetName + ">(id);\n\t}\n}\n")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, file_1.write(path.join(directory, "model.ts"), "import { DefaultSchema } from \"@lu/repository\";\nexport type " + targetName + " = {\n\t\n} & DefaultSchema;\n")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RepositoryGenerator.prototype.createDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.REPOSITORIES_DIRECTORY) {
                            throw new error_1.RepositoryCLIError("REPOSITORIES_DIRECTORY is not set...");
                        }
                        return [4 /*yield*/, file_1.mkdir(process.env.REPOSITORIES_DIRECTORY)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RepositoryGenerator.prototype.getTargetDirectory = function (name) {
        return path.join(process.env.REPOSITORIES_DIRECTORY, name);
    };
    return RepositoryGenerator;
}());
exports.RepositoryGenerator = RepositoryGenerator;
if (typeof require !== "undefined" && require.main === module) {
    // optionをたす場合はここにたす。
    color_1.ColorConsole.info("generate start");
    program.option("-r, --repository <string>", "generate repository name");
    program.parse(process.argv);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wrap_1.cliWrap(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var repositoryName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    repositoryName = program.repository;
                                    if (!repositoryName) {
                                        throw "repository name is required!!";
                                    }
                                    return [4 /*yield*/, RepositoryGenerator.do(repositoryName)];
                                case 1:
                                    _a.sent();
                                    color_1.ColorConsole.success(repositoryName + " repostiory generated!!");
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
else {
    color_1.ColorConsole.error("It cannot be called from the outside...");
}
//# sourceMappingURL=generate.js.map