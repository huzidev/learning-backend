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
    
    const [state, setState] = useState(false)
    const [items, setItems] = useState(allNotes)

    const locationPahtName: string = useAppSelector((state) => state.note.locationPath)
    const stateholder: string = useAppSelector((state) => state.note.pathHolder)
    let locationName = Location.pathname.includes('/addnote') ? "/allnotes" : Location.pathname.includes('/completed') ? "/completednotes" : ''
    
    useEffect(() => {
        dispatch(fetchNotes(locationName))  
    }, [locationName])


    useEffect(() => {
        dispatch(noteAction.getStateTest(locationName))
    }, [Location.pathname])

    // when user clicked on filter list then state will change to true & all the notes with that specific catgeory will fetch only therefore state must be true but initially it is false 
    let Data = state ? items : allNotes

    const allItems = [...new Set(allNotes.map((currentEle) => {
        return (
            // !currentEle.isCompleted && Location.pathname.includes('/addnote') || currentEle.isCompleted && Location.pathname.includes('/completed') ? (
                currentEle.category
            // ) : null
        )
    }))]

    function filterItems(items: string) {
        const updatedFilterItems = notes.noteData.filter((element) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedFilterItems)
        setState(true)
    }

    const Text = Location.pathname.includes('/addnote') ? "Yours Notes" : "Completed Notes"
    const Type = Location.pathname.includes('/note/addnote') ? "Added" : "Completed"

    // holder will either be completely true or completely false
    let holder;
    Data.forEach((Element: any, i: number) => {
        for(let key in Element){
            console.log(`${Element.isCompleted}`);
            holder = Element.isCompleted
        }
    });

    console.log("what is holder", holder);
    
    const style = {
        display: "flex", 
        justifyContent: "space-between"
    }

    const error = holder === undefined;

    return (
        <div>
            {
                <>
                    {
                        (Location.pathname.includes('/completed') && (holder !== true || error)) || (Location.pathname.includes('/addnote') && (holder !== false || error)) ? (
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
                                    <Button onClick={() => setItems(props.notes)} type="ghost">
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
                        !note.isCompleted && Location.pathname.includes('/addnote') || note.isCompleted && Location.pathname.includes('/completed') ? (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted}/>
                            </Col>
                        ) : null
                    )
                })}
            </Row>
            <h1>
                Currenlty the path is {locationPahtName}
            </h1> 
            <h1>
                What is Path {stateholder}
            </h1>
        </div>
    )
}