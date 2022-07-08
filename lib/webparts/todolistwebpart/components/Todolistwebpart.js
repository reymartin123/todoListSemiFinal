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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import styles from "./Todolistwebpart.module.scss";
import { PrimaryButton, List, DefaultButton, Dialog, DialogType, getTheme, Panel, TextField, Dropdown, DatePicker, PanelType, Spinner, SpinnerSize, Pivot, PivotItem, PivotLinkFormat, Checkbox } from "office-ui-fabric-react";
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';
import { isArray } from "@pnp/common";
import ErrorHandlingField from './common/ErrorHandlingField';
var REQUIRED = [
    "Title",
    "Status",
    "DueDate",
];
var MyTodoListWebPart = /** @class */ (function (_super) {
    __extends(MyTodoListWebPart, _super);
    function MyTodoListWebPart(props) {
        var _this = _super.call(this, props) || this;
        _this._checkIsFormReady = function () {
            var _a = _this.state, errorMsg = _a.errorMsg, tempItem = _a.tempItem;
            REQUIRED.forEach(function (field) {
                if (!tempItem[field] || (typeof tempItem[field] === 'string' && tempItem[field].trim() === '') ||
                    (isArray(tempItem[field]) && tempItem[field].length == 0)) {
                    errorMsg[field] = errorMsg[field] || 'This field must not be empty';
                }
                else {
                    errorMsg[field] = null;
                }
            });
            var flag = true;
            for (var _i = 0, _b = Object.keys(errorMsg); _i < _b.length; _i++) {
                var k = _b[_i];
                if (errorMsg[k]) {
                    flag = false;
                    break;
                }
            }
            //check if all items have attachments
            //flag = !this._checkAttackments();
            _this.setState({ errorMsg: errorMsg, saveReady: flag });
        };
        _this._handleRenderHeader = function () {
            return (React.createElement("div", { className: styles.siteTheme + " ms-Grid-row " + styles.panelHeaderV2, style: { display: 'flex' } },
                React.createElement("div", { className: "ms-Grid-col ms-sm12 " + styles.awkwardSmtoMdHeader },
                    React.createElement("div", null, "NEW TODO FORM")),
                _this.state.tempItem.Status && (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-xl6 " + styles.awkwardSmtoMdStatus },
                    React.createElement("div", null, "Status: " + _this.state.tempItem.Status)))));
        };
        _this._handleRenderFooter = function () {
            var _a = _this.state, tempItem = _a.tempItem, items = _a.items, saveReady = _a.saveReady, isProcessing = _a.isProcessing, editFlag = _a.editFlag;
            return (React.createElement("div", { className: "ms-Grid-row", style: { padding: "8px 0 80% 8px" } },
                React.createElement("div", { className: "ms-Grid-row", style: { display: "flex" } },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3, style: { margin: "0 15px 5px", width: "33.33%" } },
                        React.createElement(PrimaryButton, { style: { width: '100%' }, onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.setState({ isProcessing: true });
                                            if (!editFlag) return [3 /*break*/, 2];
                                            return [4 /*yield*/, sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.getById(tempItem.ID).update(tempItem).then(function (rest) {
                                                    //query updates
                                                    var temp = items.map(function (i, n) {
                                                        if (i.ID == tempItem.ID) {
                                                            return tempItem;
                                                        }
                                                        else {
                                                            return i;
                                                        }
                                                    });
                                                    _this.setState({
                                                        items: temp, showPanel: false, editFlag: false, isProcessing: false,
                                                        tempItem: {
                                                            Title: '',
                                                            Description: '',
                                                            Status: 'Not Started',
                                                            DueDate: new Date(),
                                                        }
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.add(tempItem)
                                                .then(function (res) {
                                                // query updates
                                                items.push(tempItem);
                                                //refresh dom
                                                _this.setState({
                                                    items: items, showPanel: false, editFlag: false, isProcessing: false,
                                                    tempItem: {
                                                        Title: '',
                                                        Description: '',
                                                        Status: 'Not Started',
                                                        DueDate: new Date(),
                                                    }
                                                });
                                            })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, disabled: !saveReady || isProcessing },
                            "Save",
                            isProcessing && (React.createElement(Spinner, { size: SpinnerSize.small, style: { marginLeft: "5px" } })))),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3, style: { width: "33.33%" } },
                        React.createElement(DefaultButton, { style: { width: '100%' }, text: "Cancel", onClick: function () {
                                _this.setState({
                                    showPanel: false, showPanelAdd: false, editFlag: false,
                                    tempItem: {
                                        Title: '',
                                        Description: '',
                                        Status: 'Not Started',
                                        DueDate: new Date(),
                                    }
                                });
                            }, disabled: isProcessing })))));
        };
        _this.state = {
            isProcessing: false,
            showPanel: false,
            showPanelAdd: false,
            showModal: false,
            showSubTask: false,
            items: [],
            deleted: [],
            modified: [],
            itemSub: [],
            tempItem: {
                Title: '',
                Description: '',
                Status: 'Not Started',
                DueDate: new Date(),
            },
            subItem: {
                Title: '',
                subTestID: null,
                TodoID: null,
            },
            activeItem: null,
            activeIndex: -1,
            errorMsg: {},
            saveReady: false,
            subtasks: [],
            editFlag: false,
            taskId: null
        };
        return _this;
    }
    MyTodoListWebPart.prototype.componentDidMount = function () {
        var _this = this;
        //query sp list item
        sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.get()
            .then(function (res) {
            var items = [];
            res.forEach(function (item) {
                var temp = {
                    ID: item.ID,
                    Title: item.Title,
                    Description: item.Description,
                    Status: item.Status || 'Not Started',
                    DueDate: item.DueDate || new Date(),
                };
                items.push(temp);
            });
            _this.setState({ items: items });
        });
    };
    MyTodoListWebPart.prototype.componentSubDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //query sp list item
                    return [4 /*yield*/, sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.get()
                            .then(function (res) {
                            var itemSub = [];
                            res.forEach(function (item) {
                                var temp = {
                                    ID: item.ID,
                                    Title: item.Title,
                                };
                                itemSub.push(temp);
                            });
                            _this.setState({ itemSub: itemSub });
                        })];
                    case 1:
                        //query sp list item
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTodoListWebPart.prototype.render = function () {
        var _this = this;
        var _a = this.state, subtasks = _a.subtasks, items = _a.items, showModal = _a.showModal, activeItem = _a.activeItem, showPanel = _a.showPanel, deleted = _a.deleted, modified = _a.modified, showPanelAdd = _a.showPanelAdd, showSubTask = _a.showSubTask, subItem = _a.subItem, itemSub = _a.itemSub, tempItem = _a.tempItem, isProcessing = _a.isProcessing, saveReady = _a.saveReady, errorMsg = _a.errorMsg;
        var spTheme = getTheme();
        var dialogContentProps = {
            type: DialogType.normal,
            title: 'Task Details',
            getStyles: function () {
                return {
                    header: {
                        height: '50px',
                    },
                    title: {
                        color: 'white'
                    },
                    topButton: {
                        padding: '10px'
                    },
                    button: {
                        color: 'white !important'
                    },
                    inner: {
                        overflowWrap: 'bread-word'
                    },
                    subText: {
                        fontsize: '14px',
                        fontWeight: 'bold'
                    }
                };
            }
        };
        return (React.createElement("div", { className: "ms-Grid" },
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12 " + styles.centerMass },
                    React.createElement("span", null, " TODO LIST"),
                    React.createElement("br", null),
                    React.createElement("br", null)),
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(PrimaryButton, { text: "Add item", onClick: function () {
                            _this.setState({ showPanelAdd: true });
                        } }),
                    React.createElement("br", null),
                    React.createElement("br", null)),
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(List, { items: cloneDeep(items), onRenderCell: function (item, index, isScrolling) {
                            return (React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { marginBottom: '10px', border: '1px ridge black' } },
                                React.createElement("div", { className: "ms-Grid-col ms-sm8" },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                        "ID: ",
                                        item.ID),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                        "Name: ",
                                        item.Title),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                        "Status: ",
                                        item.Status),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                        "Due Date: ",
                                        item.DueDate.toLocaleString())),
                                React.createElement("div", { className: "ms-Grid-col ms-sm4" },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { margin: '5px auto' } },
                                        React.createElement("div", { className: "ms-Grid-col ms-2" },
                                            React.createElement(DefaultButton, { style: { background: '#00b7c3', width: '100%', padding: '15px 10px' }, iconProps: { iconName: 'RedEye' }, onClick: function () {
                                                    sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.filter("subTestID eq '" + item.ID + "'").get()
                                                        .then(function (resultSet) {
                                                        var itemSub = [];
                                                        resultSet.forEach(function (item) {
                                                            var temp = {
                                                                ID: item.ID,
                                                                Title: item.Title,
                                                            };
                                                            itemSub.push(temp);
                                                        });
                                                        _this.setState({ itemSub: itemSub });
                                                    });
                                                    item.DueDate = new Date(item.DueDate);
                                                    _this.setState({
                                                        taskId: item.ID,
                                                        tempItem: item,
                                                        showPanel: true,
                                                        editFlag: true
                                                        // activeItem: item,
                                                        // activeIndex: index,
                                                    });
                                                } }))),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { margin: '5px auto' } },
                                        React.createElement("div", { className: "ms-Grid-col ms-2" },
                                            React.createElement(DefaultButton, { style: { background: '#d83b01', width: '100%', padding: '15px 10x' }, iconProps: { iconName: 'Delete' }, onClick: function () {
                                                    _this.setState({ isProcessing: true });
                                                    //update sp list
                                                    sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.getById(item.ID)
                                                        .recycle().then(function (_) {
                                                        //update state
                                                        var res = items.filter(function (it, num) {
                                                            if (index != num) {
                                                                return it;
                                                            }
                                                        });
                                                        //refresh dom
                                                        _this.setState({ items: cloneDeep(res), isProcessing: false });
                                                    });
                                                }, disabled: isProcessing }))))));
                        } }),
                    React.createElement("br", null),
                    React.createElement("br", null))),
            React.createElement(Panel, { isOpen: showPanel, onDismiss: function () { return _this.setState({ showPanel: false }); }, onOuterClick: function () { }, type: PanelType.medium },
                this._handleRenderHeader(),
                React.createElement(Pivot, { linkFormat: PivotLinkFormat.links },
                    React.createElement(PivotItem, { headerText: "Task Details" },
                        React.createElement("div", { className: "ms-Grid-col sm-12", style: { margin: '10px 0' } },
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Title", errorMessage: errorMsg.Title, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(TextField, { value: tempItem.Title, onChanged: function (newVal) {
                                        tempItem.Title = newVal;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } })),
                            React.createElement(ErrorHandlingField, { isRequired: false, label: "Description", errorMessage: errorMsg.Description, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(TextField, { value: tempItem.Description, onChanged: function (newVal) {
                                        tempItem.Description = newVal;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    }, multiline: true, rows: 6 })),
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Status", errorMessage: errorMsg.Status, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(Dropdown, { options: [
                                        { key: 'Not Started', text: 'Not Started' },
                                        { key: 'In-Progress', text: 'In-Progress' },
                                        { key: 'On-Hold', text: 'On-Hold' },
                                        { key: 'Completed', text: 'Completed' },
                                    ], selectedKey: tempItem.Status, onChanged: function (option, index) {
                                        tempItem.Status = option.key;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } })),
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Due Date", errorMessage: errorMsg.DueDate, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(DatePicker, { value: tempItem.DueDate, onSelectDate: function (date) {
                                        tempItem.DueDate = date;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } })))),
                    React.createElement(PivotItem, { headerText: "Subtasks" },
                        React.createElement("div", { className: "ms-Grid-col sm-12", style: { margin: '10px 0' } },
                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                React.createElement(PrimaryButton, { text: "Add Sub-Task", onClick: function () {
                                        _this.setState({ showModal: true });
                                    } }),
                                React.createElement("br", null),
                                React.createElement("br", null)),
                            React.createElement(List, { items: cloneDeep(itemSub), onRenderCell: function (item, index, isScrolling) {
                                    return (React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { marginBottom: "10px", border: "1px ridge black" } },
                                        React.createElement("div", { className: "ms-Grid-col ms-sm8" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12", style: item.Status ? { textDecoration: 'line-through' } : {} },
                                                "Sub Task: ",
                                                item.Title)),
                                        React.createElement("div", { className: "ms-Grid-col ms-sm4" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { margin: '5px auto' } },
                                                React.createElement("div", { className: "ms-Grid-col ms-2" },
                                                    React.createElement(Checkbox, { style: { background: '#00b7c3', width: '100%', padding: '15px 10px' }, onChange: function (ev, checked) {
                                                            var temp = _this.state.itemSub;
                                                            temp[index].Status = checked;
                                                            if (_this.state.activeItem)
                                                                _this.setState({ tempItem: tempItem }, function () {
                                                                    _this._checkIsFormReady();
                                                                });
                                                        }, value: item.Status }))))));
                                } })))),
                this._handleRenderFooter()),
            React.createElement(Panel, { isOpen: showPanelAdd, onDismiss: function () { return _this.setState({ showPanelAdd: false }); }, onOuterClick: function () { }, type: PanelType.medium },
                this._handleRenderHeader(),
                React.createElement(Pivot, { linkFormat: PivotLinkFormat.links },
                    React.createElement(PivotItem, { headerText: "Task Details" },
                        React.createElement("div", { className: "ms-Grid-col sm-12", style: { margin: '10px 0' } },
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Title", errorMessage: errorMsg.Title, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(TextField, { value: tempItem.Title, onChanged: function (newVal) {
                                        tempItem.Title = newVal;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } })),
                            React.createElement(ErrorHandlingField, { isRequired: false, label: "Description", errorMessage: errorMsg.Description, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(TextField, { value: tempItem.Description, onChanged: function (newVal) {
                                        tempItem.Description = newVal;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    }, multiline: true, rows: 6 })),
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Status", errorMessage: errorMsg.Status, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(Dropdown, { options: [
                                        { key: 'Not Started', text: 'Not Started' },
                                        { key: 'In-Progress', text: 'In-Progress' },
                                        { key: 'On-Hold', text: 'On-Hold' },
                                        { key: 'Completed', text: 'Completed' },
                                    ], selectedKey: tempItem.Status, onChanged: function (option, index) {
                                        tempItem.Status = option.key;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } })),
                            React.createElement(ErrorHandlingField, { isRequired: true, label: "Due Date", errorMessage: errorMsg.DueDate, parentClass: "ms-Grid-col ms-sm12" },
                                React.createElement(DatePicker, { value: tempItem.DueDate, onSelectDate: function (date) {
                                        tempItem.DueDate = date;
                                        _this.setState({ tempItem: tempItem }, function () {
                                            _this._checkIsFormReady();
                                        });
                                    } }))))),
                this._handleRenderFooter()),
            React.createElement(Dialog, { hidden: !showModal, modalProps: { isBlocking: false }, onDismiss: function () { return _this.setState({ showModal: false, activeItem: null }); }, dialogContentProps: {
                    type: DialogType.normal,
                    title: 'Add Sub Task',
                } },
                React.createElement(TextField, { value: subItem.Title, onChanged: function (newVal) {
                        subItem.Title = newVal;
                        _this.setState({ subItem: subItem }, function () {
                        });
                    } }),
                React.createElement(PivotItem, { headerText: "Subtasks" },
                    React.createElement("div", { className: "ms-Grid-col sm-12", style: { margin: '10px 0' } },
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement(PrimaryButton, { text: "Add", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                subItem.subTestID = this.state.taskId.toString();
                                                console.log("sub", subItem);
                                                return [4 /*yield*/, sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.add(subItem)
                                                        .then(function (res) {
                                                        // query updates
                                                        itemSub.push(subItem);
                                                        //refresh dom
                                                        _this.setState({
                                                            itemSub: itemSub, showPanel: true, editFlag: false, isProcessing: false,
                                                            subItem: {
                                                                Title: '',
                                                            }
                                                        });
                                                    })];
                                            case 1:
                                                _a.sent();
                                                subtasks.push(tempItem);
                                                this.setState({ subtasks: subtasks, showModal: false, }, function () {
                                                    console.log("state", _this.state);
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); } }),
                            React.createElement("br", null),
                            React.createElement("br", null)))))));
    };
    return MyTodoListWebPart;
}(React.Component));
export default MyTodoListWebPart;
{ /* <List
                                    items={cloneDeep(subtasks)}
                                    onRenderCell={(item?: any, index?: number, isScrolling?: boolean) => {

                                        return (
                                            <div className="ms-Grid-col ms-sm12" style={{ marginBottom: '10px', border: '1px ridge black' }}>
                                                <div className="ms-Grid-col ms-sm8">
                                                    <div className="ms-Grid-col ms-sm12">
                                                        Subtask: {item.SubT}
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    }}


                                /> */
}
//# sourceMappingURL=Todolistwebpart.js.map