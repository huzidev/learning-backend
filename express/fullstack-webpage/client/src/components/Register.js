import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    // for freeze input (when we write something in the tag nothing appears)
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

        if (res.status === 421 || !data) {
            window.alert("Invalid value!")
        }
        else if (res.status === 422) {
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
        else if (res.status === 500) {
            window.alert("Internal Server Error : Failed to registered!")
        }
        else {
            window.alert("User registered successfully!");
            console.log("Successful Registration");
            Navigate("/login");
        }

    }
    
    return (
        <>
            <Link to='/' >Home</Link>
            <div className='register-page'>
                <div className='form-data'>
                    <h1>
                        This is registration page
                    </h1>
                    <br />
                    <form >
                        <input 
                            type="text"
                            name="username"
                            className='data'
                            value={user.username}
                            onChange={handleInput}
                            placeholder="username" 
                        />
                        <input 
                            type="text"
                            name="email"
                            className='data'
                            value={user.email}
                            onChange={handleInput}
                            placeholder="email" 
                        />
                        <input 
                            type="text"
                            name="number"
                            className='data'
                            value={user.number}
                            onChange={handleInput}
                            placeholder="number" 
                        />
                        <div className='password-tag'>
                            <input 
                                type="password"
                                name="password"
                                className='data'
                                value={user.password}
                                onChange={handleInput}
                                placeholder="password" 
                            />
                            <i className="fa fa-eye-slash"></i>
                        </div>
                        <div className='password-tag'>
                            <input 
                                type="password"
                                name="cpassword"
                                className='data'
                                value={user.cpassword}
                                onChange={handleInput}
                                placeholder="confirm password" 
                            />
                        </div>
                        <p>
                            Already have an account? <Link to='/login'>Login</Link>
                            {/* // we didn't used a tag rather we've used REACT LINK but html will take it as a tag therefore we've to target a tag for styling in sass or css */}
                        </p>
                        <input 
                            className='register-btn'
                            type="submit"
                            name="login"
                            value="Register"
                            onClick={register}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
