"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Debounce function
 *
 * @param fnc Function to execute
 * @param time Time to wait until the function gets executed
 */
exports.debounce = function () {
    var timeout;
    return function (fnc, time) {
        var functionCall = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnc.apply(_this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};

//# sourceMappingURL=Util.js.map
