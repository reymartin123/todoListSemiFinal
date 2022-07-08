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
var StockImages_module_scss_1 = require("./StockImages.module.scss");
var Utilities_1 = require("../../../Utilities");
var StockImages = (function (_super) {
    __extends(StockImages, _super);
    function StockImages() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleImageIframeEvent = function (event) {
            if (!event || !event.origin || event.origin.indexOf("https://hubblecontent.osi.office.net") !== 0) {
                return;
            }
            var eventData = JSON.parse(event.data);
            if (eventData.MessageId === "AddItem") {
                _this._handleSave(eventData);
            }
            else if (eventData.MessageId === "CancelDialog") {
                _this._handleClose();
            }
        };
        /**
         * Called when user saves
         */
        _this._handleSave = function (event) {
            var filePickerResult = null;
            var cdnFileInfo = event.Values && event.Values.length > 0 ? event.Values[0] : null;
            if (cdnFileInfo) {
                filePickerResult = {
                    downloadFileContent: function () { return _this.props.fileSearchService.downloadBingContent(cdnFileInfo.sourceUrl, Utilities_1.GeneralHelper.getFileNameFromUrl(Utilities_1.GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl))); },
                    fileAbsoluteUrl: cdnFileInfo.sourceUrl,
                    fileName: Utilities_1.GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl),
                    fileNameWithoutExtension: Utilities_1.GeneralHelper.getFileNameWithoutExtension(cdnFileInfo.sourceUrl)
                };
            }
            _this.props.onSave(filePickerResult);
        };
        /**
         * Called when user closes tab
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        return _this;
    }
    StockImages.prototype.componentDidMount = function () {
        window.addEventListener("message", this._handleImageIframeEvent);
    };
    StockImages.prototype.componentWillUnmount = function () {
        window.removeEventListener("message", this._handleImageIframeEvent);
    };
    StockImages.prototype.render = function () {
        var language = this.props.language;
        var themesColor = "&themecolors=" + encodeURIComponent(this.getCurrentThemeConfiguration());
        var contentPickerUrl = "https://hubblecontent.osi.office.net/contentsvc/external/m365contentpicker/index.html?p=3&app=1001&aud=prod&channel=devmain&setlang=" + language + "&msel=0&env=prod&premium=1" + themesColor;
        return (React.createElement("div", { className: StockImages_module_scss_1.default.tabContainer },
            React.createElement("div", { className: StockImages_module_scss_1.default.tab },
                React.createElement("div", { className: StockImages_module_scss_1.default.stockImagesPickerContainer },
                    React.createElement("iframe", { className: StockImages_module_scss_1.default.stockImagesPicker, role: "application", id: "stockImagesIFrame", src: contentPickerUrl })))));
    };
    StockImages.prototype.getCurrentThemeConfiguration = function () {
        if (!window["__themeState__"] || !window["__themeState__"].theme) {
            return "";
        }
        var primaryColor = window["__themeState__"].theme["themePrimary"];
        var textColor = window["__themeState__"].theme["primaryText"];
        var primaryBackground = window["__themeState__"].theme["bodyBackground"];
        var neutralLighter = window["__themeState__"].theme["neutralLighter"];
        var theme = "{\"primaryColor\":\"" + primaryColor + "\",\"textColor\":\"" + textColor + "\",\"backgroundColor\":\"" + primaryBackground + "\",\"neutralLighterColor\":\"" + neutralLighter + "\"}";
        return theme;
    };
    return StockImages;
}(React.Component));
exports.StockImages = StockImages;

//# sourceMappingURL=StockImages.js.map
