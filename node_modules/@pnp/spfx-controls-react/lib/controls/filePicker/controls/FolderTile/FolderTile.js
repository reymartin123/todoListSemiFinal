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
var FolderTile_module_scss_1 = require("./FolderTile.module.scss");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var strings = require("ControlStrings");
var Styling_1 = require("office-ui-fabric-react/lib/Styling");
var FolderTile = (function (_super) {
    __extends(FolderTile, _super);
    function FolderTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FolderTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, isSelected = _a.isSelected, index = _a.index, item = _a.item, pageWidth = _a.pageWidth;
        var isLarge = pageWidth >= Styling_1.ScreenWidthMinLarge;
        //{item.name}, Folder, Modified {item.modified}, edited by {item.modifiedBy}, {item.totalFileCount} items, Private
        var itemLabel = strings.FolderLabelTemplate
            .replace('{0}', item.name)
            .replace('{1}', item.modified)
            .replace('{2}', item.modifiedBy)
            .replace('{3}', "" + item.totalFileCount);
        return (React.createElement("div", { "aria-selected": isSelected, "data-is-draggable": false, role: "listitem", "aria-labelledby": "Tile-label" + index, "aria-describedby": "Tile-activity" + index, className: Utilities_1.css(FolderTile_module_scss_1.default.tile, isLarge ? FolderTile_module_scss_1.default.isLarge : FolderTile_module_scss_1.default.isSmall, FolderTile_module_scss_1.default.invokable, isSelected ? FolderTile_module_scss_1.default.selected : undefined), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-disable-click-on-enter": true, "data-selection-index": index, onClick: function (_event) { return _this.props.onItemInvoked(item); } },
            React.createElement("div", { className: FolderTile_module_scss_1.default.link, role: "link" },
                React.createElement("span", { id: "Tile-label" + index, className: FolderTile_module_scss_1.default.label }, itemLabel),
                React.createElement("span", { role: "presentation", className: FolderTile_module_scss_1.default.aboveNameplate },
                    React.createElement("span", { role: "presentation", className: FolderTile_module_scss_1.default.content },
                        React.createElement("span", { role: "presentation", className: FolderTile_module_scss_1.default.foreground },
                            React.createElement("span", { className: FolderTile_module_scss_1.default.odItemTile2FolderCover },
                                React.createElement("div", { className: Utilities_1.css(FolderTile_module_scss_1.default.folderCover, FolderTile_module_scss_1.default.isLarge) },
                                    React.createElement(Icon_1.Icon, { className: FolderTile_module_scss_1.default.folderCoverBack, iconType: Icon_1.IconType.image, imageProps: {
                                            src: strings.FolderBackPlate
                                        } }),
                                    item.totalFileCount > 0 &&
                                        React.createElement("span", { className: FolderTile_module_scss_1.default.folderCoverContent },
                                            React.createElement("span", { className: FolderTile_module_scss_1.default.folderCoverFrame },
                                                React.createElement("span", { className: FolderTile_module_scss_1.default.itemTileBlankCover, style: { width: 104, height: 72 } }))),
                                    React.createElement(Icon_1.Icon, { className: FolderTile_module_scss_1.default.folderCoverFront, iconType: Icon_1.IconType.image, imageProps: {
                                            src: strings.FolderFrontPlate
                                        } }),
                                    item.totalFileCount > 0 &&
                                        React.createElement("span", { className: FolderTile_module_scss_1.default.metadata }, item.totalFileCount)))))),
                React.createElement("span", { className: FolderTile_module_scss_1.default.namePlate },
                    React.createElement("span", { className: FolderTile_module_scss_1.default.name },
                        React.createElement("span", { className: Utilities_1.css(FolderTile_module_scss_1.default.signalField, FolderTile_module_scss_1.default.compact) },
                            React.createElement("span", { className: FolderTile_module_scss_1.default.signalFieldValue }, item.name))),
                    React.createElement("span", { className: FolderTile_module_scss_1.default.activity, id: "Tile-activity" + index },
                        React.createElement("span", { className: Utilities_1.css(FolderTile_module_scss_1.default.signalField, FolderTile_module_scss_1.default.compact) },
                            React.createElement("span", { className: FolderTile_module_scss_1.default.signalFieldValue }, item.modified)))))));
    };
    return FolderTile;
}(React.Component));
exports.FolderTile = FolderTile;

//# sourceMappingURL=FolderTile.js.map
