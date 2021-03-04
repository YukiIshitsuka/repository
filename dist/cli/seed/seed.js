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
exports.Seed = void 0;
var path = require("path");
var seed_1 = require("../../seed");
var error_1 = require("../error");
var file_1 = require("../lib/file");
var mongo_client_1 = require("../../lib/mongo-client");
var text_1 = require("../lib/text");
var Seed = /** @class */ (function () {
    function Seed() {
    }
    Seed.generate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = new Seed();
                        return [4 /*yield*/, seed.generate(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.up = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = new Seed();
                        return [4 /*yield*/, seed.do(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.down = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = new Seed();
                        return [4 /*yield*/, seed.down(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.prototype.getTargetFilepath = function (name) {
        if (!process.env.SEED_DIRECTORY)
            throw new error_1.RepositoryCLIError("SEED_DIRECTORY is not set...");
        return path.join(process.env.SEED_DIRECTORY, name + ".ts");
    };
    Seed.prototype.do = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var mongo, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongo_client_1.MongoConnection.get()];
                    case 1:
                        mongo = _a.sent();
                        return [4 /*yield*/, this.importSeedMocules(name)];
                    case 2:
                        seed = _a.sent();
                        return [4 /*yield*/, seed.up(mongo)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, mongo.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.prototype.down = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var mongo, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongo_client_1.MongoConnection.get()];
                    case 1:
                        mongo = _a.sent();
                        return [4 /*yield*/, this.importSeedMocules(name)];
                    case 2:
                        seed = _a.sent();
                        return [4 /*yield*/, seed.down(mongo)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, mongo.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.prototype.generate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, targetName, text, targetFilepath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createDirectory()];
                    case 1:
                        _a.sent();
                        filepath = this.getTargetFilepath(name);
                        return [4 /*yield*/, file_1.exists(filepath)];
                    case 2:
                        if (_a.sent())
                            throw new error_1.RepositoryCLIError(name + " is already exits...");
                        targetName = text_1.capitalizeFirstLetter(name);
                        text = "import { SeedBase, MongoDB } from \"@lu/repository\";\n\nexport class " + targetName + "Seed extends SeedBase {\n\tpublic async up(mongo: MongoDB): Promise<void> {\n\n\t}\n\tpublic async down(mongo: MongoDB): Promise<void> {\n\n\t}\n}\n";
                        targetFilepath = this.getTargetFilepath(name);
                        return [4 /*yield*/, file_1.write(targetFilepath, text)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.prototype.createDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.SEED_DIRECTORY) {
                            throw new error_1.RepositoryCLIError("SEED_DIRECTORY is not set...");
                        }
                        return [4 /*yield*/, file_1.mkdir(process.env.SEED_DIRECTORY)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Seed.prototype.importSeedMocules = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, result, _a, _b, _c, key, target, instance;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        filepath = this.getTargetFilepath(name);
                        return [4 /*yield*/, file_1.exists(filepath)];
                    case 1:
                        if ((_e.sent()) === false)
                            throw new error_1.RepositoryCLIError(name + " is not fount...");
                        return [4 /*yield*/, Promise.resolve().then(function () { return require(path.join(process.cwd(), filepath)); })];
                    case 2:
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
                                if (instance instanceof seed_1.SeedBase) {
                                    return [2 /*return*/, instance];
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Seed;
}());
exports.Seed = Seed;
//# sourceMappingURL=seed.js.map