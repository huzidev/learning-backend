import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal, Form, Input, Typography, notification } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import DataContext from "../../../Context/DataContext";
import AddTodo from '../addTodo/AddTodo';
import { DataType, DataTypeHold } from './Type';
import FilterList from '../filters/FilterList';
import { updateThisNote } from '../../../../store/notes/UpdateNote/updateSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { fetchNotes, noteAction } from '../../../../store/notes/ShowNotes/noteSlice';

export default function NotesItems(props: any) {
    const Location = useLocation()
    const context = useContext(DataContext);
    const { notes, setNotes } = context;
    const [note, setNote] = useState<DataType>({ id: "", etitle: "", edescription: "", ecategory: "" })
    const [holdNote, setHoldNote] = useState<DataTypeHold>({ hid: "", htitle: "", hdescription: "", hcategory: "", hIsCompleted: undefined })
    const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const ref = useRef<any>(null)
    const error: React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
    const success: React.ReactNode = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
    let icon : React.ReactNode;
    let message: any, path: any;
    let info: any;

    if (Location.pathname.includes('/addnote')) {
        path = "/allnotes"
    } else if (Location.pathname.includes('/completed')) {
        path = "/completednotes"
    }
    useEffect(() => {
        dispatch(fetchNotes(path))
    }, [Location.pathname])
    
    const dispatch = useAppDispatch();
    const noteData = useAppSelector(state => state.note)
    const noteRes = noteData.res
    let allNotes: any = noteData.noteData;
    
    const showModal = () => {   
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    async function notificationTs(icon: React.ReactNode, message: string, info: string | null) {
        notification.open({
            icon : icon,
            message: message,
            description: info
        });
    }

    if (allNotes.length === 0) {
        (dispatch(noteAction.testState(404)))
    } else if (allNotes.length === 1) {
        (dispatch(noteAction.testState(201)))
    } else if (allNotes.length > 1) {
        (dispatch(noteAction.testState(202)))
    }


    console.log("REs for notes", noteRes);
    
    // useEffect(() => {
            // const res = await fetch(`${path}`, {
            //     method : 'GET',
            //     headers: {
            //         "Content-Type" : "application/json",
            //     }
            // })
            setTimeout(() => {
                if (noteRes === 404) {
                    icon = error;
                    message = `Empty`;
                    info = `No Note Has Found!`;
                } else if (noteRes === 201) {
                    icon = success;
                    message = `Note Fetched Successfully`;
                    info = `1 note has been fetched`;
                } else if (noteRes === 202) {
                    icon = success;
                    message = `Notes Fetched Successfully`;
                    info = `${allNotes.length} notes have been fetched`;
                }
                notificationTs(icon, message, info);
            }, 2500)
            // setNotes(data)
    // }, [Location.pathname])
    
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
        // to hold initial value and if user didn't chnage the value and tries to update the note with sane value then to show error 
        setHoldNote({
            htitle: currentNote.title,
            hdescription: currentNote.description,
            hcategory: currentNote.category,
            hIsCompleted: currentNote.isCompleted
        })
    }

    function stateChanger() {
        setIsChecked(!isChecked)
    }

    const handleClick = async () => {
        const { id, etitle, edescription, ecategory } = note
        const { htitle, hdescription, hcategory, hIsCompleted } = holdNote
        dispatch(updateThisNote(holdNote))
                let state: string = isChecked ? "Completed Notes" : "Notes List"
                if (etitle === "" || edescription === "" || ecategory === "") {
                    icon = error;
                    message = "Empty Field";
                    info = `You can't left any field empty`
                } else if (etitle === htitle && edescription === hdescription && ecategory === hcategory && isChecked === hIsCompleted) {
                    icon = error;
                    message = "Same Data";
                    info = `Nothing New To Update All Values Are Same As Before`
                } else if (isChecked === !hIsCompleted) {
                    icon = success;
                    message = "Task Completed";
                    info = `Yours Note Has Been Added To ${state}`
                } else {
                    icon = success;
                    message = "Note Updated";
                    info = `Yours Note Has Been Updated Successfully!`
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
        setIsModalOpen(false);
        setTimeout(() => {
            window.location.reload()
        }, 2500);
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
