import React, {useContext, useState} from 'react';
import DataContext from "../Context/DataContext";

export default function AddTodo() {
    const Context = useContext(DataContext);
    const { addNote } = Context;

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

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
    </div>
  )
}
