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
        setValue(e.target.value);
      };

    const onChange = (e)=>{
        setNote({
            ...note, 
            [e.target.name]: e.target.value
        })
    }


    // const options = [
    //     { label: "fruit", value: "fruit"},
    //     { label: "tool", value: "tool" },
    //     { label: "book", value: "book" },
    //   ];

    if (Radio.value === 1) {
        note.category.valueOf = 'fruit' 
    } else if (Radio.value === 2) {
        note.category.valueOf = 'tool' 
    } else if (Radio.value === 3) {
        note.category.valueOf = 'book' 
    }

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
            <input 
                type="text"
                name='category' 
                value={note.category}
                onChange={onChange}
                minLength= {5}
                placeholder='Enter Yours Todo category'
                required 
            />
             <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio 
                    name="category"
                    value="fruit"
                >
                    Fruit
                </Radio>
                <Radio 
                    name="category"
                    value="book"
                >
                    Book
                </Radio>
                <Radio 
                    name="category"
                    value="tool"
                >
                    tools
                </Radio>
            </Radio.Group>
            {/* {
                options.map((data, index) => (
                    <Radio 
                        name='category'
                        value={index + 1}
                        onChange={onChangeRadio}
                    >
                        {data.label}
                    </Radio>
                ))
            } */}
            <button onClick={handleClick}>
                Add Todo
            </button>
        </form>
    </div>
  )
}
