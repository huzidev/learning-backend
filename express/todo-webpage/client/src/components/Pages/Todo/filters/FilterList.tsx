import React, { useState, useEffect } from 'react';
import ShowNotes from '../notes/ShowNotes';
import ShowCompNotes from '../notes/ShowCompNotes';
import { Card, Col, Row , Button, Typography, Modal } from 'antd';
import { useLocation } from 'react-router-dom';

export default function FilterList(props: any): JSX.Element {

    const Location = useLocation()
    const [state, setState] = useState(false)
    const [items, setItems] = useState(props.notes)

    
    let Data = state ? items : props.notes

    const allItems = [...new Set(props.notes.map((currentEle: any) => {
        return (
            currentEle.category
        )
    }))]

    console.log("length of data", Data.length);
    

    function filterItems(items: string) {
        const updatedItems = props.notes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedItems)
        setState(true)
    }

    const Text = Location.pathname.includes('/note/addnote') ? "Yours Notes" : "Completed Notes"

    const Holder = Location.pathname.includes('/note/addnote') ? "Added" : "Completed"

    return (
        <div>
            {
                Data.length === 0 ? `No Task ${Holder}`  : (
                    <>
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
                    </>
                )
            }
            <Row gutter={16}>
                {Data.map((note: any) => {
                    return (
                        !note.isCompleted && Location.pathname.includes('/note/addnote') ? (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted}/>
                            </Col>
                        ) : note.isCompleted && Location.pathname.includes('/note/completed') ? (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowCompNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted}/>
                            </Col>
                        ) : ''
                    )
                })}
            </Row>
        </div>
    )
}