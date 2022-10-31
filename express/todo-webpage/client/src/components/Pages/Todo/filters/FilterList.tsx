import React, { useState } from 'react';
import ShowNotes from '../notes/ShowNotes';

export default function FilterList(props: any): JSX.Element {

    const [state, setState] = useState(false)
    const [items, setItems] = useState(props.notes)

    const allItems = [...new Set(props.notes.map((currentEle: any) => {
        return (
            currentEle.category
        )
    }))]

    let test = state ? items : props.notes

    function filterItems(items: string) {
        const updatedItems = props.notes.filter((element: any) => {
            // element.category targets category only ex: grocery, payments and bills
            return element.category === items
        })
        setItems(updatedItems)
        setState(true)
    }

    return (
        <div>
            <h1>
                Yours Notes
            </h1>
            {
                props.notes.length === 0 ? "No Note Added" : (
                    <>
                        <h1>
                            Filter the list
                        </h1>
                        <button onClick={() => props.setItems(props.notes)}>
                            All items
                        </button>
                        {allItems.map((currentEle: any) => {
                            return (
                                <span key={currentEle}>
                                    <button
                                        onClick={() => filterItems(currentEle)}
                                    >
                                        {currentEle}
                                    </button>
                                </span>
                            )
                        })}
                    </>
                )
            }
            {test.map((note: any, i: number) => {
                return <ShowNotes key={note._id} updateNote={props.updateNote} note={note} index={i} />
            })}
        </div>
    )
}
