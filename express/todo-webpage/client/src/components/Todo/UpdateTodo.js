import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from "../Context/DataContext";


export default function UpdateTodo() {

    const Context = useContext(DataContext);
    const { addNote, getNotes, notes, deleteNote, editNote } = Context;

    const [note, setNote] = useState({
        title: "", 
        description: "", 
        category: ""
    })

    const ref = useRef(null)
    const refClose = useRef(null)
    const [updateNote, setUpdateNote] = useState({id: "", etitle: "", edescription: "", ecategory: ""})

    const updateNoteFunc = (currentNote) => {
        ref.current.click();
        setUpdateNote({
            id: currentNote._id, 
            etitle: currentNote.title, 
            edescription: currentNote.description, 
            ecategory: currentNote.category
        })
    }

    const handleClickForUpdate = (e)=>{ 
        editNote(
            updateNote.id, 
            updateNote.etitle, 
            updateNote.edescription, 
            updateNote.ecategory)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({
            ...note, 
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
        <h1>
            UpdateTodo
        </h1>
        <form>
            <input 
                type="text"
                name='title' 
                value={updateNote.etitle}
                onChange={onChange}
                placeholder='Update Yours Todo Tittle'
                required 
            />
            <input 
                type="text"
                name='description' 
                value={updateNote.edescription}
                onChange={onChange}
                placeholder='Update Yours Todo Description'
                required 
            />
            <input 
                type="text"
                name='category' 
                value={updateNote.ecategory}
                onChange={onChange}
                placeholder='Update Yours Todo category'
                required 
            />
            <button onClick={handleClickForUpdate}>
                Update Todo
            </button>
        </form>
    </div>
  )
}
