"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoincrementRepository = exports.Repository = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var mongo_client_1 = require("../lib/mongo-client");
var mongodb_1 = require("mongodb");
var validator_1 = require("@lu/validator");
var error_1 = require("../lib/error");
var transaction_1 = require("../lib/transaction");
var BaseRepository = /** @class */ (function () {
    function BaseRepository(session) {
        this.autoMigration = true;
        //transaction decoratorがセットしてくれる
        this._session = undefined;
        if (session) {
            this._session = session;
        }
    }
    /**
     * migrationを自動実行するかどうか。
     * @returns {boolean}
     */
    BaseRepository.prototype.isAutoMigrationTarget = function () {
        return this.autoMigration;
    };
    BaseRepository.prototype.getAutoincrementRepository = function () {
        if (!this.autoincrementRepo) {
            this.autoincrementRepo = new AutoincrementRepository(this.getSession());
        }
        return this.autoincrementRepo;
    };
    BaseRepository.prototype.getDate = function () {
        return new Date();
    };
    /**
     * データのセット
     * @param {any} attrebutes
     * @returns {Promise<void>}
     */
    BaseRepository.prototype.set = function (attrebutes) {
        return __awaiter(this, void 0, void 0, function () {
            var tmp, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof attrebutes !== "object")
                            return [2 /*return*/];
                        if (!this.attrebutes) {
                            this.attrebutes = {};
                        }
                        return [4 /*yield*/, this.parseOptional(attrebutes)];
                    case 1:
                        tmp = _b.sent();
                        this.attrebutes = __assign(__assign({}, this.attrebutes), tmp);
                        _a = "_id" in attrebutes;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, BaseRepository.exist(attrebutes["_id"])];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            this.attrebutes._id = new mongodb_1.ObjectId(attrebutes["_id"]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 検索をかけて値をセットする。
     * @param {Key} id
     */
    BaseRepository.prototype.findAndSet = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne({ _id: this.parseId(id) })];
                    case 1:
                        target = _a.sent();
                        if (!target)
                            throw new error_1.RepositoryInvalidError("targe id is not found...");
                        this.attrebutes = target;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * attrebutesにセットされているデータを保存する。
     * @returns {Promise<void>}
     */
    BaseRepository.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, attrebutes, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.attrebutes)
                            throw new error_1.RepositoryInvalidError("must set attrebutes...");
                        if (!this.attrebutes._id) return [3 /*break*/, 2];
                        _a = this.attrebutes, _id = _a._id, attrebutes = __rest(_a, ["_id"]);
                        return [4 /*yield*/, this.update({ _id: this.parseId(_id) }, {
                                $set: attrebutes,
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.insert(this.attrebutes)];
                    case 3:
                        result = _b.sent();
                        this.attrebutes._id = result.insertedId;
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * コレクション名を取得
     * @returns {string}
     */
    BaseRepository.getCollectionName = function () {
        var repo = new this();
        return repo.collectionName;
    };
    /**
     * セットしたattrebutestのclear
     * @returns {void}
     */
    BaseRepository.prototype.clearAttrebutes = function () {
        this.attrebutes = {};
    };
    /**
     * セッションを取得する。
     * @returns {ClientSession | undefined}
     */
    BaseRepository.prototype.getSession = function () {
        return this._session;
    };
    /**
     * セッションをセットする
     * @param {ClientSession} session
     * @returns {this}
     */
    BaseRepository.prototype.setSession = function (session) {
        this._session = session;
        return this;
    };
    /**
     * コレクション名の取得
     * @returns {string}
     */
    BaseRepository.prototype.getCollectionName = function () {
        if (!this.collectionName)
            throw new error_1.RepositoryInvalidError("must setting collection name!!");
        return this.collectionName;
    };
    /**
     * インスタンスの取得
     * @returns {Repository<T>}
     */
    BaseRepository.getInstance = function () {
        return new this.constructor();
    };
    BaseRepository.prototype.getDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongodb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongo_client_1.MongoConnection.get()];
                    case 1:
                        mongodb = _a.sent();
                        return [2 /*return*/, mongodb.getMongoDb()];
                }
            });
        });
    };
    BaseRepository.prototype.getMongoDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongodb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongo_client_1.MongoConnection.get()];
                    case 1:
                        mongodb = _a.sent();
                        return [2 /*return*/, mongodb];
                }
            });
        });
    };
    BaseRepository.prototype.collection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDB()];
                    case 1: return [2 /*return*/, (_a.sent()).collection(this.getCollectionName())];
                }
            });
        });
    };
    BaseRepository.prototype.getRules = function () {
        if (!this.rules)
            throw new error_1.RepositoryInvalidError("must setting document validation rule!!");
        return Object.entries(this.rules).reduce(function (a, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], rule = _c[1];
            if (rule.type === "autoincrement")
                return a;
            return __assign(__assign({}, a), (_b = {}, _b[key] = rule, _b));
        }, {});
    };
    BaseRepository.prototype.getAutoIncrementNames = function () {
        var tmp = Object.entries(this.rules).reduce(function (a, _a) {
            var _b = __read(_a, 2), key = _b[0], rule = _b[1];
            if (rule.type !== "autoincrement")
                return a;
            a.push(key);
            return a;
        }, []);
        return tmp;
    };
    BaseRepository.prototype.generateAutoincrement = function () {
        return this.getAutoincrementRepository().geneate(this.collectionName);
    };
    BaseRepository.prototype.generateAutoIncrementColumn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tmp, _a, _b, columnName, _c, _d, e_1_1;
            var e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        tmp = {};
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 8]);
                        _a = __values(this.getAutoIncrementNames()), _b = _a.next();
                        _f.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        columnName = _b.value;
                        _c = tmp;
                        _d = columnName;
                        return [4 /*yield*/, this.generateAutoincrement()];
                    case 3:
                        _c[_d] = _f.sent();
                        _f.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, tmp];
                }
            });
        });
    };
    BaseRepository.prototype.parseInsertDoc = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [{}];
                        return [4 /*yield*/, this.parse(doc)];
                    case 1:
                        _b = [__assign.apply(void 0, _a.concat([(_c.sent())]))];
                        return [4 /*yield*/, this.generateAutoIncrementColumn()];
                    case 2: return [2 /*return*/, __assign.apply(void 0, _b.concat([(_c.sent())]))];
                }
            });
        });
    };
    BaseRepository.prototype.parse = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, validator_1.Validator.parse(doc, this.getRules())];
            });
        });
    };
    BaseRepository.prototype.parseOptional = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var rules;
            return __generator(this, function (_a) {
                rules = Object.entries(this.getRules()).reduce(function (a, _a) {
                    var _b;
                    var _c = __read(_a, 2), key = _c[0], rule = _c[1];
                    if (rule.type === "autoincrement")
                        return a;
                    return __assign(__assign({}, a), (_b = {}, _b[key] = __assign(__assign({}, rule), { isOptional: true }), _b));
                }, {});
                return [2 /*return*/, validator_1.Validator.parse(doc, rules)];
            });
        });
    };
    BaseRepository.prototype.getTargetRules = function (keys) {
        return Object.entries(this.getRules()).reduce(function (a, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], rule = _c[1];
            if (!keys.includes(key))
                return a;
            return __assign(__assign({}, a), (_b = {}, _b[key] = rule, _b));
        }, {});
    };
    BaseRepository.prototype.getTargetRulesOptional = function (keys) {
        return Object.entries(this.getRules()).reduce(function (a, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], rule = _c[1];
            if (!keys.includes(key))
                return a;
            return __assign(__assign({}, a), (_b = {}, _b[key] = __assign(__assign({}, rule), { isOptional: true }), _b));
        }, {});
    };
    BaseRepository.prototype.parseTargetField = function (doc, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var rules;
            return __generator(this, function (_a) {
                rules = this.getTargetRules(keys);
                return [2 /*return*/, validator_1.Validator.parse(doc, rules)];
            });
        });
    };
    BaseRepository.prototype.parseTargetFieldOptional = function (doc, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var rules;
            return __generator(this, function (_a) {
                rules = this.getTargetRulesOptional(keys);
                return [2 /*return*/, validator_1.Validator.parse(doc, rules)];
            });
        });
    };
    BaseRepository.prototype.findToArray = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cursor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(query, options)];
                    case 1:
                        cursor = _a.sent();
                        return [2 /*return*/, cursor.toArray()];
                }
            });
        });
    };
    BaseRepository.prototype.find = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, collection.find(query, __assign(__assign({}, options), { session: this.getSession() }))];
                }
            });
        });
    };
    /**
     * 指定キーの最大値を取得する。
     * @param {T} key
     * @returns {( RepositorySchema)[T]}
     */
    BaseRepository.prototype.max = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, maxValue;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _c.sent();
                        return [4 /*yield*/, collection
                                .find({}, { projection: (_a = {}, _a[key] = 1, _a) })
                                .sort((_b = {}, _b[key] = -1, _b))
                                .limit(1)
                                .toArray()];
                    case 2:
                        maxValue = _c.sent();
                        if (!maxValue || maxValue.length === 0) {
                            return [2 /*return*/, 0];
                        }
                        else {
                            return [2 /*return*/, maxValue[0][key]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 全件取得
     * @returns {Promise<Cursor<( RepositorySchema)>>}
     */
    BaseRepository.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, collection.find()];
                }
            });
        });
    };
    /**
     * 取得（1件）
     * @param {FilterQuery<( RepositorySchema)>} query 検索条件
     * @param {FindOneOptions<( RepositorySchema)>} findOneOptions 検索オプション
     * @returns {Promise<RepositorySchema>}
     */
    BaseRepository.prototype.findOne = function (query, findOneOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, collection.findOne(query, __assign(__assign({}, findOneOptions), { session: this.getSession() }))];
                }
            });
        });
    };
    BaseRepository.prototype.uniqueCheck = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, uniques, query, key, label, result, label, e_2_1;
            var e_2, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 5, 6, 7]);
                        _a = __values(this.uniques), _b = _a.next();
                        _f.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        uniques = _b.value;
                        if (uniques.length === 0)
                            return [3 /*break*/, 3];
                        if (!this.temporaryUniqueCheckData)
                            this.temporaryUniqueCheckData = new Map();
                        query = uniques.reduce(function (a, b) {
                            var _a;
                            return __assign(__assign({}, a), (_a = {}, _a[b] = doc[b], _a));
                        }, {});
                        key = JSON.stringify(query);
                        if (this.temporaryUniqueCheckData.has(key)) {
                            label = this.rules[uniques[0]].label;
                            throw new validator_1.ValidationError((_d = {}, _d[uniques[0]] = label + "\uFF1A" + query[uniques[0]] + "\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002", _d));
                        }
                        return [4 /*yield*/, this.findToArray(query)];
                    case 2:
                        result = _f.sent();
                        if (result.length) {
                            label = this.rules[uniques[0]].label;
                            throw new validator_1.ValidationError((_e = {}, _e[uniques[0]] = label + "\uFF1A" + query[uniques[0]] + "\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002", _e));
                        }
                        this.temporaryUniqueCheckData.set(key, query);
                        _f.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _f.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 作成
     * @param {any} doc
     * @param {boolean} validated
     * @returns {Promise<InsertOneWriteOpResult< RepositorySchema>>}
     */
    BaseRepository.prototype.insert = function (doc, validated) {
        if (validated === void 0) { validated = false; }
        return __awaiter(this, void 0, void 0, function () {
            var now, insertDoc, _a, collection, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = this.getDate();
                        if (!validated) return [3 /*break*/, 1];
                        _a = doc;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.parseInsertDoc(doc)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        insertDoc = _a;
                        console.log(this.getCollectionName(), this.getSession() ? this.getSession().id : undefined);
                        return [4 /*yield*/, this.collection()];
                    case 4:
                        collection = _b.sent();
                        if (!this.uniques.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.uniqueCheck(insertDoc)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, collection.insertOne(__assign(__assign({}, insertDoc), { createdAt: now, updatedAt: now }), { session: this._session })];
                    case 7:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 作成（複数）
     * @param {any[]} docs
     * @returns {Promise<InsertWriteOpResult< RepositorySchema>>}
     */
    BaseRepository.prototype.insertMany = function (docs) {
        return __awaiter(this, void 0, void 0, function () {
            var insertDocs, doUniqueCheck, docs_1, docs_1_1, doc, insertDoc, e_3_1, collection, now, result;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!Array.isArray(docs)) {
                            throw new error_1.RepositoryInvalidError("不正なリクエストです。");
                        }
                        insertDocs = [];
                        doUniqueCheck = this.uniques.length > 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        docs_1 = __values(docs), docs_1_1 = docs_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!docs_1_1.done) return [3 /*break*/, 7];
                        doc = docs_1_1.value;
                        return [4 /*yield*/, this.parseInsertDoc(doc)];
                    case 3:
                        insertDoc = _b.sent();
                        if (!doUniqueCheck) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.uniqueCheck(doc)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        insertDocs.push(insertDoc);
                        _b.label = 6;
                    case 6:
                        docs_1_1 = docs_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (docs_1_1 && !docs_1_1.done && (_a = docs_1.return)) _a.call(docs_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10: return [4 /*yield*/, this.collection()];
                    case 11:
                        collection = _b.sent();
                        now = this.getDate();
                        return [4 /*yield*/, collection.insertMany(insertDocs.map(function (doc) {
                                return __assign(__assign({}, doc), { createdAt: now, updatedAt: now });
                            }), {
                                session: this._session,
                            })];
                    case 12:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 指定のキーを元にjsonを作成
     * @param {T[]} rows データの配列
     * @param {string} usekey 対象とするキー名称
     * @returns { [k: string]: T }
     */
    BaseRepository.arraytojson = function (rows, usekey) {
        var e_4, _a;
        var param = {};
        try {
            for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                var row = rows_1_1.value;
                var k = row[usekey];
                var key = void 0;
                if (typeof k === "object") {
                    key = k.toHexString();
                }
                else {
                    key = k;
                }
                param[key] = row;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return param;
    };
    /**
     * upsertする。（あれば更新、なければ作成）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<Key>} _idを返却
     */
    BaseRepository.prototype.upsert = function (filter, query) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                collection.updateOne(filter, query, { upsert: true, session: _this._session }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            if (result.upsertedId) {
                                                resolve(result.upsertedId._id);
                                            }
                                            else {
                                                resolve(undefined);
                                            }
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    /**
     * データの削除（複数）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @returns {Promise<number>} 削除件数
     */
    BaseRepository.prototype.deleteMany = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                collection.deleteMany(filter, { session: _this._session }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve(result.deletedCount);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    /**
     * データの削除
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @returns {Promise<number>} 削除件数
     */
    BaseRepository.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                collection.deleteOne(filter, { session: _this._session }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve(result.deletedCount);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    /**
     * データを更新する。（複数レコード）
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<number>} 更新件数
     */
    BaseRepository.prototype.updateMany = function (filter, query) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        // 更新時間を必ずsetする
                        if (!query.$set)
                            query.$set = {};
                        if (!query.$set.updatedAt) {
                            query.$set = __assign(__assign({}, query.$set), { updatedAt: this.getDate() });
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                collection.updateMany(filter, query, { upsert: false, session: _this._session }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve(result.matchedCount);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    /**
     * データを更新する。
     * @param {FilterQuery< RepositorySchema>} filter 検索条件
     * @param {UpdateQuery< RepositorySchema>} query 更新内容
     * @returns {Promise<number>} 更新件数
     */
    BaseRepository.prototype.update = function (filter, query) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        // 更新時間を必ずsetする
                        if (!query.$set)
                            query.$set = {};
                        if (!query.$set.updatedAt) {
                            query.$set = __assign(__assign({}, query.$set), { updatedAt: this.getDate() });
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                collection.updateOne(filter, query, { upsert: false, session: _this._session }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve(result.matchedCount);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    /**
     * コレクションを作成する。
     * @returns {Promise<void>}
     */
    BaseRepository.prototype.makeCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collectionName, mongodb, collection, indexes, uniques;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collectionName = this.getCollectionName();
                        console.log("collection " + collectionName + " created!!");
                        return [4 /*yield*/, this.getMongoDB()];
                    case 1:
                        mongodb = _a.sent();
                        return [4 /*yield*/, mongodb.existsCollection(collectionName)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, console.log("collection \"" + collectionName + "\" already exists. skipping...")];
                        }
                        return [4 /*yield*/, mongodb.createCollection(collectionName)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.collection()];
                    case 4:
                        collection = _a.sent();
                        console.log("indexes::", this.indexes);
                        indexes = this.indexes.map(function (index) {
                            var e_5, _a;
                            var tmp = {};
                            try {
                                for (var index_1 = __values(index), index_1_1 = index_1.next(); !index_1_1.done; index_1_1 = index_1.next()) {
                                    var key = index_1_1.value;
                                    tmp[key] = 1;
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (index_1_1 && !index_1_1.done && (_a = index_1.return)) _a.call(index_1);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            return { key: tmp };
                        });
                        console.log("uniques::", this.uniques);
                        uniques = this.uniques.map(function (unique) {
                            var e_6, _a;
                            var tmp = {};
                            try {
                                for (var unique_1 = __values(unique), unique_1_1 = unique_1.next(); !unique_1_1.done; unique_1_1 = unique_1.next()) {
                                    var key = unique_1_1.value;
                                    tmp[key] = 1;
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (unique_1_1 && !unique_1_1.done && (_a = unique_1.return)) _a.call(unique_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                            return { key: tmp, unique: true }; // unique制約を追加
                        });
                        if (!(indexes.length || uniques.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, collection.createIndexes(__spreadArray(__spreadArray([], __read(indexes)), __read(uniques)))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log("collection " + this.collectionName + " created!!");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {object[]} pipeline
     * @param {CollectionAggregationOptions} [options = undefined]
     * @returns {Promise<T[]>}
     */
    BaseRepository.prototype.aggregate = function (pipeline, options) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.aggregate(pipeline, options).toArray()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * データがいくつか
     * @returns {Promise<number>}
     */
    BaseRepository.count = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, cursor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.all()];
                    case 1:
                        cursor = _a.sent();
                        return [2 /*return*/, cursor.count()];
                }
            });
        });
    };
    /**
     * 対象のIDのデータが存在するか
     * @param {Key} id 検索対象のID
     * @returns {Promise<boolean>}
     */
    BaseRepository.prototype.exist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = !!id;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findOne({ _id: this.parseId(id) })];
                    case 1:
                        _a = !!(_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        });
    };
    /**
     * 対象のIDのデータが存在するか
     * @param {Key} id 検索対象のID
     * @returns {Promise<boolean>}
     */
    BaseRepository.exist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repo = new this();
                        _a = !!id;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, repo.findOne({ _id: repo.parseId(id) })];
                    case 1:
                        _a = !!(_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        });
    };
    /**
     * 作成
     * @param {WithoutAutoGenerateColumn<TSchema>} doc
     * @returns {Promise<Key>}
     */
    BaseRepository.create = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transaction_1.wrapTransaction(function (session) { return __awaiter(_this, void 0, void 0, function () {
                            var repo, response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        repo = new this(session);
                                        return [4 /*yield*/, repo.insert(doc)];
                                    case 1:
                                        response = _a.sent();
                                        return [2 /*return*/, response.insertedId];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 作成（複数）
     * @param {WithoutAutoGenerateColumn<TSchema>[]} docs
     * @returns {Promise<void>}
     */
    BaseRepository.createMany = function (docs) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.insertMany(docs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新。更新したIDを返す。
     * @param {Key} id 更新対象のID
     * @param {any} doc
     * @returns {Promise<TSchema>}
     */
    BaseRepository.update = function (id, doc) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, tmp, targetId, target, _a, _b, uniques, result, label, e_7_1;
            var e_7, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.parseOptional(doc)];
                    case 1:
                        tmp = _e.sent();
                        if (Object.keys(tmp).length === 0)
                            throw new error_1.RepositoryInvalidError("update data is required!!");
                        targetId = repo.parseId(id);
                        return [4 /*yield*/, repo.findOne({ _id: targetId })];
                    case 2:
                        target = _e.sent();
                        if (!target)
                            throw new error_1.RepositoryInvalidError("\u66F4\u65B0\u5BFE\u8C61\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002 (\u5BFE\u8C61\u306EID:" + id + ")");
                        if (!repo.uniques.length) return [3 /*break*/, 10];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 8, 9, 10]);
                        _a = __values(repo.uniques), _b = _a.next();
                        _e.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 7];
                        uniques = _b.value;
                        if (uniques.length === 0)
                            return [3 /*break*/, 6];
                        if (uniques.every(function (unique) { return !tmp[unique] || tmp[unique] === target[unique]; }))
                            return [3 /*break*/, 6];
                        return [4 /*yield*/, repo.findToArray({
                                $and: __spreadArray(__spreadArray([], __read(uniques.map(function (unique) {
                                    var _a;
                                    return (_a = {}, _a[unique] = tmp[unique], _a);
                                }))), [{ _id: { $ne: targetId } }]),
                            })];
                    case 5:
                        result = _e.sent();
                        if (result.length) {
                            label = repo.getRules()[uniques[0]].label;
                            throw new validator_1.ValidationError((_d = {}, _d[uniques[0]] = label + "\uFF1A" + tmp[uniques[0]] + "\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002", _d));
                        }
                        _e.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_7_1 = _e.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 10: return [4 /*yield*/, repo.update({ _id: targetId }, { $set: tmp })];
                    case 11:
                        _e.sent();
                        return [2 /*return*/, targetId];
                }
            });
        });
    };
    /**
     * 対象のIDのデータを削除する
     * @param {Key} id 削除対象のID
     * @returns {Promise<number>}
     */
    BaseRepository.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.delete({ _id: repo.parseId(id) })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * データをクリアする
     * @returns {Promise<void>}
     */
    BaseRepository.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * データをクリアする
     * @returns {Promise<void>}
     */
    BaseRepository.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.deleteMany({});
                return [2 /*return*/];
            });
        });
    };
    /**
     * IDを取得する。
     * @param id
     * @returns {Promise<Key>}
     */
    BaseRepository.getId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.findOne({ _id: repo.parseId(id) })];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            throw new error_1.RepositoryInvalidError("データが存在しません。");
                        return [2 /*return*/, result._id];
                }
            });
        });
    };
    // read系はgenericが必要になるのでprotectedで定義し、publicなmethodは個別で作成する。
    BaseRepository.select = function (filterQuery, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.findToArray(filterQuery, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseRepository.one = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = new this();
                        return [4 /*yield*/, repo.findOne({ _id: repo.parseId(id) }, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseRepository.prototype.parseId = function (id) {
        if ("_id" in this.rules) {
            return id;
        }
        return new mongodb_1.ObjectId(id);
    };
    __decorate([
        transaction_1.transaction(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], BaseRepository.prototype, "insertMany", null);
    return BaseRepository;
}());
var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Repository;
}(BaseRepository));
exports.Repository = Repository;
var AutoincrementRepository = /** @class */ (function (_super) {
    __extends(AutoincrementRepository, _super);
    function AutoincrementRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collectionName = "autoincrement";
        _this.uniques = [["collectionName"]];
        _this.indexes = [];
        _this.rules = {
            collectionName: {
                type: "string",
                label: "collectionName",
            },
            seq: {
                type: "number",
                label: "seq",
            },
        };
        return _this;
    }
    /**
     * auto incrementのIDを発行する。
     * @param collectionName
     * @param session
     * @returns {Promise<Seq>}
     */
    AutoincrementRepository.generate = function (collectionName, session) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                repo = new AutoincrementRepository(session);
                return [2 /*return*/, repo.geneate(collectionName)];
            });
        });
    };
    AutoincrementRepository.prototype.getSeq = function (seq) {
        return seq;
    };
    /**
     * auto incrementのIDを発行する。
     * @param collectionName
     * @returns {Promise<Seq>}
     */
    AutoincrementRepository.prototype.geneate = function (collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var tmp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getSession())
                            throw new error_1.RepositoryInvalidError("generate autoincrement is wrap transaction!!");
                        console.log(this.getCollectionName(), this.getSession().id);
                        return [4 /*yield*/, this.upsert({ collectionName: collectionName }, { $inc: { seq: 1 } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findOne({ collectionName: collectionName })];
                    case 2:
                        tmp = _a.sent();
                        return [2 /*return*/, this.getSeq(tmp.seq)];
                }
            });
        });
    };
    return AutoincrementRepository;
}(Repository));
exports.AutoincrementRepository = AutoincrementRepository;
//# sourceMappingURL=index.js.map