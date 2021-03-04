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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = exports.MongoDB = void 0;
var mongodb_1 = require("mongodb");
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        this.closing = false;
    }
    MongoDB.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, password, authDB, url, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = encodeURIComponent(process.env.MONGO_USER);
                        password = encodeURIComponent(process.env.MONGO_PASSWORD);
                        authDB = encodeURIComponent(process.env.MONGO_AUTHDB);
                        url = "mongodb://" + user + ":" + password + "@" + process.env.MONGO_PRIMARY_SERVER + "," + process.env.MONGO_SECONDARY_SERVER + "," + process.env.MONGO_ARBITER_SERVER + "/" + authDB;
                        _a = this;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(url, {
                                useNewUrlParser: true,
                                replicaSet: process.env.MONGO_REPRICASET,
                                useUnifiedTopology: true,
                            })];
                    case 1:
                        _a.mongoClient = _b.sent();
                        this.DB = this.mongoClient.db(process.env.MONGO_DB);
                        this.DB.on("close", function () {
                            _this.closing = true;
                        });
                        // initの際に入れ込む
                        return [4 /*yield*/, this.executeDbAdminCommand({
                                setParameter: 1,
                                maxTransactionLockRequestTimeoutMillis: 1000,
                            })];
                    case 2:
                        // initの際に入れ込む
                        _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    MongoDB.prototype.executeDbAdminCommand = function (command, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DB.executeDbAdminCommand(command, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.getMongoClient = function () {
        return this.mongoClient;
    };
    MongoDB.prototype.getMongoDb = function () {
        return this.DB;
    };
    MongoDB.prototype.getMongoCollection = function (name) {
        return this.getMongoDb().collection(name);
    };
    MongoDB.prototype.getMongoCollections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMongoDb().collections()];
            });
        });
    };
    MongoDB.prototype.getMongoStartSession = function () {
        return this.getMongoClient().startSession();
    };
    MongoDB.prototype.arraytojson = function (rows, key) {
        var e_1, _a;
        var param = {};
        try {
            for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                var row = rows_1_1.value;
                param[row[key]] = row;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return param;
    };
    MongoDB.prototype.existsCollection = function (collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var cols;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMongoDb().listCollections({ name: collectionName }).toArray()];
                    case 1:
                        cols = _a.sent();
                        return [2 /*return*/, cols.length !== 0];
                }
            });
        });
    };
    MongoDB.prototype.createCollection = function (collectionName) {
        return this.getMongoDb().createCollection(collectionName);
    };
    MongoDB.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.closing) return [3 /*break*/, 2];
                        this.closing = true;
                        return [4 /*yield*/, this.getMongoClient().close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//しんぐるとん
var MongoConnection = /** @class */ (function () {
    function MongoConnection() {
    }
    Object.defineProperty(MongoConnection, "connected", {
        get: function () {
            if (this.instance) {
                return this.instance.getMongoClient().isConnected();
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    MongoConnection.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongo, mongo, e_2, mongo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.instance) return [3 /*break*/, 5];
                        return [4 /*yield*/, new MongoDB().init()];
                    case 1:
                        mongo = _a.sent();
                        if (!!this.instance) return [3 /*break*/, 2];
                        this.instance = mongo;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, mongo.close()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!this.instance.closing) return [3 /*break*/, 7];
                        return [4 /*yield*/, new MongoDB().init()];
                    case 6:
                        mongo = _a.sent();
                        this.instance = mongo;
                        _a.label = 7;
                    case 7:
                        if (!!this.instance.getMongoClient().isConnected) return [3 /*break*/, 13];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.instance.close()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        e_2 = _a.sent();
                        console.error(e_2, "failed to close mongodbclient");
                        return [3 /*break*/, 11];
                    case 11: return [4 /*yield*/, new MongoDB().init()];
                    case 12:
                        mongo = _a.sent();
                        this.instance = mongo;
                        _a.label = 13;
                    case 13: return [2 /*return*/, this.instance];
                }
            });
        });
    };
    return MongoConnection;
}());
exports.MongoConnection = MongoConnection;
//# sourceMappingURL=mongo-client.js.map