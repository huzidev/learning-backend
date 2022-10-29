import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from "../Context/DataContext";
import { Button, Checkbox, Form, Input, Typography } from 'antd';

export default function AddTodo(): JSX.Element {

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 8,
        },
    };

    const context = useContext(DataContext);
    const {addNote, setNotes, notes} = context;
    interface Type {
        title: string,
        description: string,
        category: string,
    }
    const [note, setNote] = useState({title: "", description: "", category: ""})

    
    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        const {title, description, category} = note

        const res = await fetch(`/addnote`, {
            method : "POST",
            headers : {
              "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                title,
                description,
                category
            })
          });
          const data = await res.json()
          setNotes(notes.concat(data));
        console.log("note", note);
        setNote({title: "", description: "", category: ""})
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const options = [
        { label: "fruit", value: "fruit"},
        { label: "tool", value: "tool" },
        { label: "book", value: "book" },
      ];

      const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };

  return (
    <div>
        <h1>
            Add Todo Note
        </h1>
        <Form 
            {...layout} 
            name="nest-messages" 
            onFinish={onFinish} 
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input note title!',
              },
            ]}
          >
            <Input 
              name='title'
              value={note.title}
              onChange={onChange}
              placeholder="title" 
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input note description!',
              },
            ]}
          >
            <Input
              type="description"
              name='description'
              value={note.description}
              onChange={onChange}
              placeholder="description"
            />
          </Form.Item>
            {
                options.map((data) => (
                    <>
                        <input 
                            type='radio'
                            name='category'
                            value={data.value}
                            onChange={onChange}
                        />
                            {data.label}
                    </>
                ))
            }
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={addTodo} 
              className="login-form-button"
            >
              Add Note
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}
