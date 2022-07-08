"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides options for carousel buttons location.
 */
var CarouselButtonsLocation;
(function (CarouselButtonsLocation) {
    CarouselButtonsLocation[CarouselButtonsLocation["top"] = 1] = "top";
    CarouselButtonsLocation[CarouselButtonsLocation["center"] = 2] = "center";
    CarouselButtonsLocation[CarouselButtonsLocation["bottom"] = 3] = "bottom";
})(CarouselButtonsLocation = exports.CarouselButtonsLocation || (exports.CarouselButtonsLocation = {}));
/**
 * Provides options for carousel buttons display mode.
 */
var CarouselButtonsDisplay;
(function (CarouselButtonsDisplay) {
    /**
     * Reserves space for buttons on both sides of the control.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["block"] = 1] = "block";
    /**
     * Only icon buttons are displayed.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["buttonsOnly"] = 2] = "buttonsOnly";
    /**
     * Buttons are not displayed. They appear onhover event.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["hidden"] = 3] = "hidden";
})(CarouselButtonsDisplay = exports.CarouselButtonsDisplay || (exports.CarouselButtonsDisplay = {}));
/**
 * Provides options for carousel indicators' shape
 */
var CarouselIndicatorShape;
(function (CarouselIndicatorShape) {
    /**
     * Indicators displayed as cirlces
     */
    CarouselIndicatorShape[CarouselIndicatorShape["circle"] = 0] = "circle";
    /**
     * Indicators displayed as squares
     */
    CarouselIndicatorShape[CarouselIndicatorShape["square"] = 1] = "square";
    /**
     * Indicators displayed as rectangles
     */
    CarouselIndicatorShape[CarouselIndicatorShape["rectangle"] = 2] = "rectangle";
})(CarouselIndicatorShape = exports.CarouselIndicatorShape || (exports.CarouselIndicatorShape = {}));

//# sourceMappingURL=ICarouselProps.js.map
