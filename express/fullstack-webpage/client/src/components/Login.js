import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { logInActions } from '../store/Login-Store';
// import { useDispatch } from 'react-redux';

export default function Login() {

    const Navigate = useNavigate();

    // REDUX-FUNCTIONS
    // const dispatch = useDispatch();

    const [user, setUser] = React.useState({
        // username : "",
        email : "",
        password : "",
    });

    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');

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

    async function login(event) {

        // for getting rid of automatic form update
        event.preventDefault();

        const { email, password} = user; // user state already created

        const res = await fetch('/login', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                // username,
                email,
                password,
            })
        });

        // for getting all the data
        const data = await res.json();

        if (res.status === 400) {
            window.alert("Email or Password is incorrect");
        }
        // if (res.status === 401) {
        //     window.alert("Username or Password is incorrect")
        // }
        else if (!data) {
            window.alert("Invalid Value!");
        }
        else {
            window.alert("User loggedIn successfully!");
            // REDUX FUNCTION FOR CHANGING NAV-BAR
            // dispatch(logInActions.logIn());
            console.log("Successfully loggedIn");
            Navigate("/");
        }
    }


    return (
        <>
            <Link to='/' >Home</Link>
            <div className='login-page'>
                <div className='form-data'>
                    <h1>
                        Login Page
                    </h1>
                    <form method="POST">
                        <input 
                            type="email"
                            name="email"
                            className='data'
                            value={user.email}
                            onChange={handleInput}
                            // onChange={(event) => setEmail(event.target.value)}
                            placeholder="Yours Email"
                            />
                        <input 
                            type="password"
                            name="password"
                            className='data'
                            value={user.password}
                            onChange={handleInput}
                            // onChange={(event) => setPassword(event.target.value)} 
                            placeholder="Yours Password"
                        />
                        <p>
                            Didn't have an account? <Link to='/register'>Create One</Link>
                            {/* // we didn't used a tag rather we've used REACT LINK but html will take it as a tag therefore we've to target a tag for styling in sass or css */}
                        </p>
                        <input 
                            className='login-btn'
                            type="submit"
                            name="login"
                            value="Login"
                            onClick={login}
                            />
                    </form>
                </div>
            </div>
        </>
    )
}
