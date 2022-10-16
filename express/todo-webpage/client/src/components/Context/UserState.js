import React from 'react';
import DataContext from './DataContext';

export default function UserState(props) {
  const [userData, setUserData] = React.useState({})

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
        <DataContext.Provider value={{userData}}>
            {props.children}
        </DataContext.Provider>
    </div>
  )
}
