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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var IconPicker_module_scss_1 = require("./IconPicker.module.scss");
var strings = require("ControlStrings");
var IconNames_1 = require("./IconNames");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var debounce = require("lodash/debounce");
var telemetry = require("../../common/telemetry");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Icons_1 = require("office-ui-fabric-react/lib/Icons");
var IconPicker = (function (_super) {
    __extends(IconPicker, _super);
    function IconPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.radioIdBase = Utilities_1.getId("radio");
        _this.closePanel = function () {
            _this.setState({
                currentIcon: _this.props.currentIcon,
                isPanelOpen: false
            });
        };
        _this.iconPickerOnClick = function () {
            _this.setState({
                isPanelOpen: true,
                items: IconNames_1.IconNames.Icons
            });
        };
        _this.iconOnClick = function (iconName) {
            if (_this.props.onChange) {
                _this.props.onChange(iconName);
            }
            _this.setState({
                currentIcon: iconName
            });
        };
        _this.onAbort = function () {
            _this.setState({ items: IconNames_1.IconNames.Icons });
        };
        _this.onChange = function (newValue) {
            var items;
            if (newValue && newValue.trim().length > 2) {
                items = IconNames_1.IconNames.Icons.filter(function (item) {
                    return item.toLocaleLowerCase().indexOf(newValue.toLocaleLowerCase()) !== -1;
                });
            }
            else {
                items = IconNames_1.IconNames.Icons;
            }
            _this.setState({
                items: items
            });
        };
        _this.confirmSelection = function () {
            if (_this.props.onSave) {
                _this.props.onSave(_this.state.currentIcon);
            }
            _this.setState({
                isPanelOpen: false
            });
        };
        _this.renderPanelNav = function (props, defaultRender) {
            return React.createElement("div", { className: IconPicker_module_scss_1.default.navArea },
                React.createElement("h2", { className: IconPicker_module_scss_1.default.headTitle }, strings.SelectIcon),
                React.createElement(SearchBox_1.SearchBox, { className: IconPicker_module_scss_1.default.searchBox, onAbort: _this.onAbort, "data-automation-id": "icon-picker-search", onSearch: debounce(_this.onChange, 300), onChange: debounce(_this.onChange, 300) }),
                React.createElement("div", { className: IconPicker_module_scss_1.default.closeBtnContainer }, defaultRender(props)));
        };
        _this.renderPanelContent = function () {
            return React.createElement("div", null, _this.renderIcons());
        };
        _this.renderPanelFooter = function () {
            return React.createElement("div", { className: IconPicker_module_scss_1.default.footer, "data-automation-id": "icon-picker-footer" },
                React.createElement(Button_1.PrimaryButton, { text: strings.SaveButtonLabel, onClick: _this.confirmSelection, disabled: !_this.state.currentIcon, className: IconPicker_module_scss_1.default.btnSave, "data-automation-id": "icon-picker-save" }),
                React.createElement("div", { className: IconPicker_module_scss_1.default.selectionDisplay + " " + (!_this.state.currentIcon ? 'noSelection' : '') },
                    React.createElement("span", { className: IconPicker_module_scss_1.default.selectionLabel },
                        strings.SelectedLabel,
                        ":"),
                    React.createElement(Icon_1.Icon, { iconName: _this.state.currentIcon, className: IconPicker_module_scss_1.default.selectionIcon })),
                React.createElement(Button_1.DefaultButton, { text: strings.CancelButtonLabel, onClick: _this.closePanel, className: IconPicker_module_scss_1.default.btnCancel, "data-automation-id": "icon-picker-close" }));
        };
        _this.renderIcons = function () {
            return (React.createElement("ul", { className: IconPicker_module_scss_1.default.iconList }, _this.state.items.map(_this.renderIcon)));
        };
        _this.renderIcon = function (item) {
            var radioId = _this.radioIdBase + "-" + item;
            return React.createElement("li", { className: IconPicker_module_scss_1.default.iconItem },
                React.createElement("input", { type: "radio", name: _this.radioIdBase, id: radioId, className: IconPicker_module_scss_1.default.iconRadio, "data-automation-id": "icon-picker-" + item, checked: item == _this.state.currentIcon, onChange: function () { return _this.iconOnClick(item); } }),
                React.createElement("label", { className: IconPicker_module_scss_1.default.iconLabel, htmlFor: radioId, title: item },
                    React.createElement(Icon_1.Icon, { iconName: item, className: IconPicker_module_scss_1.default.iconGlyph }),
                    React.createElement("span", { className: IconPicker_module_scss_1.default.iconName }, item)));
        };
        Icons_1.initializeIcons();
        telemetry.track('IconPicker');
        _this.state = {
            items: IconNames_1.IconNames.Icons,
            isPanelOpen: false,
            currentIcon: _this.props.currentIcon || null
        };
        return _this;
    }
    IconPicker.prototype.render = function () {
        var _a = this.props, buttonLabel = _a.buttonLabel, buttonClassName = _a.buttonClassName, disabled = _a.disabled, panelClassName = _a.panelClassName;
        var renderOption = this.props.renderOption;
        renderOption = renderOption === undefined ? 'panel' : renderOption;
        return React.createElement("div", null,
            React.createElement(Button_1.PrimaryButton, { text: buttonLabel, onClick: this.iconPickerOnClick, className: buttonClassName, disabled: disabled, "data-automation-id": "icon-picker-open" }),
            renderOption === 'panel' ?
                React.createElement(Panel_1.Panel, { isOpen: this.state.isPanelOpen, onDismiss: this.closePanel, type: Panel_1.PanelType.medium, "data-automation-id": "icon-picker-panel", closeButtonAriaLabel: strings.CloseButton, className: panelClassName, onRenderNavigation: this.renderPanelNav, onRenderFooterContent: this.renderPanelFooter }, this.renderPanelContent())
                :
                    React.createElement(Dialog_1.Dialog, { hidden: !this.state.isPanelOpen, onDismiss: this.closePanel, isBlocking: true, containerClassName: IconPicker_module_scss_1.default.dialog, dialogContentProps: {
                            type: Dialog_1.DialogType.normal,
                            title: strings.SelectIcon,
                            showCloseButton: true,
                            className: panelClassName
                        } },
                        React.createElement(SearchBox_1.SearchBox, { className: IconPicker_module_scss_1.default.searchBox, onAbort: this.onAbort, "data-automation-id": "icon-picker-search", onSearch: debounce(this.onChange, 300), onChange: debounce(this.onChange, 300) }),
                        React.createElement("div", { className: IconPicker_module_scss_1.default.dialogIconsContainer }, this.renderPanelContent()),
                        React.createElement(Dialog_1.DialogFooter, null,
                            React.createElement("div", { className: IconPicker_module_scss_1.default.dialogFooter },
                                React.createElement(Icon_1.Icon, { iconName: this.state.currentIcon, className: IconPicker_module_scss_1.default.dialogSelectedIcons }),
                                React.createElement(Button_1.PrimaryButton, { className: IconPicker_module_scss_1.default.save, text: strings.SaveButtonLabel, onClick: this.confirmSelection, disabled: !this.state.currentIcon, "data-automation-id": "icon-picker-save" }),
                                React.createElement(Button_1.DefaultButton, { text: strings.CancelButtonLabel, onClick: this.closePanel, className: IconPicker_module_scss_1.default.btnCancel, "data-automation-id": "icon-picker-close" })))));
    };
    return IconPicker;
}(React.Component));
exports.IconPicker = IconPicker;

//# sourceMappingURL=IconPicker.js.map
