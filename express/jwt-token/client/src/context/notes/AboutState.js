import React from 'react'
import AboutContext from "./aboutContext";

export default function aboutState(props) {

    const host = "http://localhost:5000"
    const dataInitial = []
    const [data, setData] = useState(dataInitial)

    const getData = async () => {
        // API Call 
        const response = await fetch(`${host}/api/about/fetchuserdata`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json() 
        setData(json)
    }

  return (

    <AboutContext.Provider value={{ data, getData }}>
      {props.children}
    </AboutContext.Provider>

  )
}
