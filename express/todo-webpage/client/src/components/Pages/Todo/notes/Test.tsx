import React, {useState} from 'react'
import { Card, Col, Row , Button, Typography, Modal } from 'antd';
import {IntlProvider, FormattedDate} from 'react-intl'

export default function Test(props: any) {

    const { note, updateNote, deleteNote } = props

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <div>
        <Card title={
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
                <IntlProvider locale="en" defaultLocale="en">
                    <Typography.Text>
                        Created At {" "}
                        <FormattedDate 
                            value={note.date} 
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
            </Card>
    </div>
  )
}
