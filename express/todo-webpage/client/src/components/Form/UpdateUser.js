import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {

    const  { id } = useParams();
    const Navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');


    React.useEffect(() => {
        const getDataById = async () => {
            const {data} = await fetch(`/updateuser/${id}`, {
            method : 'GET',
            headers : {
                "Accept" : "application/json",
                "auth-token": localStorage.getItem('jwtoken')
            },
        })
            console.log(data);
            setUsername(data.username)
            setEmail(data.email)
            setNumber(data.number)
        }
    }, [id])

    const updateHandler = async (event) => {

        event.preventDefault();
    
        const data = {
            username : username,
            email : email,
            number : number,
        }

    await fetch(`/updateuser/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('jwtoken')
        },
    }, data);
    Navigate({
        pathname : '/about',
        search : `?name=${username}`,
        state : { detail : Response.data }
    });
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
            <button onClick={updateHandler}>

            </button>
        </form>
    </div>
  )
}
