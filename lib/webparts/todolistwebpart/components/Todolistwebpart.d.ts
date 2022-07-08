import * as React from "react";
import { ITodolistwebpartProps } from "./ITodolistwebpartProps";
export interface IMyTodoListWebPartState {
    isProcessing: boolean;
    showPanel: boolean;
    showPanelAdd: boolean;
    showModal: boolean;
    showSubTask: boolean;
    items: any[];
    deleted: any[];
    modified: any[];
    itemSub: any[];
    tempItem: any;
    subItem: any;
    activeItem: any;
    activeIndex: number;
    errorMsg: any;
    saveReady: boolean;
    subtasks: any[];
    editFlag: boolean;
    taskId: string;
}
export default class MyTodoListWebPart extends React.Component<ITodolistwebpartProps, IMyTodoListWebPartState> {
    constructor(props: any);
    private _checkIsFormReady;
    componentDidMount(): void;
    componentSubDidMount(): Promise<void>;
    render(): React.ReactElement<ITodolistwebpartProps>;
    private _handleRenderHeader;
    private _handleRenderFooter;
}
//# sourceMappingURL=Todolistwebpart.d.ts.map