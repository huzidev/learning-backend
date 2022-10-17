import React, {useContext, useState} from 'react';
import DataContext from "../Context/DataContext";

export default function AddTodo() {
    const Context = useContext(DataContext);
    const { addNote } = Context;
  return (
    <div>
    </div>
  )
}
