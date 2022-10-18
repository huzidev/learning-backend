import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from "../Context/DataContext";
import { useNavigate } from 'react-router-dom';
import NotesItems from './NotesItems';

export default function ShowNotes() {

  const context = useContext(DataContext);
  const Navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
      if (localStorage.getItem('jwtoken')) {
          getNotes()
        }
        else{
            Navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <h1>
            Yours Notes
        </h1>
        <div >
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <NotesItems key={note._id} note={note} />
            })}
        </div>
    </div>
  )
}
