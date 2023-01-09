import React, { useState, useEffect } from 'react';
import ShowNotes from '../notes/ShowNotes';
import { Col, Row, Button, Typography, Skeleton } from 'antd';
import { useLocation } from 'react-router-dom';

export default function FilterList(props: any): JSX.Element {
    const Location = useLocation();
    let allNotes = props.notes;

    const [state, setState] = useState<boolean | null>(null)
    const [items, setItems] = useState(allNotes)

    const addNotesPath: boolean = Location.pathname.includes('/addnote');
    const completedNotesPath: boolean = Location.pathname.includes('/completed');

    const locationName: string = addNotesPath ? "/allnotes" : "/completednotes"

    useEffect(() => {
        // so state will changed to default form and allNotes will be fetched
        setState(null)
    }, [locationName])

    // when user clicked on filter list then state will change to true & all the notes with that specific catgeory will fetch only therefore state must be true but initially it is false 
    let Data = state ? items : allNotes

    const allItems = [...new Set(allNotes.map((currentEle: any) => (
        // !currentEle.isCompleted && addNotesPath || currentEle.isCompleted && completedNotesPath ? (
        currentEle.category
        // ) : null
    )
    ))]

    function filterItems(items: string) {
        const updatedFilterItems = allNotes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedFilterItems)
        setState(true)
    }

    const Text = addNotesPath ? "Yours Notes" : "Completed Notes"
    const Type = addNotesPath ? "Added" : "Completed"

    // status will either be completely true or completely false
    let status: boolean | undefined;
    allNotes.forEach((Element: any, i: number) => {
        for(let key in Element){
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
                            <Typography.Title level={4}> 
                                No Task {Type}
                            </Typography.Title>
                        ) : (
                            <div style={style}>
                                <Typography.Title level={4}> 
                                    {Text}
                                </Typography.Title>
                                <div style={style}>
                                    <Typography.Title level={5}>
                                        Filter the list
                                    </Typography.Title>
                                    <Button onClick={() => setItems(allNotes)} type="ghost">
                                        All items
                                    </Button>
                                    {allItems.map((currentEle: any, index: number) => {
                                        return (
                                            <span key={index}>
                                                <Button
                                                    onClick={() => filterItems(currentEle)}
                                                    type="ghost"
                                                >
                                                    {currentEle}
                                                </Button>
                                            </span>
                                        )
                                    })}
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
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted}/>
                            </Col>
                        ) : null
                    )
                })}
            </Row>
        </div>
    )
}