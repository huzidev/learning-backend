import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const Navigate = useNavigate();

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

        // for getting all the data
        const data = await res.json();

        if (res.status === 422) {
            window.alert("Email already exist");
        }
        else if (res.status === 423) {
            window.alert("Username already exist")
        }
        else if (res.status === 424) {
            window.alert("Number already exist")
        }
        else if (res.status === 425) {
            window.alert("Password doesn't match")
        }
        else {
            window.alert("User registered successfully!");
            console.log("Successful Registration");
            Navigate("/login");
        }

    }

    return (
        <div>
            This is registration page
            <br />
            <form >
                <input 
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="username" 
                />
                <input 
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email" 
                />
                <input 
                    type="text"
                    name="number"
                    value={user.number}
                    onChange={handleInput}
                    placeholder="number" 
                />
                <input 
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password" 
                />
                <input 
                    type="password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInput}
                    placeholder="confirm password" 
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
