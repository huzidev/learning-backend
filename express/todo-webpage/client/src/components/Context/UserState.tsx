import React from 'react';
import DataContext from './DataContext';

export default function UserState(props: any) {
  const initialState: [] = []
  const initialStateComp: [] = []
  const [notes, setNotes] = React.useState(initialState)
  const [compNotes, setCompNotes] = React.useState(initialStateComp)
  const [userData, setUserData] = React.useState({})

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
      about()
  }, [])

  return (
    <div>
        {/* if we just use value={userData} then we simply uses context.email */}
        {/* if use value={{ userData }} multiple brackets then we've to use context.userData.email */}
        {/* {{}} multiple brackets are used when we've to pass multiple values like value={{ userData, notes }} */}
        <DataContext.Provider value={{ userData, notes, setNotes, setCompNotes, compNotes}}>
            {props.children}
        </DataContext.Provider>
    </div>
  )
}
