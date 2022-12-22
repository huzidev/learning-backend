import React, { useState, useEffect } from 'react';
import ShowNotes from '../notes/ShowNotes';
import { Card, Col, Row , Button, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { fetchNotes, noteAction } from '../../../../store/notes/noteSlice';

export default function FilterList(props: any): JSX.Element {

    const dispatch = useAppDispatch();
    const noteData = useAppSelector(state => state.note)
    const Location = useLocation()
    const [state, setState] = useState(false)
    const [items, setItems] = useState(noteData.noteData)

    useEffect(() => {
        dispatch(fetchNotes())  
    }, [])

    const  num: string = useAppSelector((state) => state.note.location)

    let locationName = Location.pathname.includes('/addnote') ? "/allnote" : Location.pathname.includes('/completed') ? "/completednotes" : ''

    useEffect(() => {
        dispatch(noteAction.getStateTest(locationName))
    }, [Location.pathname])

    let Data = state ? items : noteData.noteData

    const allItems = [...new Set(noteData.noteData.map((currentEle: any) => {
        return (
            !currentEle.isCompleted && Location.pathname.includes('/addnote') || currentEle.isCompleted && Location.pathname.includes('/completed') ? (
                currentEle.category
            ) : null
        )
    }))]

    console.log("length of data", Data.length);

    function filterItems(items: string) {
        const updatedItems = noteData.noteData.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedItems)
        setState(true)
    }

    const Text = Location.pathname.includes('/note/addnote') ? "Yours Notes" : "Completed Notes"

    const Holder = Location.pathname.includes('/note/addnote') ? "Added" : "Completed"

    let holder;
    Data.forEach((Element: any, i: number) => {
        for(let key in Element){
            console.log(`${Element.isCompleted}`);
            holder = Element.isCompleted
        }
    });

    console.log("what is holder", holder);
    
    return (
        <div>
            {
                <>
                    {
                        (Location.pathname.includes('/note/completed') && holder !== true || holder === undefined) || (Location.pathname.includes('/note/addnote') && holder !== false || holder === undefined) ? (
                            <Typography.Title level={4}> 
                                No Task {Holder}
                            </Typography.Title>
                        ) : (
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Typography.Title level={4}> 
                                    {Text}
                                </Typography.Title>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
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
                {Data.map((note: any) => {
                    return (
                        !note.isCompleted && Location.pathname.includes('/note/addnote') || note.isCompleted && Location.pathname.includes('/note/completed') ? (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted}/>
                            </Col>
                        ) : null
                    )
                })}
            </Row>
            <h1>
                Currenlty the path is {num}
            </h1> 
        </div>
    )
}