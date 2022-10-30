import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import DataContext from "../../../Context/DataContext";
import AddTodo from '../addTodo/AddTodo';
import ShowNotes from './ShowNotes';
import { DataType } from './Type';

export default function NotesItems(props: any) {
    const Navigate = useNavigate();
    const context = useContext(DataContext);
    const [note, setNote] = useState<DataType>({ id: "", etitle: "", edescription: "", ecategory: "" })
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { notes, setNotes, getNotes, editNote } = context;
    const [items, setItems] = useState(notes)
    const [state, setState] = useState(false)
    const ref = useRef<any>(null)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (localStorage.getItem('jwtoken')) {
            getNotes()
        }
        else {
            Navigate("/login");
        }
    }, [])

    const updateNote = (currentNote: any) => {
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

    

    const handleClick = async () => {
        const { id, etitle, edescription, ecategory } = note
            try {
                const res = await fetch(`/updatenote/${id}`, {
                    method: 'PUT',
                    headers: new Headers({
                        "Content-Type" : "application/json",
                    }),
                    body: JSON.stringify({
                        title : etitle,
                        description : edescription,
                        category : ecategory
                    })
                });
        
                const data = await res.json();
        
                let newNote = JSON.parse(JSON.stringify(notes))
        
                for (let index = 0; index < newNote.length; index++) {
                    const element = newNote[index];
                    if (element._id === id) {
                        newNote[index].title = etitle;
                        newNote[index].description = edescription;
                        newNote[index].category = ecategory;
                        break; 
                    }
                    setNotes(newNote)
                }
            } catch (err) {
                console.log(err);
            }
        setIsModalOpen(false);
        window.location.reload();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote({ 
            ...note, 
            [e.target.name]: e.target.value 
        })
    }

    const allItems = [...new Set(notes.map((currentEle: any) => {
        return (
            currentEle.category
        )
    }))]


    let test = state ? items : notes

    function filterItems(items: string) {
        const updatedItems = notes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedItems)
        setState(true)
    }

    const options = [
        { label: "fruit", value: "fruit" },
        { label: "tool", value: "tool" },
        { label: "book", value: "book" }
    ];

    return (
        <div>
            <AddTodo />
            <Button style={{ display: "none" }} ref={ref} type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Update Todo" open={isModalOpen} okText="Update" cancelText="Cancel" onOk={handleClick} onCancel={handleCancel}>
                <form>
                    <input
                        type="text"
                        name='etitle'
                        value={note.etitle}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name='edescription'
                        value={note.edescription}
                        onChange={onChange}
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
            {
                notes.length === 0 ? "" : (
                    <>
                        <h1>
                            Filter the list
                        </h1>
                        <button onClick={() => setItems(notes)}>
                            All items
                        </button>
                        {allItems.map((currentEle: any) => {
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
                    </>
                )
            }
            {test.map((note: any, i: number) => {
                return <ShowNotes key={note._id} updateNote={updateNote} note={note} index={i} />
            })}
        </div>
    )
}
