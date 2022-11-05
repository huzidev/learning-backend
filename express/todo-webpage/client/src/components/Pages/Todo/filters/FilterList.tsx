import React, { useState } from 'react';
import ShowNotes from '../notes/ShowNotes';
import { Card, Col, Row , Button, Typography, Modal } from 'antd';

export default function FilterList(props: any): JSX.Element {

    const [state, setState] = useState(false)
    const [items, setItems] = useState(props.notes)

    const allItems = [...new Set(props.notes.map((currentEle: any) => {
        return (
            !currentEle.isCompleted ? (
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

    return (
        <div>
            {
                props.notes.length === 0 ? "" : (
                    <>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography.Title level={4}> 
                                Yours Notes
                            </Typography.Title>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Typography.Title level={5}>
                                    Filter the list
                                </Typography.Title>
                                <Button onClick={() => setItems(props.notes)}>
                                    All items
                                </Button>
                                {allItems.map((currentEle: any) => {
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
                {Data.map((note: any, i: number) => {
                    return (
                        <Col className="gutter-row" span={8} style={{ margin: "10px 0px" }}>
                            <ShowNotes key={note._id} updateNote={props.updateNote} note={note} />
                        </Col>
                    ) 
                })}
            </Row>
        </div>
    )
}