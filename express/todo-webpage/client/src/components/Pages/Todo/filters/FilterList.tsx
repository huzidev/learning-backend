import React, { useState, useEffect } from 'react';
import ShowNotes from '../notes/ShowNotes';
import { Col, Row , Button, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { fetchNotes, noteAction } from '../../../../store/notes/ShowNotes/noteSlice';

export default function FilterList(props: any): JSX.Element {
    const dispatch = useAppDispatch();
    const Location = useLocation()
    const notes = useAppSelector(state => state.note)
    let allNotes = notes.noteData
    
    const [state, setState] = useState<boolean | null>(null)
    const [items, setItems] = useState(allNotes)

    const addNotesPath: boolean = Location.pathname.includes('/addnote');
    const completedNotesPath: boolean = Location.pathname.includes('/completed');

    const locationName: string = addNotesPath ? "/allnotes" : "/completednotes"

    useEffect(() => {
        dispatch(fetchNotes(locationName))
        setState(null)
    }, [locationName])

    // when user clicked on filter list then state will change to true & all the notes with that specific catgeory will fetch only therefore state must be true but initially it is false 
    let Data = state ? items : allNotes

    console.log("data", Data);

    const allItems = [...new Set(allNotes.map((currentEle) => (
        // !currentEle.isCompleted && addNotesPath || currentEle.isCompleted && completedNotesPath ? (
        currentEle.category
        // ) : null
    )
    ))]

    function filterItems(items: string) {
        const updatedFilterItems = allNotes.filter((element) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedFilterItems)
        setState(true)
    }

    const Text = addNotesPath ? "Yours Notes" : "Completed Notes"
    const Type = addNotesPath ? "Added" : "Completed"

    // holder will either be completely true or completely false
    let holder: boolean | undefined;
    allNotes.forEach((Element: any, i: number) => {
        for(let key in Element){
            console.log(`${Element.isCompleted}`);
            holder = Element.isCompleted
        }
    });

    const style = {
        display: "flex", 
        justifyContent: "space-between",
    }

    const error = holder === undefined;

    return (
        <div>
            {
                <>
                    {
                        (completedNotesPath && (holder !== true || error)) || (addNotesPath && (holder !== false || error)) ? (
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