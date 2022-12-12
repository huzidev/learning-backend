import React, { useState } from 'react';
import ShowNotes from '../notes/ShowNotes';
import type { MenuProps } from 'antd';
import { Card, Col, Row , Button, Typography, Dropdown, Space } from 'antd';
import { useLocation } from 'react-router-dom';

export default function FilterList(props: any): JSX.Element {

    const Location = useLocation()
    const [state, setState] = useState(false)
    const [items, setItems] = useState(props.notes)

    
    let Data = state ? items : props.notes

    const data: MenuProps['items'] = []

    const allItems = [...new Set(props.notes.map((currentEle: any) => {
        return (
            !currentEle.isCompleted && Location.pathname.includes('/note/addnote') || currentEle.isCompleted && Location.pathname.includes('/note/completed') ? (
                currentEle.category
            ) : null
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

    console.log("data", Data);
    
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
        </div>
    )
}