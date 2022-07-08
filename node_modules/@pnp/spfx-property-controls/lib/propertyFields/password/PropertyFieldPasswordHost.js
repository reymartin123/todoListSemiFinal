"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var PropertyFieldPasswordHost = (function (_super) {
    __extends(PropertyFieldPasswordHost, _super);
    function PropertyFieldPasswordHost(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.value
        };
        return _this;
    }
    ///
    PropertyFieldPasswordHost.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    };
    PropertyFieldPasswordHost.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(TextField_1.TextField, { type: "password", label: this.props.label ? this.props.label : null, value: this.state.value, onChanged: function (newValue) {
                    _this.setState({ value: newValue });
                    _this.props.onChanged(newValue);
                } })));
    };
    return PropertyFieldPasswordHost;
}(React.Component));
exports.default = PropertyFieldPasswordHost;

//# sourceMappingURL=PropertyFieldPasswordHost.js.map
