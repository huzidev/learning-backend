import { useState } from 'react';
import { Card, Button, Typography, Modal, notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { IntlProvider, FormattedDate } from 'react-intl'
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { deleteThisNote } from '../../../../store/notes/DeleteNote/deleteSlice';

export default function ShowNotes(props: any): JSX.Element {
    const dispatch = useAppDispatch();
    const Location = useLocation();
    const { note, updateNote } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    function deleteNote() {
        dispatch(deleteThisNote(note._id));
        function openNotification() {
            notification.open({
                icon: <CheckCircleOutlined style={{ color: '#00FF00' }} />,
                message: "Note Deleted Successfully!"
            });
        };
        openNotification();
        setTimeout(() => {
            window.location.reload();
        }, 1500)
    };

    let typeOf: string = note.isCompleted ? "Completed At" : "Created At";

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
                    <Typography.Title level={5} style={{ margin: '10px 5px' }}>
                        Category: {note.category}
                    </Typography.Title>
                    <IntlProvider locale="en" defaultLocale="en">
                        <Typography.Text>
                            {typeOf} {" "}
                            <FormattedDate
                                value={note.date}
                            />
                        </Typography.Text>
                        <br />
                    </IntlProvider>
                    <div style={{ marginTop: '10px' }}>
                        <Button onClick={() => setIsModalOpen(true)} type="ghost" style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                        <Modal title="Delete Note" open={isModalOpen} okText="Delete" onOk={deleteNote} onCancel={() => setIsModalOpen(false)}>
                            <Typography.Text>
                                Are You Sure? You Wanna Delete This Note?
                            </Typography.Text>
                        </Modal>
                        <Button onClick={() => updateNote(note)} type="ghost">
                            Update Note
                        </Button>
                    </div>
                </Card>) : ''
            }
        </div>
    )
}
