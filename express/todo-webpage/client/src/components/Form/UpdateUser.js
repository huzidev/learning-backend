import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {


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
                value={email}
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
            <button onClick={updateHandler}>
                Update Data
            </button>
        </form>
    </div>
  )
}
