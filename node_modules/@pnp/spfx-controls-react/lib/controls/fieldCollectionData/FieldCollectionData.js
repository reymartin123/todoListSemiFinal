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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var telemetry = require("../../common/telemetry");
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var Panel_1 = require("office-ui-fabric-react/lib/components/Panel");
var Label_1 = require("office-ui-fabric-react/lib/components/Label");
var collectionDataViewer_1 = require("./collectionDataViewer");
// import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
var strings = require("ControlStrings");
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
var FieldCollectionData = (function (_super) {
    __extends(FieldCollectionData, _super);
    function FieldCollectionData(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Open the panel
         */
        _this.openPanel = function () {
            _this.setState({
                panelOpen: true
            });
        };
        /**
         * Closes the panel
         */
        _this.closePanel = function () {
            _this.setState({
                panelOpen: false
            });
        };
        /**
         * On save action
         */
        _this.onSave = function (items) {
            _this.props.onChanged(items);
            _this.setState({
                panelOpen: false
            });
        };
        _this.state = {
            panelOpen: false
        };
        telemetry.track('FieldCollectionData', {});
        return _this;
    }
    FieldCollectionData.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Button_1.DefaultButton, { text: this.props.manageBtnLabel, onClick: this.openPanel, disabled: this.props.fields.length === 0 || this.props.disabled }),
            (!this.props.fields || this.props.fields.length === 0) &&
                React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, strings.CollectionDataItemMissingFields),
            React.createElement(Panel_1.Panel, { isOpen: this.state.panelOpen, onDismiss: this.closePanel, type: Panel_1.PanelType.large, headerText: this.props.panelHeader, onOuterClick: function () { }, className: "FieldCollectionData__panel " + (this.props.panelClassName || "") },
                this.props.panelDescription && (React.createElement("p", { className: "FieldCollectionData__panel__description" }, this.props.panelDescription)),
                React.createElement(collectionDataViewer_1.CollectionDataViewer, __assign({}, this.props, { fOnSave: this.onSave, fOnClose: this.closePanel })))));
    };
    return FieldCollectionData;
}(React.Component));
exports.FieldCollectionData = FieldCollectionData;

//# sourceMappingURL=FieldCollectionData.js.map
