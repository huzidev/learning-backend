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
    const [testState, setTEstState] = useState<boolean>(false);
    const ref = useRef<any>(null)
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let icon : any
    let title: String;
    let description: String | null;

    let path: any;
    if (Location.pathname.includes('/addnote')) {
        path = "/allnotes"
    } else if (Location.pathname.includes('/completed')) {
        path = "/completednotes"
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
            async function openNotification() {
            if (data.length === 0) {
                icon = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
                title = `Empty`;
                description = `No Note Has Found!`;
            } else {
                icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
                title = `Notes Fetched Successfully`;
                description = `${data.length} notes have been fetched`;
            }
            notification.open({
                icon : icon,
                message: title,
                description: description
            });
            };
            openNotification();
            setNotes(data)
        }
        console.log("in all notes", notes);
        getNotes()
    }, [Location.pathname])

    console.log("waht si state", testState);
    

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
    }

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
            } catch (err) {
                console.log(err);
            }
        setIsModalOpen(false);
        window.location.reload()
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
