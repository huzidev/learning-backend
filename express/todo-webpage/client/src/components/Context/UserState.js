import React from 'react';
import DataContext from './DataContext';

export default function UserState(props) {
  const host = "http://localhost:8000"
  const initialState = []
  const [notes, setNotes] = React.useState(initialState)
  const [userData, setUserData] = React.useState({})

  async function getNotes() {
    const res = await fetch('/allnotes', {
        method : 'GET',
            headers : {
                "Accept" : "application/json",
                "auth-token": localStorage.getItem('jwtoken')
            },
    })
    const data = await res.json();
    setNotes(data)
  }

  async function addNote(title, description, category) {
    try {
        const res = await fetch(`/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "auth-token": localStorage.getItem('jwtoken')
            },
            body: JSON.stringify({ title, description, category })
        })
        const note = await res.json();
        setNotes(notes.concat(note))
        if (!res.status === 200) {
            window.alert("No New Note added")
            const error = new Error(res.error)
            throw error;
        }
    } catch (err) {
        console.log(err);
    }   
  }

  async function deleteNote(id) {
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

  async function editNote(id, title, description, category) {
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
            const error = new Error(res.error)
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
        <DataContext.Provider value={{ userData, addNote, getNotes, editNote, deleteNote, notes }}>
            {props.children}
        </DataContext.Provider>
    </div>
  )
}
