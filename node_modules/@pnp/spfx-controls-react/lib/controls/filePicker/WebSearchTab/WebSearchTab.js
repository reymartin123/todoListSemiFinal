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
var _1 = require(".");
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
var Check_1 = require("office-ui-fabric-react/lib/Check");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Image_1 = require("office-ui-fabric-react/lib/Image");
var Link_1 = require("office-ui-fabric-react/lib/Link");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var List_1 = require("office-ui-fabric-react/lib/List");
var Selection_1 = require("office-ui-fabric-react/lib/Selection");
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
var css_1 = require("@uifabric/utilities/lib/css");
var utilities_1 = require("../../../common/utilities");
var WebSearchTab_module_scss_1 = require("./WebSearchTab.module.scss");
var strings = require("ControlStrings");
/**
 * Renders search suggestions and performs seach queries
 */
var WebSearchTab = (function (_super) {
    __extends(WebSearchTab, _super);
    function WebSearchTab(props) {
        var _this = _super.call(this, props) || this;
        _this._listElem = undefined;
        _this._onSelectionChanged = function () {
            // Get the selected item
            var selectedItems = _this._selection.getSelection();
            var filePickerResult = _this.state.filePickerResult;
            var selectedFileResult = null;
            if (selectedItems && selectedItems.length > 0) {
                //Get the selected key
                var selectedItem = selectedItems[0];
                //Brute force approach to making sure all URLs are loading over HTTPS
                // even if it breaks the page.
                var selectedUrl_1 = selectedItem.contentUrl.replace('http://', 'https://');
                selectedFileResult = {
                    fileAbsoluteUrl: selectedUrl_1,
                    fileName: utilities_1.GeneralHelper.getFileNameFromUrl(selectedUrl_1),
                    fileNameWithoutExtension: utilities_1.GeneralHelper.getFileNameWithoutExtension(selectedUrl_1),
                    downloadFileContent: function () { return _this.props.bingSearchService.downloadBingContent(selectedUrl_1, utilities_1.GeneralHelper.getFileNameFromUrl(selectedUrl_1)); }
                };
            }
            // If clicked on already selected file -> deselect it
            if (filePickerResult && selectedFileResult && filePickerResult.fileAbsoluteUrl === selectedFileResult.fileAbsoluteUrl) {
                _this._selection.setAllSelected(false);
                selectedFileResult = null;
            }
            // Save the selected file
            _this.setState({
                filePickerResult: selectedFileResult
            });
            if (_this._listElem) {
                // Force the list to update to show the selection check
                _this._listElem.forceUpdate();
            }
        };
        /**
         * Resets state of the control to the default one
         */
        _this._clearSearch = function () {
            _this.setState({
                query: undefined,
                results: undefined,
                filePickerResult: undefined
            });
        };
        /**
         * Renders the returned search results
         */
        _this._renderSearchResults = function () {
            var results = _this.state.results;
            // If there are no results, tell 'em.
            if (results === undefined || results.length < 1) {
                return React.createElement(Label_1.Label, { className: WebSearchTab_module_scss_1.default.noResultLabel }, strings.NoResultsBadEnglish);
            }
            return (React.createElement(FocusZone_1.FocusZone, null,
                React.createElement(Selection_1.SelectionZone, { selection: _this._selection, onItemInvoked: function (item) { return _this._selection.setKeySelected(item.key, true, true); } },
                    React.createElement(List_1.List, { ref: _this._linkElement, className: WebSearchTab_module_scss_1.default.bingGrildList, items: _this.state.results, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4, onRenderCell: _this._onRenderSearchResultsCell }))));
        };
        /**
         * Show an individual search result item
         */
        _this._onRenderSearchResultsCell = function (item, index) {
            var query = _this.state.query;
            var isSelected = false;
            if (_this._selection && index !== undefined) {
                isSelected = _this._selection.isIndexSelected(index);
            }
            // The logic for calculating the thumbnail dimensions is not quite the same as the out-of-the-box file picker,
            // but it'll have to do.
            // Find the aspect ratio of the picture
            var ratio = item.width / item.height;
            // Fit the height to the desired row height
            var thumbnailHeight = Math.min(_this._rowHeight, item.height);
            // Resize the picture with the same aspect ratio
            var thumbnailWidth = thumbnailHeight * ratio;
            var searchResultAltText = strings.SearchResultAlt.replace('{0}', query);
            return (React.createElement("div", { className: WebSearchTab_module_scss_1.default.bingGridListCell, style: {
                    width: 100 / _this._columnCount + '%'
                } },
                React.createElement("div", { "aria-label": searchResultAltText, className: css_1.css(WebSearchTab_module_scss_1.default.bingTile, isSelected ? WebSearchTab_module_scss_1.default.isSelected : undefined), "data-is-focusable": true, "data-selection-index": index, style: {
                        width: thumbnailWidth + "px",
                        height: thumbnailHeight + "px"
                    } },
                    React.createElement("div", { className: WebSearchTab_module_scss_1.default.bingTileContent, "data-selection-invoke": true },
                        React.createElement(Image_1.Image, { src: item.thumbnailUrl, className: WebSearchTab_module_scss_1.default.bingTileThumbnail, alt: searchResultAltText, width: thumbnailWidth, height: thumbnailHeight }),
                        React.createElement("div", { className: WebSearchTab_module_scss_1.default.bingTileFrame }),
                        React.createElement("div", { className: WebSearchTab_module_scss_1.default.bingTileCheckCircle, role: 'checkbox', "aria-checked": isSelected, "data-item-index": index, "data-selection-toggle": true, "data-automationid": 'CheckCircle' },
                            React.createElement(Check_1.Check, { checked: isSelected })),
                        React.createElement("div", { className: WebSearchTab_module_scss_1.default.bingTileNamePlate },
                            React.createElement(Link_1.Link, { href: item.contentUrl, target: '_blank', "aria-label": strings.SearchResultAriaLabel }, item.displayUrl))))));
        };
        /**
         * Renders suggestions when there aren't any queries
         */
        _this._renderSearchSuggestions = function () {
            var suggestions = _this.props.suggestions !== undefined ? _this.props.suggestions : _1.DEFAULT_SUGGESTIONS;
            return (React.createElement(FocusZone_1.FocusZone, null,
                React.createElement(List_1.List, { className: WebSearchTab_module_scss_1.default.filePickerFolderCardGrid, items: suggestions, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4, onRenderCell: _this._onRenderSuggestionCell })));
        };
        /**
         * Gets search results from Bing
         */
        _this._getSearchResults = function () { return __awaiter(_this, void 0, void 0, function () {
            var searchParams, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Do nothing
                        if (this.state.query === undefined || !this.props.bingSearchService) {
                            return [2 /*return*/];
                        }
                        // Show a loading indicator + remove selection
                        this.setState({
                            filePickerResult: null,
                            isLoading: true
                        });
                        searchParams = {
                            aspect: this.state.aspect,
                            size: this.state.size,
                            license: this.state.license,
                            query: this.state.query
                        };
                        return [4 /*yield*/, this.props.bingSearchService.executeBingSearch(searchParams)];
                    case 1:
                        searchResults = _a.sent();
                        // If the results were obtained
                        if (searchResults) {
                            // Set the items so that the selection zone can keep track of them
                            this._selection.setItems(searchResults, true);
                        }
                        // Save results and stop loading indicator
                        this.setState({
                            isLoading: false,
                            results: searchResults
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Calculates how many items there should be in the page
         */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._columnCount = Math.ceil(surfaceRect.width / _1.MAX_ROW_HEIGHT);
                _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                _this._rowHeight = _this._columnWidth;
            }
            return _this._columnCount * _1.ROWS_PER_PAGE;
        };
        /**
         * Gets the height of a list "page"
         */
        _this._getPageHeight = function () {
            return _this._rowHeight * _1.ROWS_PER_PAGE;
        };
        /**
         * Renders a cell for search suggestions
         */
        _this._onRenderSuggestionCell = function (item, index) {
            return (React.createElement("div", { className: WebSearchTab_module_scss_1.default.filePickerFolderCardTile, "data-is-focusable": true, style: {
                    width: 100 / _this._columnCount + '%'
                } },
                React.createElement("div", { className: WebSearchTab_module_scss_1.default.filePickerFolderCardSizer },
                    React.createElement("div", { className: WebSearchTab_module_scss_1.default.filePickerFolderCardPadder },
                        React.createElement(Image_1.Image, { src: item.backgroundUrl, className: WebSearchTab_module_scss_1.default.filePickerFolderCardImage, imageFit: Image_1.ImageFit.cover }),
                        React.createElement(Button_1.DefaultButton, { className: WebSearchTab_module_scss_1.default.filePickerFolderCardLabel, onClick: function (_event) { return _this._handleSearch(item.topic); } }, item.topic)))));
        };
        /**
         * Renders the search box
         */
        _this._renderSearchBox = function () {
            var query = _this.state.query;
            var hasQuery = query !== undefined;
            var license = _this.state.license ? _this.state.license : 'All';
            return (React.createElement("div", { className: WebSearchTab_module_scss_1.default.searchBoxContainer },
                React.createElement("div", { className: WebSearchTab_module_scss_1.default.searchBoxMedium },
                    React.createElement("div", { className: WebSearchTab_module_scss_1.default.searchBox },
                        React.createElement(SearchBox_1.SearchBox, { placeholder: strings.SearchBoxPlaceholder, value: query, onSearch: function (newQuery) { return _this._handleSearch(newQuery); } }))),
                React.createElement(Label_1.Label, null, strings.PoweredByBing),
                hasQuery &&
                    React.createElement("div", { className: WebSearchTab_module_scss_1.default.dropdownContainer },
                        React.createElement(Dropdown_1.Dropdown, { className: WebSearchTab_module_scss_1.default.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: _this.state.size, options: [
                                { key: 'All', text: strings.SizeOptionAll },
                                { key: 'Small', text: strings.SizeOptionSmall },
                                { key: 'Medium', text: strings.SizeOptionMedium },
                                { key: 'Large', text: strings.SizeOptionLarge },
                                { key: 'Wallpaper', text: strings.SizeOptionExtraLarge }
                            ], onChanged: function (option, index) { return _this._handleChangeSize(option); } }),
                        React.createElement(Dropdown_1.Dropdown, { className: WebSearchTab_module_scss_1.default.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: _this.state.aspect, options: [
                                { key: 'All', text: strings.LayoutOptionAll },
                                { key: 'Square', text: strings.LayoutOptionSquare },
                                { key: 'Wide', text: strings.LayoutOptionWide },
                                { key: 'Tall', text: strings.LayoutOptionTall },
                            ], onChanged: function (option, index) { return _this._handleChangeLayout(option); } }),
                        React.createElement(Dropdown_1.Dropdown, { className: WebSearchTab_module_scss_1.default.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: license, options: [
                                { key: 'All', text: strings.LicenseOptionAll },
                                { key: 'Any', text: strings.LicenseOptionAny }
                            ], onChanged: function (option, index) { return _this._handleChangeLicense(option); } }))));
        };
        /**
         * Handles when a user changes the size drop down.
         * Resubmits search query
         */
        _this._handleChangeSize = function (option) {
            _this.setState({
                size: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when user selects a new layout from the drop down.
         * Resubmits search query.
         */
        _this._handleChangeLayout = function (option) {
            _this.setState({
                aspect: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when a user changes the license from the drop down
         * Resubits search query
         */
        _this._handleChangeLicense = function (option) {
            _this.setState({
                license: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Renders the drop down placeholders
         */
        _this._renderFilterPlaceholder = function (props) {
            // return <span>{props.placeholder}</span>;
            return React.createElement("span", null, "Pick the value");
        };
        /**
         * Handles when user triggers search query
         */
        _this._handleSearch = function (newQuery) {
            _this.setState({
                query: newQuery
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when user closes search pane
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Handes when user saves selection
         * Calls property pane file picker's save function
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResult);
        };
        /**
         * Creates a reference to the list
         */
        _this._linkElement = function (e) {
            _this._listElem = e;
        };
        _this._selection = new Selection_1.Selection({
            selectionMode: Selection_1.SelectionMode.single,
            onSelectionChanged: _this._onSelectionChanged
        });
        _this.state = {
            isLoading: false,
            results: undefined,
            filePickerResult: null
        };
        return _this;
    }
    /**
     * Render the tab
     */
    WebSearchTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, query = _a.query, results = _a.results;
        return (React.createElement("div", { className: WebSearchTab_module_scss_1.default.tabContainer },
            React.createElement("div", { className: WebSearchTab_module_scss_1.default.tabHeaderContainer },
                React.createElement(Link_1.Link, { onClick: this._clearSearch },
                    React.createElement("h2", { className: WebSearchTab_module_scss_1.default.tabHeader }, strings.WebSearchLinkLabel)),
                this.props.bingSearchService && this._renderSearchBox()),
            React.createElement("div", { className: WebSearchTab_module_scss_1.default.tab },
                !query && this._renderSearchSuggestions(),
                query && results && this._renderSearchResults()),
            React.createElement("div", { className: WebSearchTab_module_scss_1.default.actionButtonsContainer },
                this.state.results && this.state.license === 'Any' &&
                    React.createElement(MessageBar_1.MessageBar, null, strings.CreativeCommonsMessage),
                React.createElement(Label_1.Label, { className: WebSearchTab_module_scss_1.default.copyrightLabel },
                    strings.CopyrightWarning,
                    "\u00A0\u00A0",
                    React.createElement(Link_1.Link, { target: '_blank', href: strings.CopyrightUrl }, strings.LearnMoreLink)),
                React.createElement("div", { className: WebSearchTab_module_scss_1.default.actionButtons },
                    React.createElement(Button_1.PrimaryButton, { disabled: !this.state.filePickerResult, className: WebSearchTab_module_scss_1.default.actionButton, onClick: function () { return _this._handleSave(); } }, strings.OpenButtonLabel),
                    React.createElement(Button_1.DefaultButton, { onClick: function () { return _this._handleClose(); }, className: WebSearchTab_module_scss_1.default.actionButton }, strings.CancelButtonLabel)))));
    };
    return WebSearchTab;
}(React.Component));
exports.default = WebSearchTab;

//# sourceMappingURL=WebSearchTab.js.map
