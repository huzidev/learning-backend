import { reset } from 'nodemon';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginUser = async (event) => {
        event.preventDefault();

        const res = await fetch("/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json" // just like we make changes in POST-MAN for writing raw
            },
            body : JSON.stringify({ // since server didn't read JSON we've to send string like we did raw method in post-man
                email, // since key and property both are same
                password
            })
        });

        const data = res.json(); // for getting user data

        if ( res.status === 400 || reset.status === 422 || !data ) {
            
        }

    }

    return (
        <div>
            <form method="POST"> 
            {/* didn't need to use action method here */}
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="email" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <input 
                    type="submit"
                    name="login"
                    value="log in"
                    onClick={loginUser}
                 />
            </form>
        </div>
    )
}
