import React from 'react'

export default function UpdateUser() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');


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
                onChange={(event) => setTitle(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='email'
                value={username}
                onChange={(event) => setTitle(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='number'
                value={number}
                onChange={(event) => setTitle(event.target.value)}
                required 
            />
        </form>
    </div>
  )
}
