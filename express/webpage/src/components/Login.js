import React from 'react';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div>
            <form action="/secret" method="post">
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}
