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
var utilities_1 = require("../../../common/utilities");
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var strings = require("ControlStrings");
var UploadFilePickerTab_module_scss_1 = require("./UploadFilePickerTab.module.scss");
var UploadFilePickerTab = (function (_super) {
    __extends(UploadFilePickerTab, _super);
    function UploadFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Gets called when a file is uploaded
         */
        _this._handleFileUpload = function (event) {
            if (!event.target.files || event.target.files.length < 1) {
                return;
            }
            // Get the files that were uploaded
            var files = event.target.files;
            // Grab the first file -- there should always only be one
            var file = files[0];
            var filePickerResult = {
                fileAbsoluteUrl: null,
                fileName: file.name,
                fileNameWithoutExtension: utilities_1.GeneralHelper.getFileNameWithoutExtension(file.name),
                downloadFileContent: function () { return Promise.resolve(file); }
            };
            if (utilities_1.GeneralHelper.isImage(file.name)) {
                // Convert to base64 image
                var reader_1 = new FileReader();
                reader_1.readAsDataURL(file);
                reader_1.onload = function () {
                    _this.setState({
                        filePreview: reader_1.result
                    });
                };
            }
            _this.setState({
                filePickerResult: filePickerResult,
                filePreview: undefined
            });
        };
        /**
         * Saves base64 encoded image back to property pane file picker
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResult);
        };
        /**
         * Closes tab without saving
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        _this.state = {
            filePickerResult: undefined
        };
        return _this;
    }
    UploadFilePickerTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, filePickerResult = _a.filePickerResult, filePreview = _a.filePreview;
        var fileName = filePickerResult ? filePickerResult.fileName : null;
        var acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;
        return (React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.tabContainer },
            React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.tabHeaderContainer },
                React.createElement("h2", { className: UploadFilePickerTab_module_scss_1.default.tabHeader }, strings.UploadFileHeader)),
            React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.tab },
                React.createElement("input", { className: UploadFilePickerTab_module_scss_1.default.localTabInput, type: "file", id: "fileInput", accept: acceptedFilesExtensions, multiple: false, onChange: function (event) { return _this._handleFileUpload(event); } }),
                fileName && filePreview &&
                    /** Display image preview */
                    React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.localTabSinglePreview },
                        React.createElement("img", { className: UploadFilePickerTab_module_scss_1.default.localTabSinglePreviewImage, src: filePreview, alt: filePickerResult.fileName }),
                        React.createElement("span", null, fileName)),
                React.createElement("div", null,
                    React.createElement("label", { className: UploadFilePickerTab_module_scss_1.default.localTabFilename }, (!filePreview && fileName ? fileName : ""))),
                React.createElement("label", { className: UploadFilePickerTab_module_scss_1.default.localTabLabel, htmlFor: "fileInput" }, (fileName ? strings.ChangeFileLinkLabel : strings.ChooseFileLinkLabel))),
            React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.actionButtonsContainer },
                React.createElement("div", { className: UploadFilePickerTab_module_scss_1.default.actionButtons },
                    React.createElement(Button_1.PrimaryButton, { disabled: !filePickerResult, onClick: function () { return _this._handleSave(); }, className: UploadFilePickerTab_module_scss_1.default.actionButton }, strings.AddFileButtonLabel),
                    React.createElement(Button_1.DefaultButton, { onClick: function () { return _this._handleClose(); }, className: UploadFilePickerTab_module_scss_1.default.actionButton }, strings.CancelButtonLabel)))));
    };
    return UploadFilePickerTab;
}(React.Component));
exports.default = UploadFilePickerTab;

//# sourceMappingURL=UploadFilePickerTab.js.map
