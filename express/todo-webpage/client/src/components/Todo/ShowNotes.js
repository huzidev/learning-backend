import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from "../Context/DataContext";
import { useNavigate, useParams } from 'react-router-dom';
import NotesItems from './NotesItems';

export default function ShowNotes(props) {

    const Navigate = useNavigate();

    let { id } = useParams();


    const initialState = []
    const [completedNotes, setCompletedNotes] = React.useState(initialState)

    const context = useContext(DataContext);
    const { deleteNote } = context;
    const { note, updateNote, index } = props;

    function del() {
        deleteNote(note._id);
        window.alert("Note Deleted Successfully!");
        window.location.reload();
    }

    function taskManager() {
        setCompletedNotes({
            ...completedNotes,
        })
    }

  return (
    <div>
        <h1>
            Note Number : {index + 1}
        </h1>
        <h1>
            Title: {note.title}
        </h1>
        <h3>
            Description: {note.description}
        </h3> 
        <h3>
            Category: {note.category}
        </h3>
        <button onClick={del}>
            Delete
        </button>
        <button onClick={()=>{updateNote(note)}}>
            Update Note
        </button>
        <input 
            id='check'
            type="checkbox"
        />
        <label htmlFor="check">Task Completed</label>
        <hr />
    </div>
  )
}
