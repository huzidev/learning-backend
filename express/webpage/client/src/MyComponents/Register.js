import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const history = useNavigate();

    const [user, setUser] = React.useState({
        
        username : "",
        email : "",
        number : "",
        password : "",
        cpassword : ""

    });

    let name, value;

    function handleInput(event) {
        
        console.log(event);
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name] : value});

    }

    const register = async (event) => {
        
        event.preventDefault();

        const { username, email, number, password, cpassword } = user;

        const res = await fetch("/register", {
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

        if ( data.status === 422 || !data ) {
            window.alert("Invalid Value!");
        }
        else{
            window.alert("Registration Successful!");
            console.log("Successful Registration");
            history.push("/login");
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
                    value="log in"
                    onClick={register}
                 />
            </form>
        </div>
    )
}
