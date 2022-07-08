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
var DocumentTile_module_scss_1 = require("./DocumentTile.module.scss");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Image_1 = require("office-ui-fabric-react/lib/Image");
var strings = require("ControlStrings");
var Check_1 = require("office-ui-fabric-react/lib/Check");
var Styling_1 = require("office-ui-fabric-react/lib/Styling");
var MAX_ASPECT_RATIO = 3;
var DocumentTile = (function (_super) {
    __extends(DocumentTile, _super);
    function DocumentTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, isSelected = _a.isSelected, index = _a.index, item = _a.item, pageWidth = _a.pageWidth, tileDimensions = _a.tileDimensions;
        var isLarge = pageWidth >= Styling_1.ScreenWidthMinLarge;
        // Find the dimensions that are biggest
        var thumbnailWidth = tileDimensions.width;
        var thumbnailHeight = tileDimensions.height;
        if (item.dimensions) {
            var contentAspectRatio = item.dimensions.width / item.dimensions.height;
            var boundsAspectRatio = tileDimensions.width / tileDimensions.height;
            var scale = void 0;
            if (contentAspectRatio > boundsAspectRatio) {
                scale = tileDimensions.width / item.dimensions.width;
            }
            else {
                scale = tileDimensions.height / item.dimensions.height;
            }
            var finalScale = Math.min(MAX_ASPECT_RATIO, scale);
            thumbnailWidth = item.dimensions.width * finalScale;
            thumbnailHeight = item.dimensions.height * finalScale;
        }
        // Check extension and get preview
        var thumbnail = this.props.fileBroserService.getFileThumbnailUrl(this.props.item, thumbnailWidth, thumbnailHeight);
        var ariaLabel = strings.ImageAriaLabelTemplate.replace('{0}', item.fileIcon);
        var itemLabel = strings.DocumentLabelTemplate
            .replace('{0}', item.name)
            .replace('{1}', item.modified)
            .replace('{2}', item.modifiedBy);
        return (React.createElement("div", { "aria-selected": isSelected, "data-is-draggable": false, role: "listitem", "aria-labelledby": "Tile-label" + index, "aria-describedby": "Tile-activity" + index, className: Utilities_1.css(DocumentTile_module_scss_1.default.tile, isLarge ? DocumentTile_module_scss_1.default.isLarge : DocumentTile_module_scss_1.default.isSmall, DocumentTile_module_scss_1.default.invokable, DocumentTile_module_scss_1.default.selectable, isSelected ? DocumentTile_module_scss_1.default.selected : undefined), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-disable-click-on-enter": true, "data-selection-index": index, 
            //data-selection-invoke={true}
            onClick: function (_event) { return _this.props.onItemInvoked(item); } },
            React.createElement("div", { className: DocumentTile_module_scss_1.default.link, role: "link" },
                React.createElement("span", { id: "Tile-label" + index, className: DocumentTile_module_scss_1.default.label }, itemLabel),
                React.createElement("span", { role: "presentation", className: DocumentTile_module_scss_1.default.aboveNameplate },
                    React.createElement("span", { role: "presentation", className: DocumentTile_module_scss_1.default.content },
                        React.createElement("span", { role: "presentation", className: DocumentTile_module_scss_1.default.foreground },
                            React.createElement("span", { className: DocumentTile_module_scss_1.default.odItemTile2Image },
                                React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageFrame2, style: { width: thumbnailWidth, height: thumbnailHeight } },
                                    React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageFrame2Image },
                                        React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageFrame },
                                            React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageStack },
                                                React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageStackTile },
                                                    React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageTile },
                                                        React.createElement("span", { className: DocumentTile_module_scss_1.default.odImageTileBackground },
                                                            React.createElement(Image_1.Image, { src: thumbnail, width: thumbnailWidth, height: thumbnailHeight, imageFit: Image_1.ImageFit.contain })))))))))),
                        React.createElement("span", { className: DocumentTile_module_scss_1.default.odItemTile2SmallIcon },
                            React.createElement("div", { className: DocumentTile_module_scss_1.default.fileTypeIcon, "aria-label": ariaLabel, title: ariaLabel },
                                React.createElement("img", { className: DocumentTile_module_scss_1.default.fileTypeIconIcon, src: strings.ODPhotoIconUrl, style: { width: 16, height: 16 } }))))),
                React.createElement("span", { className: DocumentTile_module_scss_1.default.namePlate },
                    React.createElement("span", { className: DocumentTile_module_scss_1.default.name },
                        React.createElement("span", { className: Utilities_1.css(DocumentTile_module_scss_1.default.signalField, DocumentTile_module_scss_1.default.compact) },
                            React.createElement("span", { className: DocumentTile_module_scss_1.default.signalFieldValue }, item.name))),
                    React.createElement("span", { className: DocumentTile_module_scss_1.default.activity, id: "Tile-activity" + index },
                        React.createElement("span", { className: Utilities_1.css(DocumentTile_module_scss_1.default.signalField, DocumentTile_module_scss_1.default.compact) },
                            React.createElement("span", { className: DocumentTile_module_scss_1.default.signalFieldValue }, item.modified))))),
            React.createElement("span", { role: "checkbox", className: DocumentTile_module_scss_1.default.check, "data-selection-toggle": true, "aria-checked": isSelected },
                React.createElement(Check_1.Check, { checked: isSelected }))));
    };
    return DocumentTile;
}(React.Component));
exports.DocumentTile = DocumentTile;

//# sourceMappingURL=DocumentTile.js.map
