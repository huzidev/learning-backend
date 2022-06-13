import React from 'react';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginUser = async (event) => {
        event.preventDefault();

        const res = await fetch("/login", {
            method = "POST",
            headers = {
                "Content-Type" : "application/json" // just like we make changes in POST-MAN for writing raw
            },
            body : JSON.stringify({ // since server didn't read JSON we've to send string like we did raw method in post-man
                email,
                password
            })
        })
    }

    return (
        <div>
            <form method="POST">
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
