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
  return (
    <div>
    </div>
  )
}
