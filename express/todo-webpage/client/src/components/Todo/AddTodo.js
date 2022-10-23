import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import ShowNotes from './ShowNotes';
import { Radio  } from 'antd';


export default function AddTodo() {
    const context = useContext(DataContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", category: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.category);
        setNote({title: "", description: "", category: ""})
    }
    const [value, setValue] = useState(1);

    const onChangeRadio = (e) => {
        setValue(
            e.target.value
        );
      };

    const onChange = (e)=>{
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }


    const options = [
        { label: "fruit", value: "fruit"},
        { label: "tool", value: "tool" },
        { label: "book", value: "book" },
      ];

    // if (Radio.value === 'fruit') {
    //     // note.category.valueOf = 'fruit' 
    //     setNote({...note, category:"fruit"})
    // } else if (Radio.value === 'tool') {
    //     // note.category.valueOf = 'tool' 
    //     setNote({...note, category:"fruit"})
    // } else if (Radio.value === 'book') {
    //     // note.category.valueOf = 'book' 
    //     setNote({...note, category:"fruit"})
    // }

  return (
    <div>
        <h1>
            Add Todo Note
        </h1>

        <form>
            <input 
                type="text"
                name='title' 
                value={note.title}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo Tittle'
                required 
            />
            <input 
                type="text"
                name='description' 
                value={note.description}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo Description'
                required 
            />
            {
                options.map((data) => (
                    <>
                        <input 
                            type='radio'
                            name='category'
                            value={data.value}
                            onChange={onChange}
                        />
                            {data.label}
                    </>
                ))
            }
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
