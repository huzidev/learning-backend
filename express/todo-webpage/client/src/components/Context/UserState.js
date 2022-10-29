import React from 'react';
import DataContext from './DataContext';

export default function UserState(props) {
  const initialState = []
  const [notes, setNotes] = React.useState(initialState)
  const [userData, setUserData] = React.useState({})

//   interface DataTypeN {
//     id: number
//     number: number
//     image: string
//   }

//   interface DataType extends DataTypeN {
//     username: string
//     email: string
//     title: string
//     description: string
//     category: string
//   }

  let bearer = localStorage.getItem('jwtoken');

  async function getNotes() {
    const res = await fetch('/allnotes', {
        method : 'GET',
        headers: {
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem('jwtoken')
        }
    })
    const data = await res.json();
    setNotes(data)
  }

  async function deleteNote(id) {
    try {
        const res = await fetch(`/deletenote/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type" : "application/json",
                "auth-token": localStorage.getItem('jwtoken')
            })
        })
        const data = res.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        console.log("Delete note with id", id);
    } catch (err) {
        console.log(err);
    }
  }

  async function editNote({id, title, description, category}) {
    try {
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type" : "application/json",
                "auth-token": bearer
            }),
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
            headers: new Headers({
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            }),
            credentials : "include"
        })
        const data = await res.json();
        setUserData(data);

        if (res.status !== 200) {
            const error = new Error()
            throw error;
        }
    } catch (err) {
        console.log(err);
    }
  }
  React.useEffect(() => {
    if (bearer) {
        about();
    }
  }, [])

  return (
    <div>
        {/* if we just use value={userData} then we simply uses context.email */}
        {/* if use value={{ userData }} multiple brackets then we've to use context.userData.email */}
        {/* {{}} multiple brackets are used when we've to pass multiple values like value={{ userData, notes }} */}
        <DataContext.Provider value={{ userData, getNotes, editNote, deleteNote, notes, setNotes }}>
            {props.children}
        </DataContext.Provider>
    </div>
  )
}
