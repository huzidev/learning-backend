import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from "../../../Context/DataContext";
import NotesItems from './NotesItems';
import { Button, Checkbox } from 'antd';

export default function ShowNotes(props: any): JSX.Element {

    const context = useContext(DataContext);
    const { deleteNote} = context;
    const { note, updateNote, index } = props;

    function del() {
        deleteNote(note._id);
        window.alert("Note Deleted Successfully!");
        window.location.reload();
    }

    console.log("Data", note);

    const [checked, setChecked] = useState<boolean>(true);

      const onChange = (e: any) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
      };

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
        <button onClick={() => {updateNote(note)}}>
            Update Note
        </button>
        <hr />
    </div>
  )
}
