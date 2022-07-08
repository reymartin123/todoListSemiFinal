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
var Accordion_module_scss_1 = require("./Accordion.module.scss");
var css_1 = require("@uifabric/utilities/lib/css");
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var telemetry = require("../../common/telemetry");
/**
 * Icon styles. Feel free to change them
 */
var collapsedIcon = { iconName: 'ChevronRight', className: Accordion_module_scss_1.default.accordionChevron };
var expandedIcon = { iconName: 'ChevronDown', className: Accordion_module_scss_1.default.accordionChevron };
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion(props) {
        var _this = _super.call(this, props) || this;
        _this._drawerDiv = undefined;
        _this.state = {
            expanded: !props.defaultCollapsed
        };
        telemetry.track('ReactAccordion', {});
        return _this;
    }
    Accordion.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: css_1.css(Accordion_module_scss_1.default.accordion, this.props.className) },
            React.createElement(Button_1.DefaultButton, { toggled: true, checked: this.state.expanded, text: this.props.title, iconProps: this.state.expanded ? expandedIcon : collapsedIcon, onClick: function () {
                    _this.setState({
                        expanded: !_this.state.expanded
                    });
                }, "aria-expanded": this.state.expanded, "aria-controls": this._drawerDiv && this._drawerDiv.id }),
            this.state.expanded &&
                React.createElement("div", { className: Accordion_module_scss_1.default.drawer, ref: function (el) { _this._drawerDiv = el; } }, this.props.children)));
    };
    return Accordion;
}(React.Component));
exports.Accordion = Accordion;

//# sourceMappingURL=Accordion.js.map
