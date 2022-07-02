import React from 'react'

export default function Register() {

    const [user, setUser] = React.useState({
        username : "",
        email : "",
        number : "",
        password : "",
        cpassword : ""
    });

    let name, value;

    function handleInput(event) {
        name = event.target.name;
        value = event.target.value;
        setUser({ 
            ...user,
            [name] : value 
        });
    }

    async function register(event) {

        // for getting rid of automatic form update
        event.preventDefault();

        const { username, email, number, password, cpassword } = user; // user state already created

        const res = await fetch('/register', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username,
                email,
                number,
                password,
                cpassword  
            })
        });

    }

    return (
        <div>
            This is registration page
            <br />
            <form >
                <input 
                    type="text"
                    name="username"
                    placeholder="username" 
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="username" 
                />
                <input 
                    type="text"
                    name="number"
                    placeholder="username" 
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="username" 
                />
                <input 
                    type="password"
                    name="cpassword"
                    placeholder="username" 
                />
                <input 
                    type="submit"
                    name="login"
                    value="Register"
                />
            </form>
        </div>
    )
}
