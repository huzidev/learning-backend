import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext';

export default function UpdateUser() {


    const context = useContext(DataContext);
  const Navigate = useNavigate();
  const { userData } = context;

  const [data, setData] = useState({id: "", eusername: "", eemail: "", enumber: ""})

  return (
    <div>
        <h1>
            Update User's Info
        </h1>
        <form>
            <input 
                type="text"
                name='eusername'
                value={data.eusername}
                onChange={(event) => setUsername(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='eemail'
                value={data.eemail}
                onChange={(event) => setEmail(event.target.value)}
                required 
            />
            <input 
                type="text"
                name='enumber'
                value={data.enumber}
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
