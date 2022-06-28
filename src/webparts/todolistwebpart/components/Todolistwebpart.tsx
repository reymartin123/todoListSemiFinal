import * as React from "react";
import styles from "./Todolistwebpart.module.scss";
import { ITodolistwebpartProps } from "./ITodolistwebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Image, PrimaryButton, List, DefaultButton, Dialog, DialogType, getTheme, Panel, TextField, Dropdown, IDropdownOption, DatePicker, PanelType } from "office-ui-fabric-react";
import { cloneDeep } from '@microsoft/sp-lodash-subset';

import { sp } from '@pnp/sp';

export interface IMyTodoListWebPartState {
    isProcessing: boolean;
    showPanel: boolean;
    showModal: boolean;
    items: any[];
    tempItem: any;
    activeItem: any;
    activeIndex: number;
}

export default class MyTodoListWebPart extends React.Component<
    ITodolistwebpartProps,
    IMyTodoListWebPartState> {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
            showPanel: false,
            showModal: false,
            items: [],
            tempItem: {
                Title: '',
                Description: '',
                Status: 'Not Started',
                DueDate: new Date()
            },
            activeItem: null,
            activeIndex: -1
        };
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
                    DueDate: item.DueDate || new Date()
                };

                items.push(temp);
            });

            this.setState({items});
        });
       
    }

    public render(): React.ReactElement<ITodolistwebpartProps> {
        const { items, showModal, activeItem, showPanel, tempItem, isProcessing } = this.state;
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
                                // const item = {
                                //     Title: 'Hi wars',
                                //     Description: 'Testing',
                                //     Status: 'Not Started',
                                //     DueDate: new Date().toLocaleString()
                                // };

                                // items.push(item);
                                // this.setState({ items };

                                this.setState({ showPanel: true });
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
                                                            this.setState({
                                                                showModal: true,
                                                                activeItem: item,
                                                                activeIndex: index
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
                                                            this.setState({isProcessing: true});
                                                            //update sp list
                                                            sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b32').items.getById(item.ID)
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
                    type={PanelType.smallFixedFar}
                >
                    <div className="ms-Grid-col sm-12">


                        <div className="ms-Grid col ms-sm-12">
                            <TextField
                                label={"Title"}
                                value={tempItem.Title}
                                onChanged={(newVal: string) => {
                                    tempItem.Title = newVal;

                                    this.setState({ tempItem });
                                }}
                            />
                        </div>

                        <div className="ms-Grid-col sm-12">
                            <TextField
                                label="Description"
                                value={tempItem.Description}
                                onChanged={(newVal: string) => {
                                    tempItem.Description = newVal;

                                    this.setState({ tempItem });
                                }}
                                multiline
                                rows={6}
                            />
                        </div>
                        <Dropdown
                            label="Status"
                            options={[
                                { key: 'Not Started', text: 'Not Started' },
                                { key: 'In-Progress', text: 'In-Progress' },
                                { key: 'On-Hold', text: 'On-Hold' },
                                { key: 'Completed', text: 'Completed' },
                            ]}
                            selectedKey={tempItem.Status}
                            onChanged={(option: IDropdownOption, index?: number) => {
                                tempItem.Status = option.key;

                                this.setState({ tempItem });
                            }}
                        />
                        <div className="ms-Grid-col ms-sm-6">
                            <DatePicker
                                label="Last Restock"
                                value={tempItem.DueDate}
                                onSelectDate={(date: Date) => {
                                    tempItem.DueDate = date;

                                    this.setState({tempItem});
                                }}
                            /> 
                        </div>

                        <div className="ms-Grid-col ms-sm-12">
                            <br /><br />
                            <div className="ms-Grid-col ms-sm3">

                                <PrimaryButton
                                    style={{ width: '100%', padding: '15px 10px' }}
                                    text="Save"
                                    onClick={async() => {
                                        this.setState({isProcessing: true});  

                                   await sp.web.lists.getById('2f5d5592-1a7e-4d57-b21b-f26a8ad1b329').items.add(tempItem)
                                        .then(res => {
                                            items.push(tempItem);

                                        this.setState({items, showPanel: false, isProcessing: false,
                                            tempItem: {
                                                Title: '',
                                                Description: '',
                                                Status: 'Not Started',
                                                DueDate: new Date()
                                            }
                                      });
                                     });
                                    }}
                                    disabled={isProcessing}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm3">
                                <DefaultButton
                                    style={{ width: '100%', padding: '15px 10px' }}
                                    text="Cancel"
                                    onClick={() => {

                                        this.setState({ showPanel: false, tempItem: {
                                        tempItem: {
                                            Title: '',
                                            Description: '',
                                            Status: 'Not Started',
                                            DueDate: new Date()
                                        }
                                        }});
                                    }}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>

                    </div>
                </Panel>

                <Dialog
                    hidden={!showModal}
                    modalProps={{ isBlocking: false }}
                    onDismiss={() => this.setState({ showModal: false, activeItem: null })}
                    dialogContentProps={{

                        type: DialogType.normal,
                        title: 'Task Details',
                    }}
                >

                    <div className="ms-Grid-col ms-sm12">
                        <span style={{ textAlign: "center" }}>
                            {activeItem && (
                                <div>
                                    <b> Description:</b> {activeItem.Description}
                                </div>
                            )}
                        </span>
                    </div>

                </Dialog>
            </div>
        );
    }
}