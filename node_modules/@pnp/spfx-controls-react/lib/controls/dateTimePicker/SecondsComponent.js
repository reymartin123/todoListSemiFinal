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
var strings = require("ControlStrings");
var React = require("react");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var TimeHelper_1 = require("./TimeHelper");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var TimeDisplayControlType_1 = require("./TimeDisplayControlType");
/**
 * Seconds component, renders the seconds dropdown
 */
var SecondsComponent = (function (_super) {
    __extends(SecondsComponent, _super);
    function SecondsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._initSecondsOptions();
        return _this;
    }
    SecondsComponent.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChange = _a.onChange, timeDisplayControlType = _a.timeDisplayControlType;
        var renderDropdown = timeDisplayControlType === TimeDisplayControlType_1.TimeDisplayControlType.Dropdown;
        if (renderDropdown) {
            return (React.createElement(Dropdown_1.Dropdown, { disabled: this.props.disabled, label: '', options: this._seconds, onChanged: function (option) {
                    onChange(option.text);
                } }));
        }
        else {
            return (React.createElement(TextField_1.MaskedTextField, { disabled: disabled, label: "", value: value ? TimeHelper_1.TimeHelper.suffixZero(value.toString()) : "00", onGetErrorMessage: function (val) {
                    var message = "";
                    var seconds = parseInt(val);
                    if (isNaN(seconds)) {
                        message = strings.DateTimePickerSecondValueInvalid;
                    }
                    if (!message) {
                        onChange(val);
                    }
                    return message;
                }, mask: "59", maskFormat: {
                    '5': /[0-5]/,
                    '9': /[0-9]/
                } }));
        }
    };
    SecondsComponent.prototype._initSecondsOptions = function () {
        var seconds = [];
        for (var k = 0; k < 60; k++) {
            var digitSec = void 0;
            if (k < 10) {
                digitSec = '0' + k;
            }
            else {
                digitSec = k.toString();
            }
            var selected = false;
            if (k === this.props.value) {
                selected = true;
            }
            seconds.push({ key: k, text: digitSec, isSelected: selected });
        }
        this._seconds = seconds;
    };
    return SecondsComponent;
}(React.Component));
exports.default = SecondsComponent;

//# sourceMappingURL=SecondsComponent.js.map
