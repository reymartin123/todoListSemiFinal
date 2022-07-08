"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var PropertyFieldSitePickerListItem_module_scss_1 = require("./PropertyFieldSitePickerListItem.module.scss");
exports.PropertyFieldSitePickerListItem = function (props) {
    var site = props.site, checked = props.checked;
    return (React.createElement("li", { className: PropertyFieldSitePickerListItem_module_scss_1.default.siteListItem, key: site.id },
        React.createElement(Checkbox_1.Checkbox, { className: PropertyFieldSitePickerListItem_module_scss_1.default.checkbox, checked: checked, onChange: function (ev, nowChecked) { return props.handleCheckboxChange(site, nowChecked); } }),
        React.createElement("span", { className: PropertyFieldSitePickerListItem_module_scss_1.default.title, title: site.title }, site.title)));
};

//# sourceMappingURL=PropertyFieldSitePickerListItem.js.map
