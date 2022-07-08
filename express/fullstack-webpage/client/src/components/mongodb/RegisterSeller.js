import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { stateActions } from '../../store/State-Store';

export default function RegisterSeller() {

    const Navigate = useNavigate();

    // redux-functions
    const dispatch = useDispatch();
    const showPasswordReg = useSelector((state) => state.login.showPasswordReg);
    const showCPasswordReg = useSelector((state) => state.login.showCPasswordReg);

    // const host = 'http://localhost:8000'

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

        const res = await fetch("/register/seller", {
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
            dispatch(stateActions.passwordConditionReg()); // so input type for password can came to default form
            console.log("Successful Registration");
            Navigate("/login");
        }
    }

    function passwordConditionReg() {
        dispatch(stateActions.passwordConditionReg())
    }
    function showPass() {
        dispatch(stateActions.typePasswordReg());
    }
    function showCPass() {
        dispatch(stateActions.typeCPasswordReg());
    }

    // for input types
    const typePassword = showPasswordReg ? 'text' : 'password';
    const typeCPassword = showCPasswordReg ? 'text' : 'password';
    
    return (
        <>
            <div className='nav'>
                <div  className='nav-bar'>
                    <Link to='/' onClick={passwordConditionReg} className='animation'>Home</Link>
                </div>
            </div>
            <div className='register-page'>
                <div className='form-data'>
                    <h1>
                        Register As Seller
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
                                // type="password"
                                name="password"
                                className='data'
                                type={typePassword}
                                value={user.password}
                                onChange={handleInput}
                                placeholder="password" 
                            />
                            <div className='icon' onClick={showPass}>
                            { 
                                showPasswordReg 
                                    ? (
                                        <i className={`fa fa-eye`}></i> 
                                    )
                                    : (
                                        <i className={`fa fa-eye-slash`}></i>
                                    ) 
                            }
                            </div>
                        </div>
                        <div className='password-tag'>
                            <input 
                                name="cpassword"
                                className='data'
                                type={typeCPassword}
                                value={user.cpassword}
                                onChange={handleInput}
                                placeholder="confirm password" 
                            />
                            <div className='icon' onClick={showCPass}>
                            { 
                                showCPasswordReg 
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
                            Already have an account? <Link to='/login' onClick={passwordConditionReg}>Login</Link>
                            {/* // we didn't used <a></a> tag rather we've used REACT LINK but html will take it as <a></a> tag therefore we've to target <a></a>  tag for styling in sass or css */}
                        </p>
                        <input 
                            className='register-btn'
                            type="submit"
                            name="register"
                            value="Register"
                            onClick={register}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
