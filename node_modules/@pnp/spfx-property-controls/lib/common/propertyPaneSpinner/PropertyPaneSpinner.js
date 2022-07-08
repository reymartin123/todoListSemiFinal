"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
exports.PropertyPaneSpinner = function (props) {
    return (React.createElement(Spinner_1.Spinner, __assign({ style: {
            top: "50%",
            position: "relative"
        } }, props)));
};

//# sourceMappingURL=PropertyPaneSpinner.js.map
