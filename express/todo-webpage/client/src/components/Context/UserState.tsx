import React from 'react';
import DataContext from './DataContext';

export default function UserState(props: any) {
  const host = "http://localhost:8000"
  const initialState: [] = []
  const [notes, setNotes] = React.useState(initialState)
  const [completedNotes, setCompletedNotes] = React.useState(initialState)
  const [userData, setUserData] = React.useState({})

  interface DataTypeN {
    id: number
    number: number
    image: string
  }

  interface DataType extends DataTypeN {
    username: string
    email: string
    title: string
    description: string
    category: string
    isCompleted: boolean
  }

  let bearer = localStorage.getItem('jwtoken');

  async function getNotes() {
    const res = await fetch('/allnotes', {
        method : 'GET',
            headers : {
                "Accept" : "application/json",
                "auth-token": bearer
            },
    })
    const data = await res.json();
    setNotes(data)
  }

  async function addNote({title, description, category, isCompleted}: DataType) {
    try {
        const res = await fetch(`/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "auth-token": localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({ title, description, category, isCompleted })
        })
        const note = await res.json();
        setNotes(notes.concat(note))
        if (!res.status === 200) {
            window.alert("No New Note added")
            const error = new Error()
            throw error;
        }
    } catch (err) {
        console.log(err);
    }   
  }

  async function deleteNote(id: DataTypeN) {
    try {
        const res = await fetch(`/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('jwtoken')
            }
        })
        const data = res.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        console.log("Delete note with id", id);
    } catch (err) {
        console.log(err);
    }
  }
  
  async function compNote({id, isCompleted}: DataType) {
    try {
        const res = await fetch(`/completed/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({isCompleted})
        });

        const data = await res.json();

        let newNote = JSON.parse(JSON.stringify(notes))
        setNotes({...notes,  isCompleted: !notes.isCompleted})
    } catch (err) {
        console.log(err);
    }
  }

  async function editNote({id, title, description, category}: DataType) {
    try {
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({title, description, category})
        });

        const data = await res.json();

        let newNote = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].category = category;
                break; 
            }
            setNotes(newNote)
        }
    } catch (err) {
        console.log(err);
    }
  }

  async function updateUser({id, username, email, number, image}: DataType) {
    try {
        const res = await fetch(`/updateuser/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({username, email, number, image})
        });

        const data = await res.json();

        let newData = JSON.parse(JSON.stringify(userData))

        for (let index = 0; index < newData.length; index++) {
            const element = newData[index];
            if (element._id === id) {
                newData[index].username = username;
                newData[index].email = email;
                newData[index].number = number;
                newData[index].image = image;
                break; 
            }
            setUserData(newData)
        }
    } catch (err) {
        console.log(err);
    }
  }

  async function about() {
    try {
        const res = await fetch('/about', {
            method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
            credentials : "include"
        })
        const data = await res.json();
        setUserData(data);

        if (!res.status === 200) {
            const error = new Error()
            throw error;
        }
    } catch (err) {
        console.log(err);
    }
  }
  React.useEffect(() => {
    if (localStorage.getItem('jwtoken')) {
        about();
    }
  }, [])

  return (
    <div>
        {/* if we just use value={userData} then we simply uses context.email */}
        {/* if use value={{ userData }} multiple brackets then we've to use context.userData.email */}
        {/* {{}} multiple brackets are used when we've to pass multiple values like value={{ userData, notes }} */}
        <DataContext.Provider value={{ userData, addNote, getNotes, editNote, deleteNote, notes, setNotes, updateUser, compNote }}>
            {props.children}
        </DataContext.Provider>
    </div>
  )
}
