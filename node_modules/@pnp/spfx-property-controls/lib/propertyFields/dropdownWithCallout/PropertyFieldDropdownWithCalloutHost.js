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
var PropertyFieldHeader_1 = require("../../common/propertyFieldHeader/PropertyFieldHeader");
var telemetry = require("../../common/telemetry");
var Dropdown_1 = require("office-ui-fabric-react/lib/components/Dropdown");
var SelectableOption_types_1 = require("office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types");
var omit = require('lodash.omit');
var PropertyFieldDropdownHost = (function (_super) {
    __extends(PropertyFieldDropdownHost, _super);
    function PropertyFieldDropdownHost(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('PropertyFieldDropdown', {
            disabled: props.disabled
        });
        return _this;
    }
    PropertyFieldDropdownHost.prototype.render = function () {
        var dropdownProps = omit(this.props, ['label']);
        dropdownProps.options = this._convertPropPaneOptionsToDropdownOptions(dropdownProps.options);
        return (React.createElement("div", null,
            React.createElement(PropertyFieldHeader_1.default, __assign({}, this.props)),
            React.createElement(Dropdown_1.Dropdown, __assign({}, dropdownProps))));
    };
    PropertyFieldDropdownHost.prototype._convertPropPaneOptionsToDropdownOptions = function (propPaneOptions) {
        return propPaneOptions.map(function (propPaneOption) {
            return {
                key: propPaneOption.key,
                text: propPaneOption.text,
                index: propPaneOption.index,
                itemType: SelectableOption_types_1.SelectableOptionMenuItemType[SelectableOption_types_1.SelectableOptionMenuItemType[propPaneOption.type]]
            };
        });
    };
    return PropertyFieldDropdownHost;
}(React.Component));
exports.default = PropertyFieldDropdownHost;

//# sourceMappingURL=PropertyFieldDropdownWithCalloutHost.js.map
