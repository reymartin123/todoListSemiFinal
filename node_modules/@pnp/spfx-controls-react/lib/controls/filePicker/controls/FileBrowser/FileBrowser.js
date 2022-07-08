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
var Utilities_1 = require("../../../../Utilities");
var IFileBrowserState_1 = require("./IFileBrowserState");
var TilesList_1 = require("../TilesList/TilesList");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var ScrollablePane_1 = require("office-ui-fabric-react/lib/ScrollablePane");
var FileBrowser_module_scss_1 = require("./FileBrowser.module.scss");
var strings = require("ControlStrings");
var LAYOUT_STORAGE_KEY = 'comparerSiteFilesLayout';
var FileBrowser = (function (_super) {
    __extends(FileBrowser, _super);
    function FileBrowser(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Triggers paged data load
         */
        _this._loadNextDataRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.loadingState == IFileBrowserState_1.LoadingState.idle)) return [3 /*break*/, 2];
                        // Load next list items from next page
                        return [4 /*yield*/, this._getListItems(true)];
                    case 1:
                        // Load next list items from next page
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
        * Renders a placeholder to indicate that the folder is empty
        */
        _this._renderEmptyFolder = function () {
            return (React.createElement("div", { className: FileBrowser_module_scss_1.default.emptyFolder },
                React.createElement("div", { className: FileBrowser_module_scss_1.default.emptyFolderImage },
                    React.createElement("img", { className: FileBrowser_module_scss_1.default.emptyFolderImageTag, src: strings.OneDriveEmptyFolderIconUrl, alt: strings.OneDriveEmptyFolderAlt })),
                React.createElement("div", { role: "alert" },
                    React.createElement("div", { className: FileBrowser_module_scss_1.default.emptyFolderTitle }, strings.OneDriveEmptyFolderTitle),
                    React.createElement("div", { className: FileBrowser_module_scss_1.default.emptyFolderSubText },
                        React.createElement("span", { className: FileBrowser_module_scss_1.default.emptyFolderPc }, strings.OneDriveEmptyFolderDescription)))));
        };
        /**
         * Renders row with file or folder style.
         */
        _this._onRenderRow = function (props) {
            var fileItem = props.item;
            return React.createElement(DetailsList_1.DetailsRow, __assign({}, props, { className: fileItem.isFolder ? FileBrowser_module_scss_1.default.folderRow : FileBrowser_module_scss_1.default.fileRow }));
        };
        /**
         * Get the list of toolbar items on the left side of the toolbar.
         * We leave it empty for now, but we may add the ability to upload later.
         */
        _this._getToolbarItems = function () {
            return [];
        };
        _this.getFarItems = function () {
            var selectedView = _this.state.selectedView;
            var viewIconName = undefined;
            var viewName = undefined;
            switch (_this.state.selectedView) {
                case 'list':
                    viewIconName = 'List';
                    viewName = strings.ListLayoutList;
                    break;
                case 'compact':
                    viewIconName = 'AlignLeft';
                    viewName = strings.ListLayoutCompact;
                    break;
                default:
                    viewIconName = 'GridViewMedium';
                    viewName = strings.ListLayoutTile;
            }
            var farItems = [
                {
                    key: 'listOptions',
                    className: FileBrowser_module_scss_1.default.commandBarNoChevron,
                    title: strings.ListOptionsTitle,
                    ariaLabel: strings.ListOptionsAlt.replace('{0}', viewName),
                    iconProps: {
                        iconName: viewIconName
                    },
                    iconOnly: true,
                    subMenuProps: {
                        items: [
                            {
                                key: 'list',
                                name: strings.ListLayoutList,
                                iconProps: {
                                    iconName: 'List'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'list',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutList).replace('{1}', selectedView === 'list' ? strings.Selected : undefined),
                                title: strings.ListLayoutListDescrition,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            },
                            {
                                key: 'compact',
                                name: strings.ListLayoutCompact,
                                iconProps: {
                                    iconName: 'AlignLeft'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'compact',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutCompact).replace('{1}', selectedView === 'compact' ? strings.Selected : undefined),
                                title: strings.ListLayoutCompactDescription,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            },
                            {
                                key: 'tiles',
                                name: 'Tiles',
                                iconProps: {
                                    iconName: 'GridViewMedium'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'tiles',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutTile).replace('{1}', selectedView === 'tiles' ? strings.Selected : undefined),
                                title: strings.ListLayoutTileDescription,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            }
                        ]
                    }
                }
            ];
            return farItems;
        };
        /**
         * Called when users switch the view
         */
        _this._handleSwitchLayout = function (item) {
            if (item) {
                // Store the user's favourite layout
                if (localStorage) {
                    localStorage.setItem(LAYOUT_STORAGE_KEY, item.key);
                }
                _this.setState({
                    selectedView: item.key
                });
            }
        };
        /**
         * Gratuitous sorting
         */
        _this._onColumnClick = function (event, column) {
            var columns = _this.state.columns;
            var items = _this.state.items;
            var isSortedDescending = column.isSortedDescending;
            // If we've sorted this column, flip it.
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            // Sort the items.
            items = items.concat([]).sort(function (a, b) {
                var firstValue = a[column.fieldName || ''];
                var secondValue = b[column.fieldName || ''];
                if (isSortedDescending) {
                    return firstValue > secondValue ? -1 : 1;
                }
                else {
                    return firstValue > secondValue ? 1 : -1;
                }
            });
            // Reset the items and columns to match the state.
            _this.setState({
                items: items,
                columns: columns.map(function (col) {
                    col.isSorted = col.key === column.key;
                    if (col.isSorted) {
                        col.isSortedDescending = isSortedDescending;
                    }
                    return col;
                })
            });
        };
        /**
         * When a folder is opened, calls parent tab to navigate down
         */
        _this._handleOpenFolder = function (item) {
            // De-select the list item that was clicked, the item in the same position
            _this._selection.setAllSelected(false);
            // item in the folder will appear selected
            _this.setState({
                loadingState: IFileBrowserState_1.LoadingState.loading,
                filePickerResult: undefined
            }, function () { _this.props.onOpenFolder(item); });
        };
        /**
         * Handles selected item change
         */
        _this._itemSelectionChanged = function (item) {
            var selectedItem = null;
            // Deselect item
            if (item && _this.state.filePickerResult && item.absoluteUrl == _this.state.filePickerResult.fileAbsoluteUrl) {
                _this._selection.setAllSelected(false);
                selectedItem = null;
            }
            else if (item) {
                var selectedItemIndex = _this.state.items.indexOf(item);
                _this._selection.selectToIndex(selectedItemIndex);
                selectedItem = item;
            }
            var filePickerResult = null;
            if (selectedItem && !selectedItem.isFolder) {
                filePickerResult = {
                    fileAbsoluteUrl: selectedItem.absoluteUrl,
                    fileName: Utilities_1.GeneralHelper.getFileNameFromUrl(selectedItem.name),
                    fileNameWithoutExtension: Utilities_1.GeneralHelper.getFileNameWithoutExtension(selectedItem.name),
                    spItemUrl: selectedItem.spItemUrl,
                    downloadFileContent: null
                };
            }
            _this.props.onChange(filePickerResult);
            _this.setState({
                filePickerResult: filePickerResult
            });
        };
        /**
         * Handles item click.
         */
        _this._handleItemInvoked = function (item) {
            // If a file is selected, open the library
            if (item.isFolder) {
                _this._handleOpenFolder(item);
            }
            else {
                // Otherwise, remember it was selected
                _this._itemSelectionChanged(item);
            }
        };
        // If possible, load the user's favourite layout
        var lastLayout = localStorage ?
            localStorage.getItem(LAYOUT_STORAGE_KEY)
            : 'list';
        var columns = [
            {
                key: 'column1',
                name: 'Type',
                ariaLabel: strings.TypeAriaLabel,
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'docIcon',
                headerClassName: FileBrowser_module_scss_1.default.iconColumnHeader,
                minWidth: 16,
                maxWidth: 16,
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    var folderIcon = strings.FolderIconUrl;
                    // TODO: Improve file icon URL
                    var isPhoto = Utilities_1.GeneralHelper.isImage(item.name);
                    var iconUrl = isPhoto ? strings.PhotoIconUrl : "https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-01-11_20190116.001/odsp-media/images/itemtypes/20_2x/" + item.fileType + ".png";
                    var altText = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);
                    return React.createElement("div", { className: FileBrowser_module_scss_1.default.fileTypeIcon },
                        React.createElement("img", { src: item.isFolder ? folderIcon : iconUrl, className: FileBrowser_module_scss_1.default.fileTypeIconIcon, alt: altText, title: altText }));
                }
            },
            {
                key: 'column2',
                name: strings.NameField,
                fieldName: 'fileLeafRef',
                minWidth: 210,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: strings.SortedAscending,
                sortDescendingAriaLabel: strings.SortedDescending,
                onColumnClick: _this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: function (item) {
                    if (item.isFolder) {
                        return React.createElement("span", { className: FileBrowser_module_scss_1.default.folderItem, onClick: function (_event) { return _this._handleOpenFolder(item); } }, item.name);
                    }
                    else {
                        return React.createElement("span", { className: FileBrowser_module_scss_1.default.fileItem }, item.name);
                    }
                },
            },
            {
                key: 'column3',
                name: strings.ModifiedField,
                fieldName: 'dateModifiedValue',
                minWidth: 120,
                isResizable: true,
                onColumnClick: _this._onColumnClick,
                data: 'number',
                onRender: function (item) {
                    //const dateModified = moment(item.modified).format(strings.DateFormat);
                    return React.createElement("span", null, item.modified);
                },
                isPadded: true
            },
            {
                key: 'column4',
                name: strings.ModifiedByField,
                fieldName: 'modifiedBy',
                minWidth: 120,
                isResizable: true,
                data: 'string',
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.modifiedBy);
                },
                isPadded: true
            },
            {
                key: 'column5',
                name: strings.FileSizeField,
                fieldName: 'fileSizeRaw',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'number',
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.fileSize ? Utilities_1.GeneralHelper.formatBytes(item.fileSize, 1) : undefined);
                }
            }
        ];
        _this._selection = new DetailsList_1.Selection({
            selectionMode: DetailsList_1.SelectionMode.single
        });
        _this.state = {
            columns: columns,
            items: [],
            nextPageQueryString: null,
            loadingState: IFileBrowserState_1.LoadingState.loading,
            selectedView: lastLayout,
            filePickerResult: null
        };
        return _this;
    }
    /**
     * Gets the list of files when settings change
     * @param prevProps
     * @param prevState
     */
    FileBrowser.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.folderPath !== prevProps.folderPath) {
            this._selection.setAllSelected(false);
            this._getListItems();
        }
    };
    /**
     * Gets the list of files when tab first loads
     */
    FileBrowser.prototype.componentDidMount = function () {
        this._getListItems();
    };
    FileBrowser.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            (this.state.items && this.state.items.length > 0 && this.state.loadingState != IFileBrowserState_1.LoadingState.loading) &&
                React.createElement("div", null,
                    React.createElement("div", { className: FileBrowser_module_scss_1.default.itemPickerTopBar },
                        React.createElement(CommandBar_1.CommandBar, { items: this._getToolbarItems(), farItems: this.getFarItems() })),
                    React.createElement("div", { className: FileBrowser_module_scss_1.default.scrollablePaneWrapper },
                        React.createElement(ScrollablePane_1.ScrollablePane, null, this.state.selectedView !== 'tiles' ?
                            (React.createElement(DetailsList_1.DetailsList, { items: this.state.items, compact: this.state.selectedView === 'compact', columns: this.state.columns, selectionMode: DetailsList_1.SelectionMode.single, setKey: "set", layoutMode: DetailsList_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, onActiveItemChanged: function (item, index, ev) { return _this._handleItemInvoked(item); }, selectionPreservedOnEmptyClick: true, enterModalSelectionOnTouch: true, onRenderRow: this._onRenderRow, onRenderMissingItem: this._loadNextDataRequest })) :
                            (React.createElement(TilesList_1.TilesList, { fileBrowserService: this.props.fileBrowserService, filePickerResult: this.state.filePickerResult, selection: this._selection, items: this.state.items, onFolderOpen: this._handleOpenFolder, onFileSelected: this._itemSelectionChanged, onNextPageDataRequest: this._loadNextDataRequest }))))),
            (this.state.loadingState === IFileBrowserState_1.LoadingState.idle && (!this.state.items || this.state.items.length <= 0)) &&
                /* Render information about empty folder */
                this._renderEmptyFolder(),
            this.state.loadingState != IFileBrowserState_1.LoadingState.idle &&
                React.createElement(Spinner_1.Spinner, { label: strings.Loading })));
    };
    /**
     * Gets all files in a library with a matchihg path
     */
    FileBrowser.prototype._getListItems = function (concatenateResults) {
        if (concatenateResults === void 0) { concatenateResults = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, libraryName, folderPath, accepts, _b, items, nextPageQueryString, filesQueryResult, loadingState, error_1, newItems;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, libraryName = _a.libraryName, folderPath = _a.folderPath, accepts = _a.accepts;
                        _b = this.state, items = _b.items, nextPageQueryString = _b.nextPageQueryString;
                        filesQueryResult = { items: [], nextHref: null };
                        loadingState = concatenateResults ? IFileBrowserState_1.LoadingState.loadingNextPage : IFileBrowserState_1.LoadingState.loading;
                        // If concatenate results is set to false -> it's needed to load new data without nextPageUrl
                        nextPageQueryString = concatenateResults ? nextPageQueryString : null;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        this.setState({
                            loadingState: loadingState,
                            nextPageQueryString: nextPageQueryString
                        });
                        return [4 /*yield*/, this.props.fileBrowserService.getListItems(libraryName, folderPath, accepts, nextPageQueryString)];
                    case 2:
                        // Load files in the folder
                        filesQueryResult = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _c.sent();
                        filesQueryResult.items = null;
                        console.error(error_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        // Remove the null mark from the end of the items array
                        if (concatenateResults && items && items.length > 0 && items.length[items.length - 1] == null) {
                            // Remove the null mark
                            items.splice(items.length - 1, 1);
                        }
                        newItems = concatenateResults ? items.concat(filesQueryResult.items) : filesQueryResult.items;
                        // If there are more items to load -> add null mark at the end of the array
                        if (filesQueryResult.nextHref != null) {
                            newItems.push(null);
                        }
                        if (!concatenateResults) {
                            // de-select anything that was previously selected
                            this._selection.setAllSelected(false);
                        }
                        this.setState({
                            items: newItems,
                            nextPageQueryString: filesQueryResult.nextHref,
                            // isLoading: false,
                            // isLoadingNextPage: false
                            loadingState: IFileBrowserState_1.LoadingState.idle
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FileBrowser;
}(React.Component));
exports.FileBrowser = FileBrowser;

//# sourceMappingURL=FileBrowser.js.map
