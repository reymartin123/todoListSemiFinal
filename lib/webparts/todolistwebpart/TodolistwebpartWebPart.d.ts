import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface ITodolistwebpartWebPartProps {
    description: string;
}
export default class TodolistwebpartWebPart extends BaseClientSideWebPart<ITodolistwebpartWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TodolistwebpartWebPart.d.ts.map