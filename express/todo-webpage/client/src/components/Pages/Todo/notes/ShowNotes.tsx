import React, { useContext, useState, useEffect } from 'react';
import DataContext from "../../../Context/DataContext";
import { Card, Button, Typography, Modal, notification } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import {IntlProvider, FormattedDate} from 'react-intl'
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { deleteThisNote } from '../../../../store/notes/DeleteNote/deleteSlice';

export default function ShowNotes(props: any): JSX.Element {
    const Location = useLocation()
    const context = useContext(DataContext);
    const { notes, setNotes } = context;
    const { note, updateNote } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function deleteNote() {
        try {
            // const res = await fetch(`/deletenote/${note._id}`, {
            //     method: 'DELETE',
            //     headers: {
            //         "Content-Type" : "application/json",
            //     }
            // })
            // const data = res.json();
            dispatch(deleteThisNote(note._id))
            const newNotes = notes.filter((d: any) => { return d._id !== note.id })
            setNotes(newNotes)
            async function openNotification() {
                notification.open({
                    icon : <CheckCircleOutlined style={{ color: '#00FF00' }}/>,
                    message: "Note Deleted Successfully!"
                });
            };
            openNotification();
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            {!note.isCompleted && Location.pathname.includes('/addnote') || note.isCompleted && Location.pathname.includes('/completed') ? ( 
                <Card title={
                    <Typography.Title level={5}>
                        {note.title}
                    </Typography.Title>
                } 
                size="small"
                className="Dark Border"
                >
                    <Typography.Title level={5}>
                        Description: {note.description}
                    </Typography.Title> 
                    <Typography.Title level={5} style={{ margin: '10px 0px' }}>
                        Category: {note.category}
                    </Typography.Title>
                    <IntlProvider locale="en" defaultLocale="en">
                        <Typography.Text>
                            Created At {" "}
                            <FormattedDate 
                                value={note.date} 
                            />
                        </Typography.Text>
                        <br />
                    </IntlProvider>
                    <div style={{ marginTop: '10px' }}> 
                        <Button onClick={showModal} type="ghost" style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                        <Modal title="Delete Note" open={isModalOpen} okText="Delete" onOk={deleteNote} onCancel={handleCancel}>
                            <Typography.Text>
                                Are You Sure? You Wanna Delete This Note?
                            </Typography.Text>
                        </Modal>
                        <Button onClick={() => {updateNote(note)}} type="ghost">
                            Update Note
                        </Button>
                    </div>
                </Card>
            ) : ''
        }
        </div>
    )
}
