import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal, Form, Input, Typography, notification } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../../../Context/DataContext";
import AddTodo from '../addTodo/AddTodo';
import { DataType } from './Type';
import FilterList from '../filters/FilterList';

export default function NotesItems(props: any) {
    const Location = useLocation()
    const context = useContext(DataContext);
    const { notes, setNotes } = context;
    const [note, setNote] = useState<DataType>({ id: "", etitle: "", edescription: "", ecategory: "" })
    const [isChecked, setIsChecked] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const ref = useRef<any>(null)
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const error: any = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
    const success: any = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
    let icon : any
    let message: String;
    let info: String | null;

    let path: String;
    if (Location.pathname.includes('/addnote')) {
        path = "/allnotes"
    } else if (Location.pathname.includes('/completed')) {
        path = "/completednotes"
    }

    async function notificationTs(icon: React.ReactNode, message: String, info: String | null) {
        notification.open({
            icon : icon,
            message: message,
            description: info
        });
    }

    useEffect(() => {
        async function getNotes() {
            const res = await fetch(`${path}`, {
                method : 'GET',
                headers: {
                    "Content-Type" : "application/json",
                }
            })
            const data = await res.json();
            if (data.length === 0) {
                icon = error;
                message = `Empty`;
                info = `No Note Has Found!`;
            } else if (data.length === 1) {
                icon = success;
                message = `Note Fetched Successfully`;
                info = `${data.length} note has been fetched`;
            } else {
                icon = success;
                message = `Notes Fetched Successfully`;
                info = `${data.length} notes have been fetched`;
            }
            notificationTs(icon, message, info);
            setNotes(data)
        }
        getNotes()
    }, [Location.pathname])

    let holdTitle: any
    let holdDesc: String
    let holdCategory: String

    const updateNote = (currentNote: any) => {
        // ref.current.click() checks if user clicked or not therefore we've passed the ref in the button of modal as ref={ref}
        // to check if user clicked or not
        // ref.current.value gets the value
        // ref.current.click() checks the click
        ref.current.click();
        setIsChecked(currentNote.isCompleted)
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            ecategory: currentNote.category,
        })
        console.log("currentNote.title", currentNote.title);
        
        holdTitle = currentNote.title;
        holdDesc = currentNote.description;
        holdCategory = currentNote.category;
    }

    console.log("what is HOLD TITLE", holdTitle);
    

    function stateChanger() {
        setIsChecked(!isChecked)
    }

     
    const handleClick = async () => {
        const { id, etitle, edescription, ecategory } = note
            try {
                const res = await fetch(`/updatenote/${id}`, {
                    method: 'PUT',
                    headers: new Headers({
                        "Content-Type" : "application/json",
                    }),
                    body: JSON.stringify({
                        title : etitle,
                        description : edescription,
                        category : ecategory,
                        isCompleted: isChecked
                    })
                });
                if (etitle === "" || edescription === "" || ecategory === "") {
                    icon = error;
                    message = "Empty Field";
                    info = `You can't left any field empty`
                } 
                else if (etitle === holdTitle || edescription === holdDesc || ecategory === holdCategory) {
                    icon = error;
                    message = "Same Data";
                    info = `Nothing New To Update All Values Are Same As Before`
                } 
                //else if (isChecked === !holdState) {
                //     icon = success;
                //     message = "Task Completed";
                //     info = `Yours Task Has Benn Added To Completed Notes`
                // }// 
                else {
                    let newNote = JSON.parse(JSON.stringify(notes))
                    for (let index = 0; index < newNote.length; index++) {
                        const element = newNote[index];
                        if (element._id === id) {
                            newNote[index].title = etitle;
                            newNote[index].description = edescription;
                            newNote[index].category = ecategory;
                            break; 
                        }
                        setNotes(newNote)
                    }
                }
                notificationTs(icon, message, info);
            } catch (err) {
                console.log(err);
            }
        setIsModalOpen(false);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote({ 
            ...note, 
            [e.target.name]: e.target.value 
        })
    }

    const style = {
        marginTop: "10px"
    }

    return (
        <div>
            { Location.pathname.includes('/addnote') ? <AddTodo /> : '' }
            <>
                <Button style={{ display: "none" }} ref={ref} type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="Update Todo" open={isModalOpen} okText="Update" cancelText="Cancel" onOk={handleClick} onCancel={handleCancel}>
                    <Form>
                        <Typography.Title level={5}>
                            Title
                        </Typography.Title>
                        <Input
                            type="text"
                            name='etitle'
                            value={note.etitle}
                            onChange={onChange}
                        />
                        <Typography.Title level={5} style={style}>
                            Description
                        </Typography.Title>
                        <Input
                            type="text"
                            name='edescription'
                            value={note.edescription}
                            onChange={onChange}
                        />
                        <Typography.Title level={5} style={style}>
                            Category
                        </Typography.Title>
                        <Input
                            type="text"
                            name='ecategory'
                            value={note.ecategory}
                            onChange={onChange}
                        />
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <input 
                                type="checkbox"
                                checked= {isChecked}
                                onChange= {stateChanger}
                            />
                            <Typography.Title level={5} style={{ margin: '0px 0px 0px 10px' }}>
                                {isChecked ? "Completed" : "Not Completed"}
                            </Typography.Title>
                        </div>
                    </Form>
                </Modal>
            </>
            <FilterList 
                notes={notes}
                updateNote={updateNote}
            />
        </div>
    )
}
