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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReposiotyMigrate = void 0;
var color_1 = require("./lib/color");
var dotenv_1 = require("dotenv");
var file_1 = require("./lib/file");
var repository_1 = require("../repository");
var path = require("path");
var mongo_client_1 = require("../lib/mongo-client");
var error_1 = require("./error");
var wrap_1 = require("./lib/wrap");
var ReposiotyMigrate = /** @class */ (function () {
    function ReposiotyMigrate() {
    }
    ReposiotyMigrate.do = function () {
        return __awaiter(this, void 0, void 0, function () {
            var migrate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        migrate = new ReposiotyMigrate();
                        return [4 /*yield*/, migrate.do()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReposiotyMigrate.prototype.do = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findTargetRepository()];
                    case 1:
                        repos = _a.sent();
                        return [4 /*yield*/, this.migration(repos)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReposiotyMigrate.prototype.migration = function (repositories) {
        return __awaiter(this, void 0, void 0, function () {
            var mongodb, repo, repositories_1, repositories_1_1, repository, collectionName, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongo_client_1.MongoConnection.get()];
                    case 1:
                        mongodb = _b.sent();
                        mongodb.getMongoClient();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 12, 14]);
                        repo = new repository_1.AutoincrementRepository();
                        return [4 /*yield*/, repo.makeCollection()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 9, 10, 11]);
                        repositories_1 = __values(repositories), repositories_1_1 = repositories_1.next();
                        _b.label = 5;
                    case 5:
                        if (!!repositories_1_1.done) return [3 /*break*/, 8];
                        repository = repositories_1_1.value;
                        collectionName = repository.getCollectionName();
                        color_1.ColorConsole.info("creating collection \"" + collectionName + "\"");
                        return [4 /*yield*/, repository.makeCollection()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        repositories_1_1 = repositories_1.next();
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (repositories_1_1 && !repositories_1_1.done && (_a = repositories_1.return)) _a.call(repositories_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, mongodb.close()];
                    case 13:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ReposiotyMigrate.prototype.findTargetRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repos, candFiles, candFiles_1, candFiles_1_1, file, repo, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repos = [];
                        if (!process.env.REPOSITORIES_DIRECTORY) {
                            throw new error_1.RepositoryCLIError("REPOSITORIES_DIRECTORY is not set...");
                        }
                        return [4 /*yield*/, file_1.findTargetFiles(process.env.REPOSITORIES_DIRECTORY, "**/*.ts")];
                    case 1:
                        candFiles = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        candFiles_1 = __values(candFiles), candFiles_1_1 = candFiles_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!candFiles_1_1.done) return [3 /*break*/, 6];
                        file = candFiles_1_1.value;
                        return [4 /*yield*/, this.importTarget(file)];
                    case 4:
                        repo = _b.sent();
                        if (repo)
                            repos.push(repo);
                        _b.label = 5;
                    case 5:
                        candFiles_1_1 = candFiles_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (candFiles_1_1 && !candFiles_1_1.done && (_a = candFiles_1.return)) _a.call(candFiles_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, repos];
                }
            });
        });
    };
    ReposiotyMigrate.prototype.importTarget = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c, key, target, instance;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(path.join(process.cwd(), filepath)); })];
                    case 1:
                        result = _e.sent();
                        if (typeof result !== "object")
                            return [2 /*return*/, undefined];
                        try {
                            for (_a = __values(Object.entries(result)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), key = _c[0], target = _c[1];
                                if (typeof target !== "function")
                                    continue;
                                if (key !== target.name || !target.prototype.constructor)
                                    continue;
                                instance = new target.prototype.constructor();
                                if (instance instanceof repository_1.Repository && instance.isAutoMigrationTarget()) {
                                    return [2 /*return*/, instance];
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    return ReposiotyMigrate;
}());
exports.ReposiotyMigrate = ReposiotyMigrate;
if (typeof require !== "undefined" && require.main === module) {
    // optionをたす場合はここにたす。
    color_1.ColorConsole.info("migration start");
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wrap_1.cliWrap(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    dotenv_1.config();
                                    return [4 /*yield*/, ReposiotyMigrate.do()];
                                case 1:
                                    _a.sent();
                                    color_1.ColorConsole.success("migration complete!!");
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
//# sourceMappingURL=migrate.js.map