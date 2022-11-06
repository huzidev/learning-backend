import React, { useState } from 'react';
import ShowNotes from '../notes/ShowNotes';
import { Card, Col, Row , Button, Typography, Modal } from 'antd';
import { useLocation } from 'react-router-dom';

export default function FilterList(props: any): JSX.Element {

    const Location = useLocation()
    const [state, setState] = useState(false)
    const [items, setItems] = useState(props.notes)

    const allItems = [...new Set(props.notes.map((currentEle: any) => {
        return (
            !currentEle.isCompleted && Location.pathname.includes('/note/addnote') ? (
                currentEle.category
            ) : currentEle.isCompleted && Location.pathname.includes('/note/completed') ? (
                currentEle.category
            ) : ''
        )
    }))]

    let Data = state ? items : props.notes

    function filterItems(items: string) {
        const updatedItems = props.notes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedItems)
        setState(true)
    }

    const noData = "No Note Found"

    const Text = Location.pathname.includes('/note/addnote') ? "Yours Notes" : "Completed Notes"

    return (
        <div>
            {
                props.notes.length === 0 ? "" : (
                    <>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography.Title level={4}> 
                                {Text}
                            </Typography.Title>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Typography.Title level={5}>
                                    Filter the list
                                </Typography.Title>
                                <Button onClick={() => setItems(props.notes)}>
                                    All items
                                </Button>
                                {allItems.map((currentEle: any) => {
                                    if (!note.isCompleted && Location.pathname.includes('/note/addnote')) { }
                                    return (
                                        <span key={currentEle}>
                                            <Button
                                                onClick={() => filterItems(currentEle)}
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
                    if (!note.isCompleted && Location.pathname.includes('/note/addnote')) {
                        return (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted} />
                            </Col>
                    ) 
                    } else if (note.isCompleted && Location.pathname.includes('/note/completed')) {
                        return(
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted} />
                            </Col>
                        )
                    } 
                })}
            </Row>
        </div>
    )
}