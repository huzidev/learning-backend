import React, { useContext, useState } from 'react'
import DataContext from "../../../Context/DataContext";
import layout from '../../../Layout/Layout';
import { Button, Form, Input } from 'antd';
import { DataType } from './Type';

export default function AddTodo(): JSX.Element {
    const context = useContext(DataContext);
    const {setNotes, notes} = context;
    const [note, setNote] = useState<DataType>({
      title: "", 
      description: "", 
      category: ""
    })

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
      window.location.reload()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
    <div>
      <h1>
          Add Todo Note
      </h1>
      <Form 
          {...layout} 
          name="nest-messages" 
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
