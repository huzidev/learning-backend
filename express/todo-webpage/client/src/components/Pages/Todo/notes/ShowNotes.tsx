import React, { useContext, useState } from 'react';
import DataContext from "../../../Context/DataContext";
import { Card, Col, Row , Button, Typography, Modal } from 'antd';
import {IntlProvider, FormattedDate} from 'react-intl'

export default function ShowNotes(props: any): JSX.Element {
    const context = useContext(DataContext);
    const { notes, setNotes } = context;
    const { note, updateNote } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function deleteNote() {
        try {
            const res = await fetch(`/deletenote/${note._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                }
            })
            const data = res.json();
            const newNotes = notes.filter((d: any) => { return d._id !== note.id })
            setNotes(newNotes)
            window.alert("Note Deleted Successfully!");
            window.location.reload()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {!props.isCompleted ? ( <Card title={
                <Typography.Title level={5}>
                    {note.title}
                </Typography.Title>
            } 
            size="small"
            >
                <Typography.Title level={5}>
                    Description: {note.description}
                </Typography.Title> 
                <Typography.Title level={5}>
                    Category: {note.category}
                </Typography.Title>
                <IntlProvider locale="us" defaultLocale="en">
                    <Typography.Text>
                        Created At {" "}
                        <FormattedDate 
                            value={note.date} 
                        />
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                        Updated At {" "}
                        <FormattedDate 
                            value={note.updatedAt} 
                        />
                    </Typography.Text>
                    <br />
                </IntlProvider>
                <Button onClick={showModal}>
                    Delete
                </Button>
                <Modal title="Delete Note" open={isModalOpen} okText="Delete" onOk={deleteNote} onCancel={handleCancel}>
                    <Typography.Text>
                        Are You Sure? You Wanna Delete This Note?
                    </Typography.Text>
                </Modal>
                <Button onClick={() => {updateNote(note)}}>
                    Update Note
                </Button>
            </Card>) : 'Completed'}
        </div>
    )
}
