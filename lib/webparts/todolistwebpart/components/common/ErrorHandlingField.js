import * as React from "react";
import { Label } from "office-ui-fabric-react";
var validateVWTrigger = function (condition) {
    if (condition === void 0) { condition = {}; }
    var a = window.innerWidth;
    var gt = condition.gt, ge = condition.ge, eq = condition.eq, lt = condition.lt, le = condition.le;
    var check = 0;
    var pass = 0;
    if (gt) {
        check++;
        a > gt ? pass++ : pass--;
    }
    if (ge) {
        check++;
        a >= ge ? pass++ : pass--;
    }
    if (eq) {
        check++;
        a == eq ? pass++ : pass--;
    }
    if (lt) {
        check++;
        a > lt ? pass++ : pass--;
    }
    if (le) {
        check++;
        a > le ? pass++ : pass--;
    }
    // console.log('check', check);
    // console.log('pass', pass);
    return check === pass ? true : false;
};
var ErrorHandlingField = function (props) {
    var ov = validateVWTrigger(props.overrideTrigger);
    return (React.createElement("div", { className: props.parentClass, style: ov ? props.styleOverride : {} },
        React.createElement(Label, { required: props.isRequired, className: props.labelClass }, props.label),
        React.createElement("div", { style: props.errorMessage && { border: "1px solid #a80000" } }, props.children),
        props.errorMessage && (React.createElement("div", { style: { color: "#a80000", fontSize: "12px", fontWeight: 400 } }, props.errorMessage))));
};
export default ErrorHandlingField;
//# sourceMappingURL=ErrorHandlingField.js.map