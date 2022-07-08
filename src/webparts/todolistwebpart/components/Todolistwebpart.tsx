import * as React from "react";
import styles from "./Todolistwebpart.module.scss";
import { ITodolistwebpartProps } from "./ITodolistwebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Image, PrimaryButton, List, DefaultButton, Dialog, DialogType, getTheme, Panel, TextField, Dropdown, IDropdownOption, DatePicker, PanelType, Spinner, SpinnerSize, Pivot, PivotItem, PivotLinkFormat, Checkbox } from "office-ui-fabric-react";
import { cloneDeep } from '@microsoft/sp-lodash-subset';

import { sp } from '@pnp/sp';
import { isArray } from "@pnp/common";
import ErrorHandlingField from './common/ErrorHandlingField';

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

const REQUIRED = [
    "Title",
    "Status",
    "DueDate",
];



export default class MyTodoListWebPart extends React.Component<
    ITodolistwebpartProps,
    IMyTodoListWebPartState> {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    private _checkIsFormReady = () => {
        let { errorMsg, tempItem } = this.state;


        REQUIRED.forEach(field => {

            if (!tempItem[field] || (typeof tempItem[field] === 'string' && tempItem[field].trim() === '') ||
                (isArray(tempItem[field]) && tempItem[field].length == 0)) {
                errorMsg[field] = errorMsg[field] || 'This field must not be empty';
            } else {
                errorMsg[field] = null;
            }
        });

        let flag = true;
        for (let k of Object.keys(errorMsg)) {
            if (errorMsg[k]) {
                flag = false;
                break;
            }
        }

        //check if all items have attachments
        //flag = !this._checkAttackments();

        this.setState({ errorMsg, saveReady: flag });

    }

    public componentDidMount(): void {
        //query sp list item
        sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.get()
            .then(res => {
                const items = [];

                res.forEach(item => {
                    const temp = {
                        ID: item.ID,
                        Title: item.Title,
                        Description: item.Description,
                        Status: item.Status || 'Not Started',
                        DueDate: item.DueDate || new Date(),
                    };

                    items.push(temp);

                });

                this.setState({ items });

            });
    }

    public async componentSubDidMount(): Promise<void> {
        //query sp list item
        await sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.get()
            .then(res => {
                const itemSub = [];

                res.forEach(item => {
                    const temp = {
                        ID: item.ID,
                        Title: item.Title,
                    };

                    itemSub.push(temp);
                });

                this.setState({ itemSub });
            });

    }

    public render(): React.ReactElement<ITodolistwebpartProps> {
        const { subtasks, items, showModal, activeItem, showPanel, deleted, modified, showPanelAdd, showSubTask, subItem, itemSub, tempItem, isProcessing, saveReady, errorMsg } = this.state;
        const spTheme = getTheme();
        const dialogContentProps =
        {
            type: DialogType.normal,
            title: 'Task Details',
            getStyles: () => {
                return {
                    header: {
                        height: '50px',
                        // background: spTheme ? spTheme['themePrimary'] : $ms-color-themePrimary
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

        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">

                    <div className={"ms-Grid-col ms-sm12 " + styles.centerMass}>
                        <span> TODO LIST</span>
                        <br /><br />
                    </div>

                    <div className="ms-Grid-col ms-sm12">
                        <PrimaryButton
                            text="Add item"
                            onClick={() => {
                                this.setState({ showPanelAdd: true });
                            }}
                        />
                        <br /><br />
                    </div>
                    <div className="ms-Grid-col ms-sm12">



                        <List
                            items={cloneDeep(items)}
                            onRenderCell={(item?: any, index?: number, isScrolling?: boolean) => {

                                return (
                                    <div className="ms-Grid-col ms-sm12" style={{ marginBottom: '10px', border: '1px ridge black' }}>
                                        <div className="ms-Grid-col ms-sm8">
                                            <div className="ms-Grid-col ms-sm12">
                                                ID: {item.ID}
                                            </div>
                                            <div className="ms-Grid-col ms-sm12">
                                                Name: {item.Title}
                                            </div>
                                            <div className="ms-Grid-col ms-sm12">
                                                Status: {item.Status}
                                            </div>
                                            <div className="ms-Grid-col ms-sm12">
                                                Due Date: {item.DueDate.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="ms-Grid-col ms-sm4">
                                            <div className="ms-Grid-col ms-sm12" style={{ margin: '5px auto' }}>
                                                <div className="ms-Grid-col ms-2">
                                                    <DefaultButton
                                                        style={{ background: '#00b7c3', width: '100%', padding: '15px 10px' }}
                                                        iconProps={{ iconName: 'RedEye' }}
                                                        onClick={() => {
                                                            sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.filter("subTestID eq '" + item.ID + "'").get()

                                                                .then(resultSet => {
                                                                    const itemSub = [];
                                                                    resultSet.forEach(item => {
                                                                        const temp = {
                                                                            ID: item.ID,
                                                                            Title: item.Title,
                                                                        };
                                                                        itemSub.push(temp);
                                                                    });
                                                                    this.setState({ itemSub });
                                                                });

                                                            item.DueDate = new Date(item.DueDate);

                                                            this.setState({
                                                                taskId: item.ID,
                                                                tempItem: item,
                                                                showPanel: true,
                                                                editFlag: true
                                                                // activeItem: item,
                                                                // activeIndex: index,

                                                            });

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ms-Grid-col ms-sm12" style={{ margin: '5px auto' }}>
                                                <div className="ms-Grid-col ms-2">
                                                    <DefaultButton
                                                        style={{ background: '#d83b01', width: '100%', padding: '15px 10x' }}
                                                        iconProps={{ iconName: 'Delete' }}
                                                        onClick={() => {
                                                            this.setState({ isProcessing: true });
                                                            //update sp list
                                                            sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.getById(item.ID)
                                                                .recycle().then(_ => {
                                                                    //update state
                                                                    const res = items.filter((it, num) => {
                                                                        if (index != num) {
                                                                            return it;
                                                                        }
                                                                    });
                                                                    //refresh dom
                                                                    this.setState({ items: cloneDeep(res), isProcessing: false });
                                                                });
                                                        }}
                                                        disabled={isProcessing}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <br /><br />
                    </div>
                </div>
                <Panel
                    isOpen={showPanel}
                    onDismiss={() => this.setState({ showPanel: false })}
                    onOuterClick={() => { }}
                    type={PanelType.medium}
                >
                    {this._handleRenderHeader()}

                    <Pivot linkFormat={PivotLinkFormat.links}>

                        <PivotItem headerText="Task Details">
                            <div className="ms-Grid-col sm-12" style={{ margin: '10px 0' }}>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Title"
                                    errorMessage={errorMsg.Title}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <TextField
                                        value={tempItem.Title}
                                        onChanged={(newVal: string) => {
                                            tempItem.Title = newVal;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={false}
                                    label="Description"
                                    errorMessage={errorMsg.Description}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <TextField

                                        value={tempItem.Description}
                                        onChanged={(newVal: string) => {
                                            tempItem.Description = newVal;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                        multiline
                                        rows={6}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Status"
                                    errorMessage={errorMsg.Status}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <Dropdown
                                        options={[
                                            { key: 'Not Started', text: 'Not Started' },
                                            { key: 'In-Progress', text: 'In-Progress' },
                                            { key: 'On-Hold', text: 'On-Hold' },
                                            { key: 'Completed', text: 'Completed' },
                                        ]}
                                        selectedKey={tempItem.Status}
                                        onChanged={(option: IDropdownOption, index?: number) => {
                                            tempItem.Status = option.key;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Due Date"
                                    errorMessage={errorMsg.DueDate}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <DatePicker
                                        value={tempItem.DueDate}
                                        onSelectDate={(date: Date) => {
                                            tempItem.DueDate = date;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                            </div>
                        </PivotItem>

                        <PivotItem headerText="Subtasks">
                            <div className="ms-Grid-col sm-12" style={{ margin: '10px 0' }} >

                                <div className="ms-Grid-col ms-sm12">
                                    <PrimaryButton
                                        text="Add Sub-Task"
                                        onClick={() => {
                                            this.setState({ showModal: true });
                                        }}
                                    />
                                    <br /><br />
                                </div>

                                <List
                                    items={cloneDeep(itemSub)}
                                    onRenderCell={(item?: any, index?: number, isScrolling?: boolean) => {
                                        return (
                                            <div
                                                className="ms-Grid-col ms-sm12"
                                                style={{ marginBottom: "10px", border: "1px ridge black" }}
                                            >
                                                <div className="ms-Grid-col ms-sm8">
                                                    <div className="ms-Grid-col ms-sm12" style={item.Status ? { textDecoration: 'line-through' } : {}}>
                                                        Sub Task: {item.Title}
                                                    </div>
                                                </div>

                                                <div className="ms-Grid-col ms-sm4">
                                                    <div className="ms-Grid-col ms-sm12" style={{ margin: '5px auto' }}>
                                                        <div className="ms-Grid-col ms-2">
                                                            <Checkbox
                                                                style={{ background: '#00b7c3', width: '100%', padding: '15px 10px' }}
                                                                onChange={(ev, checked: boolean) => {
                                                                    const temp = this.state.itemSub;
                                                                    temp[index].Status = checked;

                                                                    if (
                                                                        this.state.activeItem
                                                                    )

                                                                        this.setState({ tempItem }, () => {

                                                                            this._checkIsFormReady();
                                                                        });
                                                                }}
                                                                value={item.Status}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    }}
                                />

                            </div>
                        </PivotItem>
                    </Pivot>

                    {this._handleRenderFooter()}
                </Panel>

                <Panel
                    isOpen={showPanelAdd}
                    onDismiss={() => this.setState({ showPanelAdd: false })}
                    onOuterClick={() => { }}
                    type={PanelType.medium}
                >
                    {this._handleRenderHeader()}

                    <Pivot linkFormat={PivotLinkFormat.links}>

                        <PivotItem headerText="Task Details">
                            <div className="ms-Grid-col sm-12" style={{ margin: '10px 0' }}>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Title"
                                    errorMessage={errorMsg.Title}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <TextField
                                        value={tempItem.Title}
                                        onChanged={(newVal: string) => {
                                            tempItem.Title = newVal;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={false}
                                    label="Description"
                                    errorMessage={errorMsg.Description}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <TextField

                                        value={tempItem.Description}
                                        onChanged={(newVal: string) => {
                                            tempItem.Description = newVal;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                        multiline
                                        rows={6}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Status"
                                    errorMessage={errorMsg.Status}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <Dropdown
                                        options={[
                                            { key: 'Not Started', text: 'Not Started' },
                                            { key: 'In-Progress', text: 'In-Progress' },
                                            { key: 'On-Hold', text: 'On-Hold' },
                                            { key: 'Completed', text: 'Completed' },
                                        ]}
                                        selectedKey={tempItem.Status}
                                        onChanged={(option: IDropdownOption, index?: number) => {
                                            tempItem.Status = option.key;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                                <ErrorHandlingField
                                    isRequired={true}
                                    label="Due Date"
                                    errorMessage={errorMsg.DueDate}
                                    parentClass={"ms-Grid-col ms-sm12"}
                                >
                                    <DatePicker
                                        value={tempItem.DueDate}
                                        onSelectDate={(date: Date) => {
                                            tempItem.DueDate = date;

                                            this.setState({ tempItem }, () => {

                                                this._checkIsFormReady();
                                            });
                                        }}
                                    />
                                </ErrorHandlingField>

                            </div>
                        </PivotItem>


                    </Pivot>

                    {this._handleRenderFooter()}

                </Panel>

                <Dialog
                    hidden={!showModal}
                    modalProps={{ isBlocking: false }}
                    onDismiss={() => this.setState({ showModal: false, activeItem: null })}
                    dialogContentProps={{

                        type: DialogType.normal,
                        title: 'Add Sub Task',
                    }}
                >

                    <TextField
                        value={subItem.Title}
                        onChanged={(newVal: string) => {
                            subItem.Title = newVal;

                            this.setState({ subItem }, () => {

                            });
                        }}
                    />

                    <PivotItem headerText="Subtasks">
                        <div className="ms-Grid-col sm-12" style={{ margin: '10px 0' }} >

                            <div className="ms-Grid-col ms-sm12">
                                <PrimaryButton
                                    text="Add"
                                    onClick={async () => {
                                        subItem.subTestID = this.state.taskId.toString();

                                        console.log("sub", subItem);
                                        await sp.web.lists.getById('b17045bc-a8aa-44e9-b664-31213dda172e').items.add(subItem)
                                            .then(res => {
                                                // query updates
                                                itemSub.push(subItem);

                                                //refresh dom
                                                this.setState({
                                                    itemSub, showPanel: true, editFlag: false, isProcessing: false,
                                                    subItem: {
                                                        Title: '',
                                                    }
                                                });
                                            });
                                        subtasks.push(tempItem);

                                        this.setState({ subtasks, showModal: false,/* tempItem: {}*/ }, () => {
                                            console.log("state", this.state);
                                        });
                                    }}
                                />
                                <br /><br />
                            </div>
                        </div>
                    </PivotItem>
                </Dialog>

            </div>
        );
    }

    private _handleRenderHeader = () => {

        return (
            <div className={styles.siteTheme + " ms-Grid-row " + styles.panelHeaderV2} style={{ display: 'flex' }}>
                <div className={"ms-Grid-col ms-sm12 " + styles.awkwardSmtoMdHeader}>
                    <div>NEW TODO FORM</div>
                </div>
                {this.state.tempItem.Status && (
                    <div className={"ms-Grid-col ms-sm12 ms-xl6 " + styles.awkwardSmtoMdStatus}>
                        <div>{`Status: ${this.state.tempItem.Status}`}</div>
                    </div>
                )}
            </div>
        );
    }

    private _handleRenderFooter = () => {
        const { tempItem, items, saveReady, isProcessing, editFlag } = this.state;

        return (
            <div className="ms-Grid-row" style={{ padding: "8px 0 80% 8px" }} >

                <div className="ms-Grid-row" style={{ display: "flex" }}>
                    <div className={"ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3} style={{ margin: "0 15px 5px", width: "33.33%" }}>
                        <PrimaryButton
                            style={{ width: '100%' }}
                            onClick={async () => {
                                this.setState({ isProcessing: true });

                                if (editFlag) {
                                    await sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.getById(tempItem.ID).update(tempItem).then(rest => {
                                        //query updates
                                        const temp = items.map((i, n) => {
                                            if (i.ID == tempItem.ID) {
                                                return tempItem;
                                            } else {
                                                return i;
                                            }
                                        });

                                        this.setState({
                                            items: temp, showPanel: false, editFlag: false, isProcessing: false,
                                            tempItem: {
                                                Title: '',
                                                Description: '',
                                                Status: 'Not Started',
                                                DueDate: new Date(),
                                            }
                                        });
                                    });

                                } else {
                                    await sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.add(tempItem)
                                        .then(res => {
                                            // query updates
                                            items.push(tempItem);

                                            //refresh dom
                                            this.setState({
                                                items, showPanel: false, editFlag: false, isProcessing: false,
                                                tempItem: {
                                                    Title: '',
                                                    Description: '',
                                                    Status: 'Not Started',
                                                    DueDate: new Date(),
                                                }
                                            });
                                        });
                                }

                            }}
                            disabled={!saveReady || isProcessing}
                        >
                            Save
                            {isProcessing && (
                                <Spinner
                                    size={SpinnerSize.small}
                                    style={{ marginLeft: "5px" }}
                                />
                            )}
                        </PrimaryButton>

                    </div>

                    <div className={"ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3} style={{ width: "33.33%" }}>
                        <DefaultButton
                            style={{ width: '100%' }}
                            text="Cancel"
                            onClick={() => {
                                this.setState({
                                    showPanel: false, showPanelAdd: false, editFlag: false,
                                    tempItem: {
                                        Title: '',
                                        Description: '',
                                        Status: 'Not Started',
                                        DueDate: new Date(),
                                    }
                                });
                            }}
                            disabled={isProcessing}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // private _handleRenderFooterAdd = () => {
    //     const { tempItem, items, saveReady, isProcessing, editFlag } = this.state;

    //     return (
    //         <div className="ms-Grid-row" style={{ padding: "8px 0 80% 8px" }} >

    //             <div className="ms-Grid-row" style={{ display: "flex" }}>
    //                 <div className={"ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3} style={{ margin: "0 15px 5px", width: "33.33%" }}>
    //                     <PrimaryButton
    //                         style={{ width: '100%' }}
    //                         onClick={async () => {
    //                             this.setState({ isProcessing: true });

    //                             if (editFlag) {
    //                                 await sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.getById(tempItem.ID).update(tempItem).then(rest => {
    //                                     //query updates
    //                                     const temp = items.map((i, n) => {
    //                                         if (i.ID == tempItem.ID) {
    //                                             return tempItem;
    //                                         } else {
    //                                             return i;
    //                                         }
    //                                     });

    //                                     this.setState({
    //                                         items: temp, showPanelAdd: false, editFlag: false, isProcessing: false,
    //                                         tempItem: {
    //                                             Title: '',
    //                                             Description: '',
    //                                             Status: 'Not Started',
    //                                             DueDate: new Date(),
    //                                         }
    //                                     });
    //                                 });

    //                             } else {
    //                                 await sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.add(tempItem)
    //                                     .then(res => {
    //                                         // query updates
    //                                         items.push(tempItem);

    //                                         //refresh dom
    //                                         this.setState({
    //                                             items, showPanelAdd: false, editFlag: false, isProcessing: false,
    //                                             tempItem: {
    //                                                 Title: '',
    //                                                 Description: '',
    //                                                 Status: 'Not Started',
    //                                                 DueDate: new Date(),
    //                                                 SubT: ''
    //                                             }
    //                                         });
    //                                     });
    //                             }

    //                         }}
    //                         disabled={!saveReady || isProcessing}
    //                     >
    //                         Save
    //                         {isProcessing && (
    //                             <Spinner
    //                                 size={SpinnerSize.small}
    //                                 style={{ marginLeft: "5px" }}
    //                             />
    //                         )}
    //                     </PrimaryButton>

    //                 </div>

    //                 <div className={"ms-Grid-col ms-sm12 ms-xl3 " + styles.awkwardMdtoLg3} style={{ width: "33.33%" }}>
    //                     <DefaultButton
    //                         style={{ width: '100%' }}
    //                         text="Cancel"
    //                         onClick={() => {
    //                             this.setState({
    //                                 showPanelAdd: false, editFlag: false,
    //                                 tempItem: {
    //                                     Title: '',
    //                                     Description: '',
    //                                     Status: 'Not Started',
    //                                     DueDate: new Date(),
    //                                     SubT: ''
    //                                 }
    //                             });
    //                         }}
    //                         disabled={isProcessing}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

}

{/* <List
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


                                /> */}