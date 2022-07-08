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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var Breadcrumb_1 = require("office-ui-fabric-react/lib/Breadcrumb");
var controls_1 = require("../controls");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Link_1 = require("office-ui-fabric-react/lib/Link");
var OneDriveFilesTab_module_scss_1 = require("./OneDriveFilesTab.module.scss");
var strings = require("ControlStrings");
var OneDriveFilesTab = (function (_super) {
    __extends(OneDriveFilesTab, _super);
    function OneDriveFilesTab(props) {
        var _this = _super.call(this, props) || this;
        _this.renderBreadcrumbItem = function (item) {
            return (React.createElement(Link_1.Link, { href: item.href, onClick: item.onClick, key: item.key, className: "ms-Link ms-Breadcrumb-itemLink " + OneDriveFilesTab_module_scss_1.default.breadcrumbNavItem }, item.text));
        };
        /**
         * Handles breadcrump item click
         */
        _this.onBreadcrumpItemClick = function (node) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            var breadcrumbClickedItemIndx = 0;
            // Site node clicked
            if (node.folderData == null) {
                _this.setState({
                    libraryAbsolutePath: undefined,
                    folderPath: undefined,
                    folderName: undefined
                });
            }
            else if (node.folderData != null) {
                _this._handleOpenFolder(node.folderData, false);
                // select which node has been clicked
                breadcrumbClickedItemIndx = sp_lodash_subset_1.findIndex(breadcrumbItems, function (item) { return item.folderData && item.folderData.absoluteUrl === node.key; });
            }
            // Trim nodes array
            breadcrumbItems = breadcrumbItems.slice(0, breadcrumbClickedItemIndx + 1);
            // Set new current node
            breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;
            _this.setState({
                breadcrumbItems: breadcrumbItems,
                filePickerResult: undefined
            });
        };
        /**
         * Is called when user selects a different file
         */
        _this._handleSelectionChange = function (filePickerResult) {
            if (filePickerResult) {
                filePickerResult.downloadFileContent = function () { return _this.props.oneDriveService.downloadSPFileContent(filePickerResult.spItemUrl, filePickerResult.fileName); };
            }
            _this.setState({
                filePickerResult: filePickerResult
            });
        };
        /**
         * Called when user saves
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResult);
        };
        /**
         * Called when user closes tab
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Triggered when user opens a file folder
         */
        _this._handleOpenFolder = function (folder, addBreadcrumbNode) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            if (addBreadcrumbNode) {
                breadcrumbItems.map(function (item) { return item.isCurrentItem = false; });
                var breadcrumbNode_1 = {
                    folderData: folder,
                    isCurrentItem: true,
                    text: folder.name,
                    key: folder.absoluteUrl
                };
                breadcrumbNode_1.onClick = function () { _this.onBreadcrumpItemClick(breadcrumbNode_1); };
                breadcrumbItems.push(breadcrumbNode_1);
            }
            _this.setState({
                folderPath: folder.serverRelativeUrl,
                folderName: folder.name,
                libraryAbsolutePath: folder.absoluteUrl,
                breadcrumbItems: breadcrumbItems
            });
        };
        _this.state = {
            filePickerResult: null,
            libraryAbsolutePath: undefined,
            libraryTitle: strings.DocumentLibraries,
            folderPath: undefined,
            folderName: strings.DocumentLibraries,
            breadcrumbItems: []
        };
        return _this;
    }
    OneDriveFilesTab.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var folderPath, libraryAbsolutePath, libraryTitle, oneDriveFolderData, breadcrumbItems, breadcrumbNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.oneDriveService.getOneDriveRootFolderRelativeUrl()];
                    case 1:
                        folderPath = _a.sent();
                        return [4 /*yield*/, this.props.oneDriveService.getOneDriveRootFolderFullUrl()];
                    case 2:
                        libraryAbsolutePath = _a.sent();
                        return [4 /*yield*/, this.props.oneDriveService.getOneDrivePersonalLibraryTitle()];
                    case 3:
                        libraryTitle = _a.sent();
                        oneDriveFolderData = {
                            isFolder: true,
                            modified: null,
                            absoluteUrl: libraryAbsolutePath,
                            name: libraryTitle,
                            fileIcon: "",
                            serverRelativeUrl: folderPath,
                            spItemUrl: "",
                            supportsThumbnail: false,
                            fileType: ""
                        };
                        breadcrumbItems = this.state.breadcrumbItems;
                        breadcrumbNode = {
                            folderData: oneDriveFolderData,
                            isCurrentItem: true,
                            text: oneDriveFolderData.name,
                            key: oneDriveFolderData.absoluteUrl
                        };
                        breadcrumbNode.onClick = function () { _this.onBreadcrumpItemClick(breadcrumbNode); };
                        breadcrumbItems.push(breadcrumbNode);
                        this.setState({
                            libraryAbsolutePath: libraryAbsolutePath,
                            folderName: folderPath,
                            libraryTitle: libraryTitle
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    OneDriveFilesTab.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: OneDriveFilesTab_module_scss_1.default.tabContainer },
            React.createElement("div", { className: OneDriveFilesTab_module_scss_1.default.tabHeaderContainer },
                React.createElement(Breadcrumb_1.Breadcrumb, { items: this.state.breadcrumbItems, onRenderItem: this.renderBreadcrumbItem, className: OneDriveFilesTab_module_scss_1.default.breadcrumbNav })),
            React.createElement("div", { className: OneDriveFilesTab_module_scss_1.default.tabFiles }, this.state.libraryAbsolutePath !== undefined &&
                React.createElement(controls_1.FileBrowser, { onChange: function (filePickerResult) { return _this._handleSelectionChange(filePickerResult); }, onOpenFolder: function (folder) { return _this._handleOpenFolder(folder, true); }, fileBrowserService: this.props.oneDriveService, libraryName: this.state.libraryTitle, folderPath: this.state.folderPath, accepts: this.props.accepts })),
            React.createElement("div", { className: OneDriveFilesTab_module_scss_1.default.actionButtonsContainer },
                React.createElement("div", { className: OneDriveFilesTab_module_scss_1.default.actionButtons },
                    React.createElement(Button_1.PrimaryButton, { disabled: !this.state.filePickerResult, onClick: function () { return _this._handleSave(); }, className: OneDriveFilesTab_module_scss_1.default.actionButton }, strings.OpenButtonLabel),
                    React.createElement(Button_1.DefaultButton, { onClick: function () { return _this._handleClose(); }, className: OneDriveFilesTab_module_scss_1.default.actionButton }, strings.CancelButtonLabel)))));
    };
    return OneDriveFilesTab;
}(React.Component));
exports.OneDriveFilesTab = OneDriveFilesTab;

//# sourceMappingURL=OneDriveFilesTab.js.map
