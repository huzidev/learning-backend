import React, { useState } from 'react'
import { ExclamationCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import { Button, Form, Input, Typography, notification } from 'antd';
import { DataType } from './Type';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { addThisNote, addNoteAction } from '../../../../store/notes/AddNote/addNoteSlice';

export default function AddTodo(): JSX.Element {
  const noteRes = useAppSelector(state => state.addnote)
  const dispatch = useAppDispatch();
  let res: number | null = noteRes.res
  const [note, setNote] = useState<DataType>({
    title: "", 
    description: "", 
    category: "",
    isCompleted: false
  })

  let icon: React.ReactNode;
  let heading: string;
  let message: string | null;
  let holdType: string;
  const { title, description, category } = note;

  if (title === "") {
    dispatch(addNoteAction.receiveTEst(421))
    holdType = "Title"
  } else if (description === "") {
    dispatch(addNoteAction.receiveTEst(422))
    holdType = "Description"
  } else if (category === "") {
    dispatch(addNoteAction.receiveTEst(423))
    holdType = "Category"
  } else {
    dispatch(addNoteAction.receiveTEst(200))
  }

  console.log("what is res status", res);
  
  
  const addTodo = async () => {
    dispatch(addThisNote(note))
    // const {title, description, category, isCompleted} = note
    // const res = await fetch(`/addnote`, {
    //   method : "POST",
    //   headers : {
    //     "Content-Type" : "application/json",
    //   },
    //   body : JSON.stringify({
    //     title,
    //     description,
    //     category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
    //     isCompleted
    //   })
    // });
    if (res === 421 || 422 || 423) {
      icon = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
      heading = `Empty Field`;
      message = `You've Left ${holdType} Field Empty!`;
    } 
    if (res === 200) {
      // const data = await res.json()
      // setNotes(notes.concat(data));
      icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
      heading = `Note Added`;
      message = `Yours Note Has Been Added Successfully!`;
    }
    async function openNotification() {
      notification.open({
        icon : icon,
        message: heading,
        description: message
      });
    };
    openNotification();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
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
