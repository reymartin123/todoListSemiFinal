/// <reference types="react" />
import * as React from "react";
import { IComboBoxListItemPickerProps, IComboBoxListItemPickerState } from ".";
export declare class ComboBoxListItemPicker extends React.Component<IComboBoxListItemPickerProps, IComboBoxListItemPickerState> {
    private _listItemRepo;
    selectedItems: any[];
    constructor(props: IComboBoxListItemPickerProps);
    componentDidMount(): void;
    protected loadOptions(): Promise<void>;
    componentDidUpdate(prevProps: IComboBoxListItemPickerProps, prevState: IComboBoxListItemPickerState): void;
    /**
     * Render the field
     */
    render(): React.ReactElement<IComboBoxListItemPickerProps>;
    /**
     * On Selected Item
     */
    private onChanged;
}
