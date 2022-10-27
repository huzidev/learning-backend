import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from "../Context/DataContext";
import { useHistory, useParams } from 'react-router-dom';
import NotesItems from './NotesItems';
import { Button, Checkbox } from 'antd';

export default function ShowNotes(props: any): JSX.Element {

    const history = useHistory();

    const context = useContext(DataContext);
    const { deleteNote, compNote } = context;
    const { note, updateNote, index } = props;

    function del() {
        deleteNote(note._id);
        window.alert("Note Deleted Successfully!");
        window.location.reload();
    }

    console.log("Data", note);

    function stateReg() {
        compNote(note._id);
        window.alert("State Updated Successfully!");
    }

    const [checked, setChecked] = useState(true);

      const onChange = (e: any) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
      };

    const test = !note.isCompleted ? "Hello World" : "True"
      
      React.useEffect(() => {
          if (note.isCompleted === true) {
              setChecked(true)
          } else if (note.isCompleted === false) {
              setChecked(false)
          }
      }, [setChecked])

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
        <h1>
            {test}
        </h1>
        <Checkbox checked={checked} onClick={stateReg} onChange={onChange}>
            Task Completed
        </Checkbox>
        <hr />
    </div>
  )
}
