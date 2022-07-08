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
var strings = require("ControlStrings");
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var telemetry = require("../../common/telemetry");
var ComboBox_1 = require("office-ui-fabric-react/lib/ComboBox");
var ListItemRepository_1 = require("../../common/dal/ListItemRepository");
var ComboBoxListItemPicker = (function (_super) {
    __extends(ComboBoxListItemPicker, _super);
    function ComboBoxListItemPicker(props) {
        var _this = _super.call(this, props) || this;
        /**
         * On Selected Item
         */
        _this.onChanged = function (option, index, value, submitPendingValueEvent) {
            if (_this.props.multiSelect) {
                if (option && option.selected) {
                    _this.selectedItems.push((_a = {},
                        _a[_this.props.keyColumnInternalName || "Id"] = option.key,
                        _a[_this.props.columnInternalName] = option.text,
                        _a.selected = option.selected,
                        _a));
                }
                else {
                    _this.selectedItems = _this.selectedItems.filter(function (o) { return o[_this.props.keyColumnInternalName || "Id"] !== option.key; });
                }
            }
            else {
                _this.selectedItems.push((_b = {},
                    _b[_this.props.keyColumnInternalName || "Id"] = option.key,
                    _b[_this.props.columnInternalName] = option.text,
                    _b));
                _this.selectedItems = _this.selectedItems.filter(function (o) { return o[_this.props.keyColumnInternalName || "Id"] === option.key; });
            }
            _this.props.onSelectedItem(_this.selectedItems);
            var _a, _b;
        };
        telemetry.track('ComboBoxListItemPicker', {});
        // States
        _this.state = {
            noresultsFoundText: !_this.props.noResultsFoundText ? strings.genericNoResultsFoundText : _this.props.noResultsFoundText,
            showError: false,
            errorMessage: "",
            suggestionsHeaderText: !_this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : _this.props.suggestionsHeaderText
        };
        // Get SPService Factory
        _this._listItemRepo = new ListItemRepository_1.ListItemRepository(_this.props.webUrl, _this.props.spHttpClient);
        _this.selectedItems = [];
        return _this;
    }
    ComboBoxListItemPicker.prototype.componentDidMount = function () {
        this.loadOptions();
    };
    ComboBoxListItemPicker.prototype.loadOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, keyColumnInternalName, listId, columnInternalName, webUrl, itemLimit, defaultSelectedItems, onInitialized, query, keyColumnName, listItems, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, filter = _a.filter, keyColumnInternalName = _a.keyColumnInternalName, listId = _a.listId, columnInternalName = _a.columnInternalName, webUrl = _a.webUrl, itemLimit = _a.itemLimit, defaultSelectedItems = _a.defaultSelectedItems, onInitialized = _a.onInitialized;
                        query = filter || "";
                        keyColumnName = keyColumnInternalName || "Id";
                        return [4 /*yield*/, this._listItemRepo.getListItemsByFilterClause(query, listId, columnInternalName, keyColumnInternalName, webUrl, itemLimit || 100)];
                    case 1:
                        listItems = _b.sent();
                        options = listItems.map(function (option) {
                            return {
                                key: option[keyColumnName],
                                text: option[columnInternalName || "Id"]
                            };
                        });
                        if (defaultSelectedItems) {
                            //if passed only ids
                            if (!isNaN(defaultSelectedItems[0])) {
                                this.selectedItems = options.filter(function (opt) { return defaultSelectedItems.indexOf(opt.key) >= 0; });
                            }
                            else {
                                this.selectedItems = options.filter(function (opt) { return defaultSelectedItems.map(function (selected) { return selected[keyColumnName]; }).indexOf(opt.key) >= 0; });
                            }
                        }
                        this.setState({
                            availableOptions: options
                        });
                        if (onInitialized) {
                            onInitialized();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboBoxListItemPicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.listId !== prevProps.listId) {
            this.selectedItems = [];
        }
    };
    /**
     * Render the field
     */
    ComboBoxListItemPicker.prototype.render = function () {
        var _a = this.props, className = _a.className, disabled = _a.disabled;
        return (this.state.availableOptions ? (React.createElement("div", null,
            React.createElement(ComboBox_1.ComboBox, { options: this.state.availableOptions, autoComplete: this.props.autoComplete, comboBoxOptionStyles: this.props.comboBoxOptionStyles, allowFreeform: this.props.allowFreeform, keytipProps: this.props.keytipProps, onMenuDismissed: this.props.onMenuDismiss, onMenuOpen: this.props.onMenuOpen, text: this.props.text, onChanged: this.onChanged, multiSelect: this.props.multiSelect, defaultSelectedKey: this.selectedItems.map(function (item) { return item.key; }) || [], className: className, disabled: disabled }),
            !!this.state.errorMessage &&
                (React.createElement(Label_1.Label, { style: { color: '#FF0000' } },
                    " ",
                    this.state.errorMessage,
                    " ")))) : React.createElement("span", null, "Loading..."));
    };
    return ComboBoxListItemPicker;
}(React.Component));
exports.ComboBoxListItemPicker = ComboBoxListItemPicker;

//# sourceMappingURL=ComboBoxListItemPicker.js.map
