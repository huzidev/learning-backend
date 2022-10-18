import React, {useContext, useEffect, useState} from 'react';
import DataContext from "../Context/DataContext";

export default function AddTodo() {
    const Context = useContext(DataContext);
    const { addNote, getNotes, notes } = Context;

    console.log("What is notes", notes);

    const [note, setNote] = useState({
        title: "", 
        description: "", 
        category: ""
    })

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.category);
        setNote({
            title: "", 
            description: "", 
            category: ""
        })
    }

    useEffect(() => {
        if (localStorage.getItem('jwtoken')) {
            getNotes();
        }
    }, [])



    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
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
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
        <h1>
            Yours Notes
        </h1>
       {notes.map((data) => {
        return (
            <>
                <h1>
                    Tittle: {data.title}
                </h1>
                <h3>
                    Description: {data.description}
                </h3>
                <h5>
                    Category: {data.category}
                </h5>
            </>
        )
       })

       }
    </div>
  )
}
