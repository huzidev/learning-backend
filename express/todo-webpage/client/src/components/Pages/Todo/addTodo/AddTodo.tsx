import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, notification } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { addNoteAction, addThisNote } from '../../../../store/notes/AddNote/addNoteSlice';
import { DataType } from './Type';

export default function AddTodo(): JSX.Element {
  const noteRes = useAppSelector(state => state.addnote)
  const dispatch = useAppDispatch();
  let res: number | null = noteRes.res

  const initialState = {
    title: "", 
    description: "", 
    category: "",
    isCompleted: false
  }

  const [note, setNote] = useState<DataType>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }
  
  let icon: React.ReactNode;
  let heading: string, field: string;
  let message: string | null;

  const { title, description, category } = note;
  if (title === "") {
    dispatch(addNoteAction.receiveTEst(421))
    field = "Title"
  } else if (description === "") {
    dispatch(addNoteAction.receiveTEst(422))
    field = "Description"
  } else if (category === "") {
    dispatch(addNoteAction.receiveTEst(423))
    field = "Category"
  } else {
    dispatch(addNoteAction.receiveTEst(200))
  }

  function addTodo() {
    dispatch(addThisNote(note))
    if (res === 421 || 422 || 423) {
      icon = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
      heading = `Empty Field`;
      message = `You've Left ${field} Field Empty!`;
    } 
    if (res === 200) {
      icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
      heading = `Note Added`;
      message = `Yours Note Has Been Added Successfully!`;
    }
    function openNotification() {
      notification.open({
        icon : icon,
        message: heading,
        description: message
      });
    };
    openNotification();
  }

  return (
    <div style={{ width: '650px', margin: 'auto' }}>
      <Typography.Title level={4}>
          Add Note
      </Typography.Title>
      <Form 
        name="nest-messages"
      >
        <Input 
          name='title'
          value={note.title}
          onChange={onChange}
          placeholder="title" 
        />
        <Input
          className='styleMargin'
          type="description"
          name='description'
          value={note.description}
          onChange={onChange}
          placeholder="description"
        />
        <Input
          className='styleMargin'
          type="category"
          name='category'
          value={note.category}
          onChange={onChange}
          placeholder="Category"
        />
        <Button
          type="primary" 
          htmlType="submit"
          onClick={addTodo} 
          className="login-form-button styleMargin"
        >
          Add Note
        </Button>
      </Form>
    </div>
  )
}
