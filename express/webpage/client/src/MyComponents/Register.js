import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

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

        setUser({...user, [name] : value});

    }

    const register = async (event) => {
        
        event.preventDefault();

        const { username, email, number, password, cpassword } = user;

        const res = await fetch('/register', { //make sure to use proxy in package.json while linking frontend and backend
            method : "POST",
            headers : {
                "Content-Type" : "application/json" // just like we make changes in POST-MAN for writing raw
            },
            body : JSON.stringify({ // since server didn't read JSON we've to send string like we did raw method in post-man
                username,
                email, 
                number, 
                password, 
                cpassword 
            })
        });

        const data = await res.json(); // for getting user data

        if ( res.status === 422 || !data ) {
            window.alert("Invalid Value!");
        }
        else if ( res.status === 423 ) {
            window.alert("Password Doesn't Match!");
        }
        else{   
            window.alert("Registration Successful!");
            console.log("Successful Registration");
            navigate("/login");
        }
    }

    return (
        <div>
            <form method="POST"> 
            {/* didn't need to use action method here */}
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    placeholder="username" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    placeholder="email" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="text" 
                    name="number" 
                    value={user.number} 
                    placeholder="contact number" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    placeholder="password" 
                    onChange={handleInput} 
                />
                <input 
                    type="password" 
                    name="cpassword" 
                    value={user.cpassword} 
                    placeholder="confirm password" 
                    onChange={handleInput}
                />
                <input 
                    type="submit"
                    name="login"
                    value="Register"
                    onClick={register}
                 />
            </form>
        </div>
    )
}
