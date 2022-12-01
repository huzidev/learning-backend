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
            !currentEle.isCompleted && Location.pathname.includes('/note/addnote') || currentEle.isCompleted && Location.pathname.includes('/note/completed') ? (
                currentEle.category
            ) : null
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

    let object = Data.map((d: any) => d.isCompleted)

    console.log("Whta is state", object);
    
    console.log("whta is length of total", object.length);

    let holderTrue: any = [];
    let holderFalse: any = [];

    for (let index = 0; index < object.length; index++) {
        if (object[index] === true) {
            holderTrue[index] = "true"
        } else if (object[index] === false) {
            holderFalse[index] = "false";
        }
    }
    console.log("holderTrue", holderTrue);
    console.log("holderFalse", holderFalse);

    let quanT: any;
    let quanF: number;

    for (let index = 0; index < holderTrue.length; index++) {
        if (holderTrue[index] === "true") {
            console.log("true");
            quanT = index+1;
            console.log("Quant for true", quanT);
        }
    }
    for (let index = 0; index < holderFalse.length; index++) {
        if (holderFalse[index] === "false") {
            console.log("false");
            quanF = index+1;
            console.log("Quant for false", quanF);
        }
    }

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
                        !note.isCompleted && Location.pathname.includes('/note/addnote') || note.isCompleted && Location.pathname.includes('/note/completed') ? (
                            <Col span={8} style={{ margin : '10px 0px' }}>
                                <ShowNotes key={note._id} updateNote={props.updateNote} note={note} isCompleted={note.isCompleted} noData={noData} quanT={quanT} quantF={quanF}/>
                            </Col>
                        ) : ''
                    )
                })}
            </Row>
        </div>
    )
}