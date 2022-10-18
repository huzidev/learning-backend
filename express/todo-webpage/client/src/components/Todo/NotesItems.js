import React, { useContext } from 'react'
import DataContext from "../Context/DataContext";

export default function NotesItems(props) {
    const context = useContext(DataContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
  return (
    <div>
        <h5>{note.title}</h5>
        <p>{note.description}</p>
    </div>
  )
}
