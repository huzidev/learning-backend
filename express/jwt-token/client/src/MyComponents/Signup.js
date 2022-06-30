import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const Navigate = useNavigate();
    const [credentials, setCredentials] = React.useState({name : "", email : "", password : "", cpassword : ""}) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
            // Save the auth token and redirect
        if (json.success) {
            localStorage.setItem('token', json.authtoken); 
            Navigate("/");
            props.showAlert("Registered Successfully!", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger") // invalid credential is the msg and danger is the type
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">User name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" placeholder="User name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} placeholder="Password" minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} placeholder="Confirm Password" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup