/// <reference types="react" />
import * as React from 'react';
import { ITreeViewProps } from './ITreeViewProps';
import { ITreeViewState } from './ITreeViewState';
/**
 * Renders the controls for TreeItem component
 */
export declare class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
    private nodesToExpand;
    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: ITreeViewProps);
    private pathTo;
    private getSelectedItems(treeItems, selectedKeys, selectedChildren);
    /**
     * Fires When expand / collapse item in TreeView
     * @argument item The expanded / collapsed item
     * @argument isExpanded The status of item  (expanded / collapsed)
     */
    private handleTreeExpandCollapse(item, isExpanded);
    /**
     * Selects all child nodes when parent node is selected.
     * @param item current tree item
     */
    private selectAllChildren(item, selectedItems);
    /**
     * Unselects all child nodes of selected parent.
     */
    private unSelectChildren(item, unselectArray);
    /**
     * Fires When Tree Item is selected in TreeView
     * @argument item The selected item
     * @argument isSelected The status of item selection
     */
    private handleOnSelect(item, isSelected);
    componentDidMount(): void;
    /**
     * Default React render method
     */
    render(): JSX.Element;
}
