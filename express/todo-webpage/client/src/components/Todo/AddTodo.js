import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import ShowNotes from './ShowNotes';
import { Checkbox } from 'antd';


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

    const options = [
        { label: "fruit", value: "fruit"},
        { label: "tool", value: "tool" },
        { label: "book", value: "book" },
      ];

      const [checkState, setCheckState] = useState(false)

    if (Checkbox.value === 'fruit') {
        note.category.valueOf = 'fruit' 
    } else if (Checkbox.value === 'tool') {
        note.category.valueOf = 'tool' 
    } else if (Checkbox.value === 'book') {
        note.category.valueOf = 'book' 
    }

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
            {
                options.map((data) => (
                    <Checkbox 
                        name='category'
                        value={data.value}
                        onChange={onChange}
                    >
                        {data.label}
                    </Checkbox>
                ))
            }
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
