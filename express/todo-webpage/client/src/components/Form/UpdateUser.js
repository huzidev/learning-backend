import React from 'react'

export default function UpdateUser() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

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
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='email'
                value={username}
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='number'
                value={username}
                onChange={onChange}
                required 
            />
        </form>
    </div>
  )
}
