import React, { useContext, useState } from 'react'
import DataContext from "../../../Context/DataContext";
import { ExclamationCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { DataType } from './Type';

export default function AddTodo(): JSX.Element {
    const context = useContext(DataContext);
    const {setNotes, notes} = context;
    const [note, setNote] = useState<DataType>({
      title: "", 
      description: "", 
      category: "",
      isCompleted: false
    })

    let icon : any
    let title: String;
    let description: String | null;

    const addTodo = async (e: React.FormEvent) => {
      e.preventDefault();
      const {title, description, category, isCompleted} = note
      const res = await fetch(`/addnote`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          title,
          description,
          category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
          isCompleted
        })
      });
      if (res.status === 404) {
        icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
        title = `Server Error`;
        description = `Failed To Signin, Internal Server Error!`;
      }
      else {  
        const data = await res.json()
        setNotes(notes.concat(data));
        icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
        title = `Server Error`;
        description = `Failed To Signin, Internal Server Error!`;
      }
      async function openNotification() {
        notification.open({
          icon : icon,
          message: title,
          description: description
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
