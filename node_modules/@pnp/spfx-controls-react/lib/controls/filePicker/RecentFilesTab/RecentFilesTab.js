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
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var List_1 = require("office-ui-fabric-react/lib/List");
var css_1 = require("@uifabric/utilities/lib/css");
var Selection_1 = require("office-ui-fabric-react/lib/Selection");
var Image_1 = require("office-ui-fabric-react/lib/Image");
var Check_1 = require("office-ui-fabric-react/lib/Check");
var Placeholder_1 = require("../../../Placeholder");
var Utilities_1 = require("../../../Utilities");
var strings = require("ControlStrings");
var RecentFilesTab_module_scss_1 = require("./RecentFilesTab.module.scss");
/**
 * Rows per page
 */
var ROWS_PER_PAGE = 3;
/**
 * Maximum row height
 */
var MAX_ROW_HEIGHT = 250;
var RecentFilesTab = (function (_super) {
    __extends(RecentFilesTab, _super);
    function RecentFilesTab(props) {
        var _this = _super.call(this, props) || this;
        _this._listElem = undefined;
        _this._onSelectionChanged = function () {
            // Get the selected item
            var selectedItems = _this._selection.getSelection();
            if (selectedItems && selectedItems.length > 0) {
                //Get the selected key
                var selectedKey_1 = selectedItems[0];
                var filePickerResult = {
                    fileAbsoluteUrl: selectedKey_1.fileUrl,
                    fileName: Utilities_1.GeneralHelper.getFileNameFromUrl(selectedKey_1.fileUrl),
                    fileNameWithoutExtension: Utilities_1.GeneralHelper.getFileNameWithoutExtension(selectedKey_1.fileUrl),
                    downloadFileContent: function () { return _this.props.fileSearchService.downloadSPFileContent(selectedKey_1.fileUrl, Utilities_1.GeneralHelper.getFileNameFromUrl(selectedKey_1.fileUrl)); }
                };
                // Save the selected file
                _this.setState({
                    filePickerResult: filePickerResult
                });
            }
            else {
                // Remove any selected file
                _this.setState({
                    filePickerResult: undefined
                });
            }
            if (_this._listElem) {
                // Force the list to update to show the selection check
                _this._listElem.forceUpdate();
            }
        };
        /**
           * Calculates how many items there should be in the page
           */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                _this._rowHeight = _this._columnWidth;
            }
            return _this._columnCount * ROWS_PER_PAGE;
        };
        /** Calculates the list "page" height (a.k.a. row) */
        _this._getPageHeight = function () {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        /**
         * Renders a "please wait" spinner while we're loading
         */
        _this._renderSpinner = function () {
            return React.createElement(Spinner_1.Spinner, { label: strings.Loading });
        };
        /**
         * Renders a message saying that there are no recent files
         */
        _this._renderPlaceholder = function () {
            return React.createElement(Placeholder_1.Placeholder, { iconName: 'OpenFolderHorizontal', iconText: strings.NoRecentFiles, description: strings.NoRecentFilesDescription });
        };
        /**
         * Renders a grid list containing results
         */
        _this._renderGridList = function () {
            return React.createElement("span", { className: RecentFilesTab_module_scss_1.default.recentGridList, role: "grid" },
                React.createElement(FocusZone_1.FocusZone, null,
                    React.createElement(Selection_1.SelectionZone, { selection: _this._selection, onItemInvoked: function (item) { return _this._handleItemInvoked(item); } },
                        React.createElement(List_1.List, { ref: _this._linkElement, items: _this.state.results, onRenderCell: _this._onRenderCell, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4 }))));
        };
        /**
         * Renders each result in its own cell
         */
        _this._onRenderCell = function (item, index) {
            var isSelected = false;
            if (_this._selection && index !== undefined) {
                isSelected = _this._selection.isIndexSelected(index);
            }
            return (React.createElement("div", { className: RecentFilesTab_module_scss_1.default.gridListCell, role: "gridCell" },
                React.createElement("div", { className: css_1.css(RecentFilesTab_module_scss_1.default.itemTile, RecentFilesTab_module_scss_1.default.isFile, RecentFilesTab_module_scss_1.default.hasThumbnail, isSelected ? RecentFilesTab_module_scss_1.default.isSelected : undefined), role: "link", "aria-selected": isSelected, "data-is-draggable": "false", "data-is-focusable": "true", "data-selection-index": index, "data-selection-invoke": "true", "data-item-index": index, "data-automationid": "ItemTile", style: {
                        width: _this._columnWidth,
                        height: _this._rowHeight
                    } },
                    React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileContent },
                        React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileFile },
                            React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileFileContainer },
                                React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileThumbnail },
                                    React.createElement(Image_1.Image, { src: item.fileUrl, width: _this._columnWidth, height: _this._rowHeight, imageFit: Image_1.ImageFit.cover })),
                                React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileCheckCircle, role: 'checkbox', "aria-checked": isSelected, "data-item-index": index, "data-selection-toggle": true, "data-automationid": 'CheckCircle' },
                                    React.createElement(Check_1.Check, { checked: isSelected })),
                                React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileNamePlate },
                                    React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileName }, item.name),
                                    React.createElement("div", { className: RecentFilesTab_module_scss_1.default.itemTileSubText },
                                        React.createElement("span", null,
                                            strings.EditedByNamePlate,
                                            item.editedBy)))))))));
        };
        /**
         * Gets called what a file is selected.
         */
        _this._handleItemInvoked = function (item) {
            _this._selection.setKeySelected(item.key, true, true);
        };
        /**
         * Gets called when it is time to save the currently selected item
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResult);
        };
        /**
         * Gets called when it is time to close (without saving)
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Creates a ref to the list
         */
        _this._linkElement = function (e) {
            _this._listElem = e;
        };
        _this._selection = new Selection_1.Selection({
            selectionMode: Selection_1.SelectionMode.single,
            onSelectionChanged: _this._onSelectionChanged
        });
        _this.state = {
            isLoading: true,
            results: [],
            filePickerResult: null
        };
        return _this;
    }
    /**
     * Gets the most recently used files
     */
    RecentFilesTab.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentFilesResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.fileSearchService.executeRecentSearch(this.props.accepts)];
                    case 1:
                        recentFilesResult = _a.sent();
                        this._selection.setItems(recentFilesResult, true);
                        this.setState({
                            isLoading: false,
                            results: recentFilesResult
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Render the tab
     */
    RecentFilesTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, results = _a.results, isLoading = _a.isLoading;
        return (React.createElement("span", { className: RecentFilesTab_module_scss_1.default.tabContainer },
            React.createElement("span", { className: RecentFilesTab_module_scss_1.default.tabHeaderContainer },
                React.createElement("h2", { className: RecentFilesTab_module_scss_1.default.tabHeader }, strings.RecentDocumentsHeader)),
            React.createElement("span", { className: RecentFilesTab_module_scss_1.default.tab }, isLoading ?
                this._renderSpinner() :
                results === undefined || results.length < 1 ? this._renderPlaceholder() : this._renderGridList()),
            React.createElement("span", { className: RecentFilesTab_module_scss_1.default.actionButtonsContainer },
                React.createElement("span", { className: RecentFilesTab_module_scss_1.default.actionButtons },
                    React.createElement(Button_1.PrimaryButton, { disabled: !this.state.filePickerResult, onClick: function () { return _this._handleSave(); }, className: RecentFilesTab_module_scss_1.default.actionButton }, strings.OpenButtonLabel),
                    React.createElement(Button_1.DefaultButton, { onClick: function () { return _this._handleClose(); }, className: RecentFilesTab_module_scss_1.default.actionButton }, strings.CancelButtonLabel)))));
    };
    return RecentFilesTab;
}(React.Component));
exports.default = RecentFilesTab;

//# sourceMappingURL=RecentFilesTab.js.map
