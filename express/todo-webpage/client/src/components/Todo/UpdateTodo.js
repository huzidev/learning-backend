import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from "../Context/DataContext";


export default function UpdateTodo() {

    const context = useContext(DataContext);
  const Navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", ecategory: ""})

  const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, ecategory:currentNote.category})
  }

  const handleClick = (e)=>{ 
      editNote(note.id, note.etitle, note.edescription, note.ecategory)
      refClose.current.click();
      Navigate('/addnote')
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
        <div ref={ref}>
            <h1>
                Update Todo
            </h1>
            <form>
                <input 
                    type="text"
                    name='etitle' 
                    value={note.etitle}
                    onChange={onChange}
                    placeholder='Update Yours Todo Tittle'
                    required 
                    />
                <input 
                    type="text"
                    name='edescription' 
                    value={note.edescription}
                    onChange={onChange}
                    placeholder='Update Yours Todo Description'
                    required 
                    />
                <input 
                    type="text"
                    name='ecategory' 
                    value={note.ecategory}
                    onChange={onChange}
                    placeholder='Update Yours Todo category'
                    required 
                    />
                <button onClick={handleClick}>
                    Update Todo
                </button>
            </form>
        </div>
    </div>
  )
}
