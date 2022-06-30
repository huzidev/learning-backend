import React from 'react'

export default function aboutState() {

    const host = "http://localhost:5000"
    // const dataInitial = []
    // const [data, setData] = useState(dataInitial)

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
        getData(json)
    }

  return (
  )
}
