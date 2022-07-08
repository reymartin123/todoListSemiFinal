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
 * Minutes component, renders the minutes dropdown
 */
var MinutesComponent = (function (_super) {
    __extends(MinutesComponent, _super);
    function MinutesComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._initMinutesOptions();
        return _this;
    }
    MinutesComponent.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChange = _a.onChange, timeDisplayControlType = _a.timeDisplayControlType;
        var renderDropdown = timeDisplayControlType === TimeDisplayControlType_1.TimeDisplayControlType.Dropdown;
        if (renderDropdown) {
            return (React.createElement(Dropdown_1.Dropdown, { disabled: this.props.disabled, label: '', options: this._minutes, onChanged: function (option) {
                    onChange(option.text);
                } }));
        }
        else {
            return (React.createElement(TextField_1.MaskedTextField, { disabled: disabled, label: "", value: value ? TimeHelper_1.TimeHelper.suffixZero(value.toString()) : "00", onGetErrorMessage: function (val) {
                    var message = "";
                    var minutes = parseInt(val);
                    if (isNaN(minutes)) {
                        message = strings.DateTimePickerMinuteValueInvalid;
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
    MinutesComponent.prototype._initMinutesOptions = function () {
        var minutes = [];
        for (var j = 0; j < 60; j++) {
            var digitMin = void 0;
            if (j < 10) {
                digitMin = '0' + j;
            }
            else {
                digitMin = j.toString();
            }
            var selected = false;
            if (j === this.props.value) {
                selected = true;
            }
            minutes.push({ key: j, text: digitMin, isSelected: selected });
        }
        this._minutes = minutes;
    };
    return MinutesComponent;
}(React.Component));
exports.default = MinutesComponent;

//# sourceMappingURL=MinutesComponent.js.map
