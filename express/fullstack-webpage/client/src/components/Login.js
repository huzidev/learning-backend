import React from 'react';

export default function Login() {

    const [user, setUser] = React.useState({
        username : "",
        email : "",
        password : "",
    });

    return (
        <div>
            <h1>
                Login Page
            </h1>
            <br />
            <form >
                <input 
                    type="text" 
                    placeholder="Username or Email"
                />
                <input 
                    type="password" 
                    placeholder="yours password"
                />
                <input 
                    type="submit"
                    name="login"
                    value="Login"
                />
            </form>
        </div>
    )
}
