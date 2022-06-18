import React from "react";
import Sidebar from "./SideBar";
import Editor from "./Editor";
// import { Data } from "./Data";
import Split from "react-split"; // split a library which helps us to split and rearrange ours page easily like here we've created a sidebar which splits ours screen to half
import {nanoid} from "nanoid";


export default function App() {

    const [notes, setNotes] = React.useState([]) 
    // we are (initializing) ours notes into an EMPTY ARRAY

    const [currentNoteId, setCurrentNoteId] = React.useState(

        (notes[0] && notes[0].id) || "" 
         // since we are in an empty array therefore here we've says notes at index 0 && notes at index 0's ID because if there is NO notes it'll through error undefined OR empty string

    )
    
    function createNewNote() {

        const newNote = { 
            // we've made it an OBJECT {} because we've to provide it an ID and an BODY text in brief we've to provide it multiple features therefore OBJECT
 
            id: nanoid(), 
            // will create and UNIQUE id for us and we basically IMPORT nanoid from react libraries

            body: "# Type your markdown note's title here" 
            // THE BY DEFAULT TEXT FOR EACH NEW NOTE

        }

        setNotes(prevNotes => [newNote, ...prevNotes]) 
        // initially empty array will take all the prev notes data therefore we've used ... and (NEW NOTE) the function we've already created
        
        setCurrentNoteId(newNote.id) 
        // would sets ours current note id the note which we are updating to newNote.ID IN BRIEF it'll simply provide new id to ours new note which is current note (we called it current note because we are updating it currently)

    }
    
    function updateNote(text) { 
        // will simply state and saves any changes

        setNotes(oldNotes => oldNotes.map(oldNote => { 
            // SET NOTES form initially empty array

            return oldNote.id === currentNoteId

                ? { ...oldNote, body: text } 
                // body text so new update can be saved in the form of text in body part

                : oldNote

        }))

    }
    
    function findCurrentNote() { 
        // will helps us to find WHAT the current note is as we are passing it as a prop in ours JSX

        return notes.find(note => {
            
            return note.id === currentNoteId

        }) || notes[0]

    }
    
    return (
        <main>

        { 
        // we've used this {} because we are using TERNARY OPERATORS inside it

            notes.length > 0 
            // we are passing TERNARY OPERATORS here we says if notes lenth is greater than zero means there are some notes then do all functions else wise : print default text

            ?

            <Split  
            // SPLIT IS JUST A PART OF OURS REACT LIBRARY WHICH WE'VE IMPORTED ALREADY

                sizes={[30, 70]} 

                direction="horizontal" 

                className="split"

            >
                <Sidebar

                    notes={notes}

                    currentNote={findCurrentNote()} 
                    // here we can see we are passing FindCurrentNote as props

                    setCurrentNoteId={setCurrentNoteId}

                    newNote={createNewNote}

                />
                {

                    currentNoteId && 

                    notes.length > 0 &&

                    <Editor 

                        currentNote={findCurrentNote()}  
                        // here we can see we are passing FindCurrentNote as props

                        updateNote={updateNote} 

                    />
                }

            </Split>

            :

            <div className="no-notes">

                <h1>You have no notes</h1>

                <button 

                    className="first-note" 

                    onClick={createNewNote} 
                    // when there is no notes we'll print the button for creating new note

                >

                    Create one now

                </button>

            </div>
            
        }

        </main>
    )
}
