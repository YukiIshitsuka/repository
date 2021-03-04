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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryInvalidError = void 0;
var RepositoryInvalidError = /** @class */ (function (_super) {
    __extends(RepositoryInvalidError, _super);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function RepositoryInvalidError() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _this = _super.apply(this, __spreadArray([], __read(params))) || this;
        Object.setPrototypeOf(_this, RepositoryInvalidError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, RepositoryInvalidError);
        }
        _this.name = "RepositoryInvalidError";
        return _this;
    }
    return RepositoryInvalidError;
}(Error));
exports.RepositoryInvalidError = RepositoryInvalidError;
//# sourceMappingURL=error.js.map