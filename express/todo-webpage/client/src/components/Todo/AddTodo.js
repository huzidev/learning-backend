import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import ShowNotes from './ShowNotes';

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
            <input 
                id="radio"
                type="radio"
                name="fruit"
                onChange={onChange}
            />
            <label htmlFor="radio">
                fruit
            </label>
            <input 
                id="radio"
                type="radio"
                name="tool"
                onChange={onChange}
            />
            <label htmlFor="radio">
                tool
            </label>
            <input 
                id="radio"
                type="radio"
                name="book"
                onChange={onChange}
            />
            <label htmlFor="radio">
                book
            </label>
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
