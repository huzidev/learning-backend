import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import ShowNotes from './ShowNotes';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Radio  } from 'antd';

export default function AddTodo() {
    const context = useContext(DataContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", category: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.category);
        setNote({title: "", description: "", category: ""})
    }

    const onChange = (e)=>{
        setNote({
            ...note, 
            [e.target.name]: e.target.value
        })
    }

    const menu = (
        <Menu
          items={[
            {
              label: <a href="https://www.antgroup.com">1st menu item</a>,
              key: '0',
            },
            {
              label: <a href="https://www.aliyun.com">2nd menu item</a>,
              key: '1',
            },
            {
              label: '3rd menu item',
              key: '3',
            },
          ]}
        />
      );
  return (
    <div>
        <h1>
            Add Todo Note
        </h1>

        <form>
            <input 
                type="text"
                name='title' 
                value={note.title}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo Tittle'
                required 
            />
            <input 
                type="text"
                name='description' 
                value={note.description}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo Description'
                required 
            />
            <input 
                type="text"
                name='category' 
                value={note.category}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo category'
                required 
            />
            <br />
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Please Select Category
                    <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            <input 
                id="fruit"
                type="radio"
                name="radio" // radio names have to be same so we can't select multiple radio buttons
                value="fruit"
                checked={note.name}
                onChange={onChange}
            />
            <label htmlFor="fruit">
                fruit
            </label>
            <input 
                id="tool"
                type="radio"
                name="radio"
                value="tool"
                checked={note.name}
                onChange={onChange}
            />
            <label htmlFor="tool">
                tool
            </label>
            <input 
                id="book"
                type="radio"
                name="radio"
                value="book"
                checked={note.name}
                onChange={onChange}
            />
            <label htmlFor="book">
                book
            </label>
            <br />
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
