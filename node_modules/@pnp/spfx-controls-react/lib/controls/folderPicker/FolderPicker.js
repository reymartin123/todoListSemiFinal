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
var FolderPicker_module_scss_1 = require("./FolderPicker.module.scss");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Link_1 = require("office-ui-fabric-react/lib/Link");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var FolderExplorer_1 = require("../folderExplorer/FolderExplorer");
var FolderPicker = (function (_super) {
    __extends(FolderPicker, _super);
    function FolderPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._folderLinkId = Utilities_1.getId('folderLink');
        _this._showPanel = function () {
            _this.setState({ showPanel: true });
        };
        _this._hidePanel = function () {
            _this.setState({ showPanel: false });
        };
        _this._onRenderFooterContent = function () {
            return (React.createElement("div", { className: FolderPicker_module_scss_1.default.actions },
                React.createElement(Button_1.PrimaryButton, { iconProps: { iconName: 'Save' }, onClick: _this._onFolderSave }, "Save"),
                React.createElement(Button_1.DefaultButton, { iconProps: { iconName: 'Cancel' }, onClick: _this._hidePanel }, "Cancel")));
        };
        _this._onFolderSelect = function (folder) {
            _this._selectedFolder = folder;
        };
        _this._onFolderSave = function () {
            _this.setState({
                selectedFolder: _this._selectedFolder,
                showPanel: false,
            });
            _this.props.onSelect(_this._selectedFolder);
        };
        _this._resetSelection = function () {
            _this._selectedFolder = null;
            _this.setState({
                selectedFolder: _this._selectedFolder,
            });
            _this.props.onSelect(_this._selectedFolder);
        };
        _this.state = {
            showPanel: false,
            selectedFolder: _this.props.defaultFolder
        };
        return _this;
    }
    FolderPicker.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            selectedFolder: nextProps.defaultFolder,
        });
    };
    FolderPicker.prototype.render = function () {
        return (React.createElement("div", null,
            this.props.label &&
                React.createElement(Label_1.Label, { className: this.props.required ? FolderPicker_module_scss_1.default.required : '', htmlFor: this._folderLinkId }, this.props.label),
            React.createElement("div", { className: FolderPicker_module_scss_1.default.folderPicker },
                React.createElement("div", { className: FolderPicker_module_scss_1.default.selection },
                    !this.state.selectedFolder &&
                        React.createElement("span", { className: FolderPicker_module_scss_1.default.selectFolderLabel }, "Select a folder"),
                    this.state.selectedFolder &&
                        React.createElement("div", { className: FolderPicker_module_scss_1.default.selectFolder },
                            React.createElement(Link_1.Link, { className: FolderPicker_module_scss_1.default.selectFolder, target: '_blank', "data-interception": "off", id: this._folderLinkId, href: this.state.selectedFolder.ServerRelativeUrl },
                                React.createElement("span", { title: this.state.selectedFolder.Name }, this.state.selectedFolder.Name)),
                            React.createElement(Button_1.IconButton, { iconProps: { iconName: 'Cancel' }, title: "Delete selection", ariaLabel: "Delete selection", onClick: this._resetSelection, disabled: this.props.disabled }))),
                React.createElement("div", { className: FolderPicker_module_scss_1.default.selectButton },
                    React.createElement(Button_1.IconButton, { iconProps: { iconName: 'FolderList' }, title: "Select folder", ariaLabel: "Select folder", disabled: this.props.disabled, onClick: this._showPanel }))),
            React.createElement(Panel_1.Panel, { isOpen: this.state.showPanel, type: Panel_1.PanelType.medium, onDismiss: this._hidePanel, headerText: "Select folder", closeButtonAriaLabel: "Close", onRenderFooterContent: this._onRenderFooterContent },
                React.createElement("div", null,
                    React.createElement(FolderExplorer_1.FolderExplorer, { context: this.props.context, rootFolder: this.props.rootFolder, defaultFolder: this.state.selectedFolder, onSelect: this._onFolderSelect, canCreateFolders: this.props.canCreateFolders })))));
    };
    return FolderPicker;
}(React.Component));
exports.default = FolderPicker;

//# sourceMappingURL=FolderPicker.js.map
