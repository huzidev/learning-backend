import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from "../Context/DataContext";


export default function AddTodo(): JSX.Element {
    const context = useContext(DataContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", category: "", isCompleted: false})

    interface Test {
        
    }

    const handleClick = (e: React.FormEvent)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.category, note.isCompleted);
        setNote({title: "", description: "", category: ""})
        window.location.reload()
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
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
