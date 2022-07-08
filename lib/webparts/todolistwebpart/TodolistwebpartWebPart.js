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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'TodolistwebpartWebPartStrings';
import Todolistwebpart from './components/Todolistwebpart';
import { sp } from "@pnp/sp";
var TodolistwebpartWebPart = /** @class */ (function (_super) {
    __extends(TodolistwebpartWebPart, _super);
    function TodolistwebpartWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodolistwebpartWebPart.prototype.onInit = function () {
        var _this = this;
        return new Promise(function (resolve, _reject) {
            sp.setup({
                spfxContext: _this.context,
            });
            resolve(undefined);
        });
    };
    TodolistwebpartWebPart.prototype.render = function () {
        var element = React.createElement(Todolistwebpart, {
            description: this.properties.description,
            context: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    TodolistwebpartWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(TodolistwebpartWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    TodolistwebpartWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TodolistwebpartWebPart;
}(BaseClientSideWebPart));
export default TodolistwebpartWebPart;
//# sourceMappingURL=TodolistwebpartWebPart.js.map