import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { stateActions } from '../../store/State-Store';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export default function LoginBuyer(props) {

    const Navigate = useNavigate();
    
    // redux-functions
    const dispatch = useDispatch();
    const showPasswordLog = useSelector((state) => state.login.showPasswordLog);

    const [user, setUser] = React.useState({
        email : "",
        password : "",
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
                email,
                password
            })
        });

        // for getting all the data
        const data = await res.json();
        if (res.status === 400) {
            props.showAlert("Email or Password is incorrect!", "warning")
        }
        else if (res.status === 421 || !data) {
            props.showAlert("Invalid Value!", "error")
        }
        else if (res.status === 500) {
            props.showAlert("Internal Server Error : Failed to registered!", "error")
        }
        else {
            props.showAlert("LoggedIn Successfully!", "success")
            // REDUX FUNCTION FOR CHANGING NAV-BAR
            dispatch(stateActions.logInBuyer());
            // redux function for changing state type of password
            dispatch(stateActions.passwordConditionLog());
            console.log("Successfully loggedIn");
            localStorage.setItem('jwtokenbuyer', data.token)
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
                        <div className='password-tag'>
                            <PersonIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    email
                                </InputLabel>
                                <Input 
                                    name="email"
                                    id="component-simple" 
                                    value={user.email} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                        </div>
                        <div className='password-tag'>
                            <LockIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Password
                                </InputLabel>
                                <Input 
                                    id="component-simple"
                                    name='password'
                                    type={typePasswordType}
                                    value={user.password} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                            <div className='icon' onClick={showPass}>
                                { 
                                    showPasswordLog 
                                        ? (
                                            <VisibilityOutlinedIcon />
                                        )
                                        : (
                                            <VisibilityOffOutlinedIcon />
                                        )
                                }
                            </div>
                        </div>
                        <p>
                            Didn't have an account? <Link to='/register' onClick={passwordConditionLog}>Create One</Link>
                            {/* // we didn't used a tag rather we've used REACT LINK but html will take it as a tag therefore we've to target a tag for styling in sass or css */}
                        </p>
                        <Button 
                            className='login-btn'
                            type="submit"
                            name="login"
                            onClick={loginBuyer}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}