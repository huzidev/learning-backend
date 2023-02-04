import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, notification, Typography } from 'antd';
import { useState } from 'react';
import { FormattedDate, IntlProvider } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { deleteThisNote } from '../../../../store/notes/DeleteNote/deleteSlice';

export default function ShowNotes(props: any): JSX.Element {
    console.log('ShowNotes');
    
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
    
    const isCompleted = note?.isCompleted;
    let typeOf: string = isCompleted ? "Completed At" : "Created At";
    return (
        <div className='global'>
            {!isCompleted && Location.pathname.includes('/addnote') || isCompleted && Location.pathname.includes('/completed') ? (
                <Card title={
                    <Typography.Title level={5}>
                        {note.title}
                    </Typography.Title>
                }
                    size="small"
                    className="Dark Border" 
                >
                    <div>
                        <Typography.Text>
                            <span className="fontWeight">
                                Description: {" "}
                            </span>
                            {note.description}
                        </Typography.Text>
                    </div>
                    <div className="marginTop">
                        <Typography.Text>
                            <span className="fontWeight">
                                Category: {" "}
                            </span>
                            {note.category}
                        </Typography.Text>
                    </div>
                    <div className="marginTop">
                        <IntlProvider locale="en" defaultLocale="en">
                            <Typography.Text>
                                <span className="fontWeight">
                                    {typeOf} {" "}
                                </span>
                                <FormattedDate
                                    value={note.date}
                                />
                            </Typography.Text>
                            <br />
                        </IntlProvider>
                    </div>
                    <div className="marginTop">
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
