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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var icons_1 = require("@uifabric/icons");
icons_1.initializeIcons();
var React = require("react");
var Carousel_module_scss_1 = require("./Carousel.module.scss");
var _1 = require(".");
var lib_1 = require("@uifabric/utilities/lib");
var ICarouselState_1 = require("./ICarouselState");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var common_1 = require("@pnp/common");
var telemetry = require("../../common/telemetry");
var CarouselImage_1 = require("./CarouselImage");
var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel(props) {
        var _this = _super.call(this, props) || this;
        _this.renderSlide = function (element) {
            var isAnimated = _this.props.slide !== false && !_this.props.triggerPageEvent;
            var _a = _this.state, currentIndex = _a.currentIndex, previousIndex = _a.previousIndex, slideRight = _a.slideRight;
            if (!isAnimated || previousIndex === undefined) {
                return [React.createElement("div", { className: Carousel_module_scss_1.default.slideWrapper }, element)];
            }
            var previousElement = _this.getElementToDisplay(previousIndex);
            var result = [];
            result.push(React.createElement("div", { key: currentIndex, className: lib_1.css(Carousel_module_scss_1.default.slideWrapper, (_b = {},
                    _b[Carousel_module_scss_1.default.slideFromLeft] = slideRight,
                    _b[Carousel_module_scss_1.default.slideFromRight] = !slideRight,
                    _b)) }, element));
            if (slideRight) {
                result.push(React.createElement("div", { key: previousIndex, className: lib_1.css(Carousel_module_scss_1.default.slideWrapper, Carousel_module_scss_1.default.slideRight, Carousel_module_scss_1.default.right) }, previousElement));
            }
            else {
                result.unshift(React.createElement("div", { key: previousIndex, className: lib_1.css(Carousel_module_scss_1.default.slideWrapper, Carousel_module_scss_1.default.slideLeft, Carousel_module_scss_1.default.left) }, previousElement));
            }
            return result;
            var _b;
        };
        _this.getIndicatorsElement = function () {
            var _a = _this.props, indicators = _a.indicators, _b = _a.indicatorShape, indicatorShape = _b === void 0 ? _1.CarouselIndicatorShape.rectangle : _b, onRenderIndicator = _a.onRenderIndicator, triggerPageEvent = _a.triggerPageEvent, indicatorClassName = _a.indicatorClassName, indicatorStyle = _a.indicatorStyle;
            var _c = _this.state.currentIndex, currentIndex = _c === void 0 ? 0 : _c;
            if (indicators === false) {
                return null;
            }
            var elementsCount = triggerPageEvent ? _this.props.elementsCount : common_1.isArray(_this.props.element) ? _this.props.element.length : 1;
            var indicatorElements = [];
            var _loop_1 = function (i) {
                if (onRenderIndicator) {
                    indicatorElements.push(onRenderIndicator(i, _this.onIndicatorClick));
                }
                else {
                    indicatorElements.push(React.createElement("li", { className: lib_1.css(indicatorClassName, (_a = {},
                            _a[Carousel_module_scss_1.default.active] = i === currentIndex,
                            _a)), style: indicatorStyle, onClick: function (e) { return _this.onIndicatorClick(e, i); } }));
                }
                var _a;
            };
            for (var i = 0; i < elementsCount; i++) {
                _loop_1(i);
            }
            if (onRenderIndicator) {
                return React.createElement("div", { className: Carousel_module_scss_1.default.indicators }, indicatorElements);
            }
            else {
                return React.createElement("ol", { className: lib_1.css((_d = {},
                        _d[Carousel_module_scss_1.default.indicators] = true,
                        _d[Carousel_module_scss_1.default.circle] = indicatorShape === _1.CarouselIndicatorShape.circle,
                        _d[Carousel_module_scss_1.default.rectangle] = indicatorShape === _1.CarouselIndicatorShape.rectangle,
                        _d[Carousel_module_scss_1.default.square] = indicatorShape === _1.CarouselIndicatorShape.square,
                        _d)) }, indicatorElements);
            }
            var _d;
        };
        _this.onIndicatorClick = function (e, index) {
            _this.startCycle();
            if (_this.props.onSelect) {
                _this.props.onSelect(index);
            }
            var currentIndex = _this.state.currentIndex;
            _this.setState({
                currentIndex: index,
                previousIndex: currentIndex,
                slideRight: index < currentIndex
            });
        };
        /**
         * Merges the styles of the components.
         */
        _this.getMergedStyles = function (componentStyles, userStyles) {
            var mergedStyles = userStyles ? lib_1.css(componentStyles, userStyles) : lib_1.css(componentStyles);
            return mergedStyles;
        };
        /**
         * Determines if the carousel button can be clicked.
         */
        _this.isCarouselButtonDisabled = function (nextButton) {
            // false by default
            var isInfinite = _this.props.isInfinite != undefined ? _this.props.isInfinite : false;
            var currentIndex = _this.state.currentIndex;
            var result = false;
            // Use validation from parent control or calcualte it based on the current index
            if (nextButton) {
                result = _this.props.canMoveNext != undefined ?
                    !_this.props.canMoveNext :
                    (currentIndex === _this.props.element.length - 1) && !isInfinite;
            }
            else {
                result = _this.props.canMovePrev != undefined ?
                    !_this.props.canMovePrev :
                    (0 === currentIndex) && !isInfinite;
            }
            return result;
        };
        /**
         * Handles carousel button click.
         */
        _this.onCarouselButtonClicked = function (nextButtonClicked) {
            _this.startCycle();
            var currentIndex = _this.state.currentIndex;
            var nextIndex = _this.state.currentIndex;
            var processingState = ICarouselState_1.ProcessingState.processing;
            // Trigger parent control to update provided element
            if (_this.props.triggerPageEvent) {
                var canMove = nextButtonClicked ? _this.props.canMoveNext !== false : _this.props.canMovePrev !== false;
                if (canMove) {
                    // Index validation needs to be done by the parent control specyfing canMove Next|Prev
                    nextIndex = nextButtonClicked ? (currentIndex + 1) : (currentIndex - 1);
                    // Trigger parent to provide new data
                    _this.props.triggerPageEvent(nextIndex);
                    processingState = ICarouselState_1.ProcessingState.processing;
                }
            }
            else {
                nextIndex = _this.getNextIndex(nextButtonClicked);
                if (nextIndex !== currentIndex) {
                    if (nextButtonClicked && _this.props.onMoveNextClicked) {
                        _this.props.onMoveNextClicked(nextIndex);
                    }
                    else if (_this.props.onMovePrevClicked) {
                        _this.props.onMovePrevClicked(nextIndex);
                    }
                }
                processingState = ICarouselState_1.ProcessingState.idle;
            }
            if (nextIndex !== currentIndex) {
                if (_this.props.onSelect) {
                    _this.props.onSelect(nextIndex);
                }
                _this.setState({
                    currentIndex: nextIndex,
                    previousIndex: currentIndex,
                    slideRight: !nextButtonClicked,
                    processingState: processingState
                });
            }
        };
        /**
         * Returns next index after carousel button is clicked.
         */
        _this.getNextIndex = function (nextButtonClicked) {
            var currentIndex = _this.state.currentIndex;
            var nextIndex = currentIndex;
            var isInfinite = _this.props.isInfinite !== undefined ? _this.props.isInfinite : false;
            var length = _this.props.element.length;
            // Next Button clicked
            if (nextButtonClicked) {
                // If there is next element
                if (currentIndex < length - 1) {
                    nextIndex = currentIndex + 1;
                }
                else if (isInfinite) {
                    nextIndex = 0;
                }
            }
            else {
                if (currentIndex - 1 >= 0) {
                    // If there is previous element
                    nextIndex = currentIndex - 1;
                }
                else if (isInfinite) {
                    // If there is no previous element but isInfitineLoop -> reset index to the last element
                    nextIndex = length - 1;
                }
            }
            return nextIndex;
        };
        /**
         * Returns current element to be displayed.
         */
        _this.getElementToDisplay = function (currentIndex) {
            var element = _this.props.element;
            var result = null;
            var arrayLen;
            // If no element has been provided.
            if (!element) {
                result = null;
            }
            else if (common_1.isArray(element) && (arrayLen = element.length) > 0) {
                // Retrieve proper element from the array
                if (currentIndex >= 0 && arrayLen > currentIndex) {
                    var arrayEl = element[currentIndex];
                    result = 'props' in arrayEl ? arrayEl :
                        React.createElement(CarouselImage_1.default, __assign({}, arrayEl));
                }
            }
            else {
                result = element;
            }
            return result;
        };
        _this.startCycle = function () {
            var _a = _this.props, interval = _a.interval, triggerPageEvent = _a.triggerPageEvent;
            if (_this._intervalId) {
                if (triggerPageEvent) {
                    clearTimeout(_this._intervalId);
                }
                else {
                    clearInterval(_this._intervalId);
                }
            }
            if (interval !== null) {
                var intervalValue = interval || 5000;
                if (!triggerPageEvent) {
                    _this._intervalId = window.setInterval(_this.moveNext, intervalValue);
                }
                else {
                    _this._intervalId = window.setTimeout(_this.moveNext, intervalValue);
                }
            }
        };
        _this.moveNext = function () {
            if (!_this.isCarouselButtonDisabled(true)) {
                _this.onCarouselButtonClicked(true);
            }
            else {
                if (_this._intervalId) {
                    if (_this.props.triggerPageEvent) {
                        clearTimeout(_this._intervalId);
                    }
                    else {
                        clearInterval(_this._intervalId);
                    }
                }
            }
        };
        _this.pauseCycle = function () {
            if (_this._intervalId) {
                if (_this.props.triggerPageEvent) {
                    clearTimeout(_this._intervalId);
                }
                else {
                    clearInterval(_this._intervalId);
                }
            }
        };
        var currentIndex = props.startIndex ? props.startIndex : 0;
        telemetry.track('ReactCarousel', {});
        _this.state = {
            currentIndex: currentIndex,
            processingState: ICarouselState_1.ProcessingState.idle
        };
        return _this;
    }
    /**
     * Handles component update lifecycle method.
     * @param prevProps
     */
    Carousel.prototype.componentDidUpdate = function (prevProps) {
        var currProps = this.props;
        var prevPropsElementKey = prevProps.triggerPageEvent && prevProps.element ? prevProps.element.key : null;
        var nextPropsElementKey = currProps.triggerPageEvent && currProps.element ? currProps.element.key : null;
        // Checking if component is in processing state and the key of the current element has been changed
        if (this.state.processingState === ICarouselState_1.ProcessingState.processing && nextPropsElementKey != null && prevPropsElementKey != nextPropsElementKey) {
            this.setState({
                processingState: ICarouselState_1.ProcessingState.idle
            });
            this.startCycle(); // restarting cycle when new slide is available
        }
    };
    Carousel.prototype.componentDidMount = function () {
        // starting auto cycling
        this.startCycle();
    };
    Carousel.prototype.render = function () {
        var _this = this;
        var _a = this.state, currentIndex = _a.currentIndex, processingState = _a.processingState;
        var _b = this.props, containerStyles = _b.containerStyles, contentContainerStyles = _b.contentContainerStyles, containerButtonsStyles = _b.containerButtonsStyles, prevButtonStyles = _b.prevButtonStyles, nextButtonStyles = _b.nextButtonStyles, loadingComponentContainerStyles = _b.loadingComponentContainerStyles, _c = _b.prevButtonIconName, prevButtonIconName = _c === void 0 ? 'ChevronLeft' : _c, _d = _b.nextButtonIconName, nextButtonIconName = _d === void 0 ? 'ChevronRight' : _d, _e = _b.loadingComponent, loadingComponent = _e === void 0 ? React.createElement(Spinner_1.Spinner, null) : _e, pauseOnHover = _b.pauseOnHover, interval = _b.interval;
        var processing = processingState === ICarouselState_1.ProcessingState.processing;
        var prevButtonDisabled = processing || this.isCarouselButtonDisabled(false);
        var nextButtonDisabled = processing || this.isCarouselButtonDisabled(true);
        var element = this.getElementToDisplay(currentIndex);
        return (React.createElement("div", { className: this.getMergedStyles(Carousel_module_scss_1.default.container, containerStyles) },
            React.createElement("div", { className: this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles), onClick: function () { if (!prevButtonDisabled) {
                    _this.onCarouselButtonClicked(false);
                } } },
                React.createElement(Button_1.IconButton, { className: this.getMergedStyles(this.getButtonStyles(false), prevButtonStyles), iconProps: { iconName: prevButtonIconName }, disabled: prevButtonDisabled, onClick: function () { _this.onCarouselButtonClicked(false); } })),
            React.createElement("div", { className: this.getMergedStyles(Carousel_module_scss_1.default.contentContainer, contentContainerStyles), onMouseOver: pauseOnHover && interval !== null ? this.pauseCycle : undefined, onTouchStart: pauseOnHover && interval !== null ? this.pauseCycle : undefined, onMouseLeave: pauseOnHover && interval !== null ? this.startCycle : undefined, onTouchEnd: pauseOnHover && interval !== null ? this.startCycle : undefined },
                processing &&
                    React.createElement("div", { className: this.getMergedStyles(Carousel_module_scss_1.default.loadingComponent, loadingComponentContainerStyles) }, loadingComponent),
                !processing && this.renderSlide(element),
                this.getIndicatorsElement()),
            React.createElement("div", { className: this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles), onClick: function () { if (!nextButtonDisabled) {
                    _this.onCarouselButtonClicked(true);
                } } },
                React.createElement(Button_1.IconButton, { className: this.getMergedStyles(this.getButtonStyles(true), nextButtonStyles), iconProps: { iconName: nextButtonIconName }, disabled: nextButtonDisabled, onClick: function () { _this.onCarouselButtonClicked(true); } }))));
    };
    /**
     * Return merged styles for Button containers.
     */
    Carousel.prototype.getButtonContainerStyles = function () {
        var buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : _1.CarouselButtonsDisplay.block;
        var buttonDisplayModeCss = "";
        switch (buttonsDisplayMode) {
            case _1.CarouselButtonsDisplay.block:
                buttonDisplayModeCss = Carousel_module_scss_1.default.blockButtonsContainer;
                break;
            case _1.CarouselButtonsDisplay.buttonsOnly:
                buttonDisplayModeCss = Carousel_module_scss_1.default.buttonsOnlyContainer;
                break;
            case _1.CarouselButtonsDisplay.hidden:
                buttonDisplayModeCss = Carousel_module_scss_1.default.hiddenButtonsContainer;
                break;
            default:
                return "";
        }
        var buttonsLocation = this.props.buttonsLocation ? this.props.buttonsLocation : _1.CarouselButtonsLocation.top;
        var buttonsLocationCss = "";
        switch (buttonsLocation) {
            case _1.CarouselButtonsLocation.top:
                buttonsLocationCss = Carousel_module_scss_1.default.blockButtonsContainer;
                break;
            case _1.CarouselButtonsLocation.center:
                buttonsLocationCss = Carousel_module_scss_1.default.centralButtonsContainer;
                break;
            case _1.CarouselButtonsLocation.bottom:
                buttonsLocationCss = Carousel_module_scss_1.default.bottomButtonsContainer;
                break;
            default:
                return "";
        }
        var result = lib_1.css(buttonDisplayModeCss, buttonsLocationCss);
        return result;
    };
    /**
     * Return merged styles for Buttons.
     * @param nextButton
     */
    Carousel.prototype.getButtonStyles = function (nextButton) {
        var buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : _1.CarouselButtonsDisplay.block;
        var result = "";
        if (buttonsDisplayMode === _1.CarouselButtonsDisplay.buttonsOnly) {
            result = nextButton ? Carousel_module_scss_1.default.buttonsOnlyNextButton : Carousel_module_scss_1.default.buttonsOnlyPrevButton;
        }
        return lib_1.css(result);
    };
    return Carousel;
}(React.Component));
exports.Carousel = Carousel;

//# sourceMappingURL=Carousel.js.map
