import React from "react";

export default function Sidebar(props) {

    const noteElements = props.notes.map((note, index) => ( 
        // props.notes.map MEANS it is been taking some ARRAY of NOTES and mapping it into ours CONST variables called NoteElements then we'll assign this NoteElements in to bottom inside {}

        <div key={note.id}>

            <div
                
                className={`title ${
                    
                    note.id === props.currentNote.id ? "selected-note" : "" 
                    // if note.id is === CurrentNote.id then ClassName will be selected-note and background will be specific as we've assigned it to selected note in ours CSS else : there will be no class 

                }`}

                onClick={() => props.setCurrentNoteId(note.id)} 
                // ON ONCLICK it'll changes Current Note id to that notes id on which we've CLICKED so we the color of that note changes each time and we'll see all different text and information about that specific note

            >

                <h4 className="text-snippet">Note {index + 1}</h4>

            </div>

        </div>

    ))

    return (

        <section className="pane sidebar">

            <div className="sidebar--header">

                <h3>Notes</h3>

                <button className="new-note" onClick={props.newNote}>+</button>

            </div>

            {noteElements}

        </section>

    )
}
