import React from 'react'

export default function UpdateUser() {

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
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='username'
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='username'
                onChange={onChange}
                required 
            />
        </form>
    </div>
  )
}
