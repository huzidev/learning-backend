import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowNotes from '../notes/ShowNotes';
// const NoteState = lazy(() =>
//     new Promise((resolve) => setTimeout(resolve, 1000)).then(() => import('../notes/NoteState'))
// );
import NoteState from '../notes/NoteState';


export default function FilterList(props: any): JSX.Element {
    const Location = useLocation();
    let allNotes = props.notes;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [state, setState] = useState<boolean | null>(null);
    const [items, setItems] = useState(allNotes);
    // const [message, setMessageState] = useState<string | null>('');
    
    const addNotesPath: boolean = Location.pathname.includes('/addnote');
    const completedNotesPath: boolean = Location.pathname.includes('/completed');
    const locationName: string = addNotesPath ? "/allnotes" : "/completednotes"
    
    useEffect(() => {
        // so state will changed to default form and allNotes will be fetched
        setState(null);
    }, [locationName])

    // MUI
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // when user clicked on filter list then state will change to true & all the notes with that specific catgeory will fetch only therefore state must be true but initially it is false 
    let Data = state ? items : allNotes

    const allItems = [...new Set(allNotes.map((currentEle: any) => (
        currentEle.category
    )))]

    function filterItems(items: string) {
        const updatedFilterItems = allNotes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedFilterItems);
        setState(true);
    }

    const Text = addNotesPath ? "Yours Notes" : "Completed Notes";
    let Type = addNotesPath ? "Added" : "Completed";
    // let testMess: any;
    
    // useEffect(() => {
    //     testMess = null;
    //     testMess = addNotesPath ? "No Task Added" : "No Task Completed";
    //     console.log("what is message type?", testMess);
    //     setMessageState(null);
    //     setTimeout(() => {
    //         setMessageState(testMess);
    //     }, 5000)
    // }, [Location.pathname])

    // status will either be completely true or completely false
    let status: boolean | undefined;
    allNotes.forEach((Element: any, i: number) => {
        for (let key in Element) {
            status = Element.isCompleted
        }
    });

    const error = status === undefined;
    const style = {
        display: "flex",
        justifyContent: "space-between",
    }

    return (
        <div>
            {
                <>
                    {
                        (completedNotesPath && (status !== true || error)) || (addNotesPath && (status !== false || error)) ? (
                            // <Typography.Title level={4}>
                            //     {/* { message === null ? <Spin size='large' /> : message } */}

                            // </Typography.Title>
                            // <Suspense fallback={<div><Spin size='large' /></div>}>
                            //     {type !== '' && <NoteState type={type} />}
                            // </Suspense>
                            <NoteState type={Type} />
                        ) : (
                            <div style={style}>
                                <Typography.Title level={4}>
                                    {Text}
                                </Typography.Title>
                                <div style={style}>
                                    <Button
                                        type="ghost"
                                        className='Dark'
                                        onClick={handleClick}
                                    >
                                        Filter the list
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={() => setItems(allNotes)}>All items</MenuItem>
                                        {allItems.map((currentEle: any, index: number) => {
                                            return (
                                                <span key={index}>
                                                    <MenuItem onClick={() => filterItems(currentEle)}>
                                                        {currentEle}
                                                    </MenuItem>
                                                </span>
                                            )
                                        })}
                                    </Menu>
                                </div>
                            </div>
                        )
                    }
                </>
            }
            <Row gutter={16}>
                {/* Data.map so if user clicked on FilterItems then only notes with specific category will be render NOT allNotes */}
                {Data.map((note: any) => {
                    return (
                        !note.isCompleted && addNotesPath || note.isCompleted && completedNotesPath ? (
                            <Col span={12} style={{ margin: '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted} />
                            </Col>
                        ) : null
                    )
                })}
            </Row>
        </div>
    )
}