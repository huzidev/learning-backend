import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { stateActions } from '../store/State-Store';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginBuyer() {

    const Navigate = useNavigate();
    
    // redux-functions
    const dispatch = useDispatch();
    const showPasswordLog = useSelector((state) => state.login.showPasswordLog);

    // const host = 'http://localhost:8000'

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

    async function loginBuyer(event) {

        // for getting rid of automatic form update
        event.preventDefault();

        const { email, password } = user; // user state already created

        const res = await fetch("/login/buyer", {
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
        else if (res.status === 421 || !data) {
            window.alert("Invalid Value!");
        }
        else {
            window.alert("User loggedIn successfully!");
            // REDUX FUNCTION FOR CHANGING NAV-BAR
            dispatch(stateActions.logInBuyer());
            // redux function for changing state type of password
            dispatch(stateActions.passwordConditionLog());
            console.log("Successfully loggedIn");
            Navigate("/");
        }
    }

    function passwordConditionLog() {
        dispatch(stateActions.passwordConditionLog())
    }
    function showPass() {
        dispatch(stateActions.typePasswordLog());
    }

    const typePasswordType = showPasswordLog ? 'text' : 'password';

    return (
        <>
            <div className='nav'>
                <div  className='nav-bar'>
                    <Link to='/' className='animation' onClick={passwordConditionLog}>Home</Link>
                </div>
            </div>
            <div className='login-page'>
                <div className='form-data'>
                    <h1>
                        Login As Buyer
                    </h1>
                    <form method="POST">
                        <input 
                            type="email"
                            name="email"
                            className='data'
                            value={user.email}
                            onChange={handleInput}
                            placeholder="Yours Email"
                        />
                        <div className='password-tag'>
                            <input 
                                type={typePasswordType}
                                name="password"
                                className='data'
                                value={user.password}
                                onChange={handleInput}
                                placeholder="Yours Password"
                            />
                            <div className='icon' onClick={showPass}>
                                { 
                                    showPasswordLog 
                                        ? (
                                            <i className={`fa fa-eye`}></i> 
                                        )
                                        : (
                                            <i className={`fa fa-eye-slash`}></i>
                                        )
                                }
                            </div>
                        </div>
                        <p>
                            Didn't have an account? <Link to='/register' onClick={passwordConditionLog}>Create One</Link>
                            {/* // we didn't used a tag rather we've used REACT LINK but html will take it as a tag therefore we've to target a tag for styling in sass or css */}
                        </p>
                        <input 
                            className='login-btn'
                            type="submit"
                            name="login"
                            value="Login"
                            onClick={loginBuyer}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}