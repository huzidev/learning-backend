import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { stateActions } from '../../store/State-Store';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export default function RegisterBuyer(props) {

    const Navigate = useNavigate();
    const host = "http://localhost:8000"

    // redux-functions
    const dispatch = useDispatch();
    const showPasswordReg = useSelector((state) => state.login.showPasswordReg);
    const showCPasswordReg = useSelector((state) => state.login.showCPasswordReg);

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

        const res = await fetch(`${host}/register/buyer`, {
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
            props.showAlert("Invalid value!", "error")
        }
        else if (res.status === 422) {
            props.showAlert("Email already exist", "warning")
        }   
        else if (res.status === 423) {
            props.showAlert("Username already exist", "warning")
        }   
        else if (res.status === 424) {
            props.showAlert("Number already exist", "warning")
        }
        else if (res.status === 425) {
            props.showAlert("Password doesn't match", "warning")
        }
        else if (res.status === 426) {
            props.showAlert(`Username's length must be greater than 4 values and you using just ${username.length} values`, "warning")
        }
        else if (res.status === 427) {
            props.showAlert(`Password's length must be greater than 8 values and you using just ${password.length} values`, "warning")
        }
        else if (res.status === 500) {
            props.showAlert("Internal Server Error : Failed to registered!", "warning")
        }
        else {
            props.showAlert("User registered successfully!", "success")
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
                        Register As Buyer
                    </h1>
                    <br />
                    <form >
                        <div className="alignment">
                            <PersonIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Username
                                </InputLabel>
                                <Input 
                                    type="text"
                                    id="component-simple"
                                    name='username'
                                    value={user.username} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                        </div>
                        <div className="alignment">
                            <EmailOutlinedIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Email
                                </InputLabel>
                                <Input 
                                    type="email"
                                    id="component-simple"
                                    name='email'
                                    value={user.email} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                        </div>
                        <div className="alignment">
                            <PhoneOutlinedIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Number
                                </InputLabel>
                                <Input 
                                    type="number"
                                    id="component-simple"
                                    name='number'
                                    value={user.number} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                        </div>
                        <div className="alignment">
                            <LockIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Password
                                </InputLabel>
                                <Input 
                                    id="component-simple"
                                    name='password'
                                    type={typePassword}
                                    value={user.password} 
                                    onChange={handleInput} 
                                />
                            </FormControl>
                            <div className='icon' onClick={showPass}>
                            { 
                                showPasswordReg 
                                    ? (
                                        <VisibilityOutlinedIcon />
                                    )
                                    : (
                                        <VisibilityOffOutlinedIcon />
                                    ) 
                            }
                            </div>
                        </div>
                        <div className="alignment">
                            <LockIcon />
                            <FormControl variant="standard" className='input-label'>
                                <InputLabel htmlFor="component-simple" className='label'>
                                    Confirm Password
                                </InputLabel>
                                <Input 
                                    id="component-simple"
                                    name='cpassword'
                                    value={user.cpassword}
                                    type={typeCPassword}
                                    onChange={handleInput} 
                                />
                            </FormControl>
                            <div className='icon' onClick={showCPass}>
                            { 
                                showCPasswordReg 
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
                            Already have an account? <Link to='/login' onClick={passwordConditionReg}>Login</Link>
                            {/* // we didn't used <a></a> tag rather we've used REACT LINK but html will take it as <a></a> tag therefore we've to target <a></a>  tag for styling in sass or css */}
                        </p>
                        <Button 
                            className='register-btn'
                            type="submit"
                            name="register"
                            onClick={register}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
