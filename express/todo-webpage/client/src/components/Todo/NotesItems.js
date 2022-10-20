import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import AddTodo from './AddTodo';
import ShowNotes from './ShowNotes';
import UpdateTodo from './UpdateTodo';

export default function NotesItems(props) {
    const Location = useLocation();
  const context = useContext(DataContext);
  const Navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
      if (localStorage.getItem('jwtoken')) { // means if their is not jwt token for authentication then simply navigate to login page
          getNotes()
      }
      else{
          Navigate("/login");
      }
      // eslint-disable-next-line
  }, [])
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
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <AddTodo />
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
        {notes.map((note) => {
            return <ShowNotes key={note._id} updateNote={updateNote} note={note} />
        })}
    </div>
  )
}
