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
var Carousel_module_scss_1 = require("./Carousel.module.scss");
var Image_1 = require("office-ui-fabric-react/lib/Image");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var CarouselImage = (function (_super) {
    __extends(CarouselImage, _super);
    function CarouselImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselImage.prototype.render = function () {
        var _a = this.props, imageSrc = _a.imageSrc, _b = _a.imageFit, imageFit = _b === void 0 ? Image_1.ImageFit.none : _b, url = _a.url, title = _a.title, description = _a.description, _c = _a.target, target = _c === void 0 ? '_blank' : _c, showDetailsOnHover = _a.showDetailsOnHover, className = _a.className, style = _a.style, imgClassName = _a.imgClassName, imgStyle = _a.imgStyle, detailsClassName = _a.detailsClassName, detailsStyle = _a.detailsStyle, titleClassName = _a.titleClassName, titleStyle = _a.titleStyle, descriptionClassName = _a.descriptionClassName, descriptionStyle = _a.descriptionStyle;
        var details = null;
        var hasDetails = !!title || !!description;
        if (hasDetails) {
            var descriptionEl = void 0;
            if (description) {
                if (typeof (description) === 'string') {
                    descriptionEl = React.createElement("span", { className: descriptionClassName, style: descriptionStyle }, description);
                }
                else {
                    descriptionEl = description;
                }
            }
            var detailsContent = React.createElement("div", { className: Utilities_1.css(Carousel_module_scss_1.default.details, detailsClassName), style: detailsStyle },
                !!title && React.createElement("span", { className: Utilities_1.css(Carousel_module_scss_1.default.title, titleClassName), style: titleStyle }, title),
                descriptionEl);
            if (url) {
                details = React.createElement("a", { href: url, target: target }, detailsContent);
            }
            else {
                details = detailsContent;
            }
        }
        return (React.createElement("div", { className: Utilities_1.css(Carousel_module_scss_1.default.carouselImage, className, showDetailsOnHover ? Carousel_module_scss_1.default.dynamicDetails : Carousel_module_scss_1.default.staticDetails), style: style },
            React.createElement(Image_1.Image, { className: Utilities_1.css(Carousel_module_scss_1.default.image, imgClassName), style: imgStyle, imageFit: imageFit, src: imageSrc }),
            details));
    };
    return CarouselImage;
}(React.Component));
exports.default = CarouselImage;

//# sourceMappingURL=CarouselImage.js.map
