import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal, Form, Input, Typography, notification } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import DataContext from "../../../Context/DataContext";
import AddTodo from '../addTodo/AddTodo';
import { DataType, DataTypeHold } from './Type';
import FilterList from '../filters/FilterList';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { fetchNotes, noteAction } from '../../../../store/notes/ShowNotes/noteSlice';
import { updateThisNote } from '../../../../store/notes/UpdateNote/updateSlice';

export default function NotesItems(props: any) {
    const dispatch = useAppDispatch();
    const noteData = useAppSelector(state => state.note)
    const Location = useLocation()
    const [note, setNote] = useState<DataType>({ id: "", title: "", description: "", category: "", isChecked: null })
    const [holdNote, setHoldNote] = useState<DataTypeHold>({ hid: null, htitle: "", hdescription: "", hcategory: "", hIsCompleted: undefined })
    const [isCheckedState, setIsCheckedState] = useState<boolean | undefined>(undefined);
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
        dispatch(noteAction.testState())
    }, [Location.pathname])
    
    const noteRes = noteData.res
    const allNotesLenggt = noteData.totalNotes;
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

    // console.log("allNotes are", allNotesLenggt);
    // console.log("res notes TS", noteRes);

    // if (allNotes.length === 0) {
    //     (dispatch(noteAction.testState(404)))
    // } else if (allNotes.length === 1) {
    //     (dispatch(noteAction.testState(201)))
    // } else if (allNotes.length > 1) {
    //     (dispatch(noteAction.testState(202)))
    // }

    // useEffect(() => {
            // const res = await fetch(`${path}`, {
            //     method : 'GET',
            //     headers: {
            //         "Content-Type" : "application/json",
            //     }
            // })
            useEffect(() => {
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
                    info = `${allNotesLenggt} notes have been fetched`;
                }
                notificationTs(icon, message, info);
            }, [])
            // setNotes(data)
    // }, [Location.pathname])
    
    const updateNote = (currentNote: any) => {
        // ref.current.click() checks if user clicked or not therefore we've passed the ref in the button of modal as ref={ref}
        // to check if user clicked or not
        // ref.current.value gets the value
        // ref.current.click() checks the click
        ref.current.click();
        setIsCheckedState(currentNote.isCompleted)
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            category: currentNote.category,
            isChecked: currentNote.isCompleted
        })
        // to hold initial value and if user didn't chnage the value and tries to update the note with sane value then to show error 
        setHoldNote({
            hid: currentNote._id,
            htitle: currentNote.title,
            hdescription: currentNote.description,
            hcategory: currentNote.category,
            hIsCompleted: currentNote.isCompleted
        })
    }

    function stateChanger() {
        setIsCheckedState(!isCheckedState)
    }

    console.log("note", note);
    

    const { id, title, description, category, isChecked } = note
    const handleClick = async () => {
        const { htitle, hdescription, hcategory, hIsCompleted } = holdNote
            // try {
            //     const res = await fetch(`/updatenote/${id}`, {
            //         method: 'PUT',
            //         headers: new Headers({
            //             "Content-Type" : "application/json",
            //         }),
            //         body: JSON.stringify({
            //             title : etitle,
            //             description : edescription,
            //             category : ecategory,
            //             isCompleted: isChecked
            //         })
            //     });
        dispatch(updateThisNote(note))
                let state: string = isChecked ? "Completed Notes" : "Notes List"
            if (title === "" || description === "" || category === "") {
                    icon = error;
                    message = "Empty Field";
                    info = `You can't left any field empty`
            } else if (title === htitle && description === hdescription && category === hcategory && isCheckedState === hIsCompleted) {
                    icon = error;
                    message = "Same Data";
                    info = `Nothing New To Update All Values Are Same As Before`
            } else if (isCheckedState === !hIsCompleted) {
                    icon = success;
                    message = "Task Completed";
                    info = `Yours Note Has Been Added To ${state}`
                } else {
                    icon = success;
                    message = "Note Updated";
                    info = `Yours Note Has Been Updated Successfully!`
                    // let newNote = JSON.parse(JSON.stringify(notes))
                    //     setNotes(newNote)
                }
                notificationTs(icon, message, info);
            // } catch (err) {
            //     console.log(err);
            // }
        setIsModalOpen(false);
        // setTimeout(() => {
        //     window.location.reload()
        // }, 2500);
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
                        <Typography.Title level={5} className="h5">
                            Title
                        </Typography.Title>
                        <Input
                            type="text"
                            name='title'
                            value={title}
                            onChange={onChange}
                        />
                        <Typography.Title level={5} style={style} className="h5">
                            Description
                        </Typography.Title>
                        <Input
                            type="text"
                            name='description'
                            value={description}
                            onChange={onChange}
                        />
                        <Typography.Title level={5} style={style}>
                            Category
                        </Typography.Title>
                        <Input
                            type="text"
                            name='category'
                            value={category}
                            onChange={onChange}
                        />
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <input 
                                type="checkbox"
                                checked={isCheckedState}
                                onChange= {stateChanger}
                            />
                            <Typography.Title level={5} style={{ margin: '0px 0px 0px 10px' }}>
                                {isCheckedState ? "Completed" : "Not Completed"}
                            </Typography.Title>
                        </div>
                    </Form>
                </Modal>
            </>
            <FilterList 
                notes={allNotes}
                updateNote={updateNote}
            />
            <h1 className='h1'>
                WHAT IS RES {noteRes}
            </h1>
        </div>
    )
}
