import React from 'react'

export default function UpdateUser() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');


    React.useEffect(() => {
        const getDataById = async () => {
            const {data} = await fetch(`/updateuser/${id}`)
            console.log(data);
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
          }
    }, [])

  return (
    <div>
        <h1>
            Update User's Info
        </h1>
        <form>
            <input 
                type="text"
                name='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='email'
                value={username}
                onChange={(event) => setEmail(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='number'
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                required 
            />
        </form>
    </div>
  )
}
