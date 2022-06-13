import React from 'react';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div>
            <form action="/secret" method="post">
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="email" 
                    onChange={(event) => setEmail(event.target.value)} 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}
