"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorConsole = exports.colors = void 0;
exports.colors = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
};
var reset = "\u001b[0m";
var ColorConsole = /** @class */ (function () {
    function ColorConsole() {
    }
    ColorConsole.log = function (color) {
        if (color === void 0) { color = "black"; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + exports.colors[color] + args + reset);
    };
    ColorConsole.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("" + exports.colors.green + args + reset);
    };
    ColorConsole.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("" + exports.colors.blue + args + reset);
    };
    ColorConsole.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn("" + exports.colors.yellow + args + reset);
    };
    ColorConsole.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error("" + exports.colors.red + args + reset);
    };
    return ColorConsole;
}());
exports.ColorConsole = ColorConsole;
//# sourceMappingURL=color.js.map