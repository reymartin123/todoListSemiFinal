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
var TreeView_module_scss_1 = require("./TreeView.module.scss");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var strings = require("ControlStrings");
var ITreeViewProps_1 = require("./ITreeViewProps");
var TreeItemActionsControl_1 = require("./TreeItemActionsControl");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/**
 * CSS styles for checkbox
 */
var checkBoxStyle = {
    display: "inline-flex"
};
/**
 * Renders the controls for TreeItem component
 */
var TreeItem = (function (_super) {
    __extends(TreeItem, _super);
    /**
     * Constructor method
     * @param props properties interface
     */
    function TreeItem(props, state) {
        var _this = _super.call(this, props) || this;
        /**
         * Process the child nodes
         */
        _this.createChildNodes = function (list, paddingLeft) {
            if (list.length) {
                var _a = _this.props, treeItem = _a.treeItem, selectionMode_1 = _a.selectionMode, activeItems_1 = _a.activeItems, parentCallbackExpandCollapse_1 = _a.parentCallbackExpandCollapse, parentCallbackOnSelect_1 = _a.parentCallbackOnSelect, onRenderItem_1 = _a.onRenderItem, showCheckboxes_1 = _a.showCheckboxes, treeItemActionsDisplayMode_1 = _a.treeItemActionsDisplayMode;
                var childrenWithHandlers = list.map(function (item, index) {
                    return (React.createElement(TreeItem, { treeItem: item, defaultExpanded: _this.state.expanded, leftOffset: paddingLeft, selectionMode: selectionMode_1, activeItems: activeItems_1, isFirstRender: !paddingLeft ? true : false, parentCallbackExpandCollapse: parentCallbackExpandCollapse_1, parentCallbackOnSelect: parentCallbackOnSelect_1, onRenderItem: onRenderItem_1, showCheckboxes: showCheckboxes_1, treeItemActionsDisplayMode: treeItemActionsDisplayMode_1, nodesToExpand: _this.props.nodesToExpand }));
                });
                return childrenWithHandlers;
            }
        };
        /**
         * Default action callback
         */
        _this.treeItemActionCallback = function () {
        };
        // Check if current item is selected
        var active = props.activeItems.filter(function (item) { return item.key === props.treeItem.key; });
        var expanded = props.defaultExpanded;
        if (props.nodesToExpand.indexOf(props.treeItem.key) != -1) {
            expanded = true;
        }
        _this.state = {
            selected: active.length > 0,
            // expanded: this.props.defaultExpanded
            expanded: expanded
        };
        // Bind control events
        _this._itemSelected = _this._itemSelected.bind(_this);
        _this._handleExpandCollapse = _this._handleExpandCollapse.bind(_this);
        return _this;
    }
    /**
     * Handle the checkbox change trigger
     */
    TreeItem.prototype._itemSelected = function (ev, isChecked) {
        this.setState({
            selected: !this.state.selected
        });
        this.props.parentCallbackOnSelect(this.props.treeItem, isChecked);
    };
    /**
     * Handle the click event: collapse or expand
     */
    TreeItem.prototype._handleExpandCollapse = function () {
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.parentCallbackExpandCollapse(this.props.treeItem, !this.state.expanded);
    };
    /**
     * Lifecycle event hook when component retrieves new properties
     * @param nextProps
     * @param nextContext
     */
    TreeItem.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        // If selection is turned on, set the item as selected
        if (this.props.selectionMode != ITreeViewProps_1.TreeViewSelectionMode.None) {
            var active = nextProps.activeItems.filter(function (item) { return item.key === _this.props.treeItem.key; });
            this.setState({
                selected: active.length > 0,
                expanded: this.state.expanded
            });
        }
    };
    /**
     * Default or custom rendering of tree item
     */
    TreeItem.prototype.renderItem = function (item) {
        var _this = this;
        if (typeof this.props.onRenderItem === "function") {
            // Custom rendering of tree item
            return this.props.onRenderItem(item);
        }
        else {
            return (
            // Default rendering of tree item
            React.createElement("div", { className: TreeView_module_scss_1.default.labels, onClick: function (e) {
                    if (_this.props.selectionMode != ITreeViewProps_1.TreeViewSelectionMode.None && item.selectable != false) {
                        e.stopPropagation();
                        if (!item.disabled) {
                            _this._itemSelected(e, !_this.state.selected);
                        }
                    }
                } },
                this.props.showCheckboxes && item.selectable == false && !item.children &&
                    React.createElement("span", { className: TreeView_module_scss_1.default.blankspace }, "\u00A0"),
                // Rendering when item has iconProps
                item.iconProps &&
                    React.createElement("span", null,
                        React.createElement(Icon_1.Icon, { className: TreeView_module_scss_1.default.icon, iconName: item.iconProps.iconName, style: item.iconProps.style }),
                        "\u00A0"),
                item.label,
                // Render sublabel
                item.subLabel &&
                    React.createElement("div", { className: TreeView_module_scss_1.default.itemSubLabel }, item.subLabel)));
        }
    };
    /**
     * Default React render method
     */
    TreeItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, treeItem = _a.treeItem, leftOffset = _a.leftOffset, showCheckboxes = _a.showCheckboxes, selectionMode = _a.selectionMode, treeItemActionsDisplayMode = _a.treeItemActionsDisplayMode;
        var _b = this.state, expanded = _b.expanded, selected = _b.selected;
        var styleProps = {
            marginLeft: leftOffset + "px"
        };
        var contentStyles = {
            marginLeft: treeItem.children ? '0' : leftOffset + "px"
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: TreeView_module_scss_1.default.listItem + " " + TreeView_module_scss_1.default.tree },
                React.createElement("div", { className: "" + TreeView_module_scss_1.default.treeSelector }, 
                // Render expand / collapse icons for items which has children.
                treeItem.children &&
                    React.createElement(Button_1.IconButton, { iconProps: expanded ? { iconName: 'ChevronDown' } : { iconName: 'ChevronRight' }, alt: expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle, title: expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle, onClick: function () { return _this._handleExpandCollapse(); } })),
                React.createElement("div", { className: Utilities_1.css((_c = {},
                        _c[TreeView_module_scss_1.default.itemContent] = true,
                        _c[TreeView_module_scss_1.default.noCheckBox] = !showCheckboxes,
                        _c[TreeView_module_scss_1.default.checked] = selected,
                        _c[TreeView_module_scss_1.default.disabled] = !!treeItem.disabled,
                        _c)), style: contentStyles, onClick: function (e) {
                        if (_this.props.selectionMode != ITreeViewProps_1.TreeViewSelectionMode.None && treeItem.selectable != false) {
                            e.stopPropagation();
                            if (!treeItem.disabled && e.currentTarget === e.target) {
                                _this._itemSelected(e, !_this.state.selected);
                            }
                        }
                    } },
                    // Render checkbox (if item is selectable, Selection mode is not None, and showCheckboxes property is set to true)
                    (treeItem.selectable != false) && selectionMode != ITreeViewProps_1.TreeViewSelectionMode.None && showCheckboxes &&
                        React.createElement(Checkbox_1.Checkbox, { checked: selected, disabled: treeItem.disabled, className: TreeView_module_scss_1.default.checkbox, onChange: this._itemSelected }),
                    // Call default render item function
                    this.renderItem(treeItem),
                    // Render actions for tree item
                    treeItem.actions &&
                        React.createElement("div", { className: TreeView_module_scss_1.default.itemMenu },
                            React.createElement(TreeItemActionsControl_1.default, { treeItem: treeItem, treeItemActions: {
                                    actions: treeItem.actions,
                                    treeItemActionsDisplayMode: treeItemActionsDisplayMode
                                }, treeItemActionCallback: this.treeItemActionCallback })))),
            React.createElement("div", { style: styleProps || {} }, 
            // Render child nodes
            expanded && treeItem.children
                ? this.createChildNodes(treeItem.children, leftOffset) // we double left padding on every recursion/depth
                : null)));
        var _c;
    };
    return TreeItem;
}(React.Component));
exports.default = TreeItem;

//# sourceMappingURL=TreeItem.js.map
