import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal, Select  } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../Context/DataContext";
import AddTodo from './AddTodo';
import ShowNotes from './ShowNotes';

export default function NotesItems(props) {
    const { Option } = Select;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const Location = useLocation();
  const context = useContext(DataContext);
  const Navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
      if (localStorage.getItem('jwtoken')) {
          getNotes()
        }
        else{
            Navigate("/login");
        }
    }, [])

    // null is the initial value
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", ecategory: ""})
    
    const updateNote = (currentNote) => {

        // ref.current.click() checks if user clicked or not therefore we've passed the ref in the button of modal as ref={ref}
        // to check if user clicked or not
        // ref.current.value gets the value
        // ref.current.click() checks the click
        ref.current.click();
        setNote({
            id: currentNote._id, 
            etitle: currentNote.title, 
            edescription: currentNote.description, 
            ecategory: currentNote.category
        })
    }
    
    const handleClick = (e)=>{ 
        setIsModalOpen(false);
        editNote(note.id, note.etitle, note.edescription, note.ecategory)
      window.location.reload();
    }
    
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  
    const allItems = [...new Set(notes.map((currentEle) => {
        return (
            currentEle.category
        )
    }))]
    
    const [items, setItems] = useState(notes)
    const [state, setState] = useState(false)
    
    let test = state ? items : notes

    function filterItems(items) {

    const updatedItems = notes.filter((element) => {
        // element.category targets category only ex: grocery, payments and bills
        return element.category === items
    })

    setItems(updatedItems)
    setState(true)
  }

  const options = [
    { label: "fruit", value: "fruit"},
    { label: "tool", value: "tool" },
    { label: "book", value: "book" },
  ];

  return (
      <div>
      <AddTodo />
      <Button style={{display: "none" }} ref={ref} type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Update Todo" open={isModalOpen} okText="Update" cancelText="Cancel" onOk={handleClick} onCancel={handleCancel}>
        <form>
            <input 
                type="text"
                name='etitle' 
                value={note.etitle}
                onChange={onChange}
                required 
                />
            <input  
                type="text"
                name='edescription' 
                value={note.edescription}
                onChange={onChange}
                required 
                />
            {
                options.map((data) => (
                    <>
                        <input 
                            type='radio'
                            name='ecategory'
                            value={data.value}
                            onChange={onChange}
                        />
                            {data.label}
                    </>
                ))
            }
        </form>
      </Modal>
        <h1>
            Yours Notes
        </h1>
        <h1>
            Filter the list
        </h1>
        <button onClick={() => setItems(notes)}>
            All items
        </button>
        {allItems.map((currentEle) => {
            return (
                <>
                <button
                    onClick={() => filterItems(currentEle)}
                >
                    {currentEle}
                </button>
                </>
            )
        })}
        {/* <button onClick={() => setItems(notes)}>
            All items
        </button>
        <button onClick={() => filterItems('fruit')}>
            fruit
        </button>
        <button onClick={() => filterItems('tool')}>
            tool
        </button>
        <button onClick={() => filterItems('book')}>
            book
        </button> */}
        <hr />
        {/* {!state ? notes.map((note, i) => {
            return <ShowNotes key={note._id} updateNote={updateNote} note={note} index={i} />
        }) : items.map((note, i) => {
            return <ShowNotes key={note._id} updateNote={updateNote} note={note} index={i} />
        })} */}
        {test.map((note, i) => {
            return <ShowNotes key={note._id} updateNote={updateNote} note={note} index={i} />
        }) }
    </div>
  )
}
