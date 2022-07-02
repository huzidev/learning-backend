import React from 'react'

export default function Register() {

    const [user, setUser] = React.useState({
        username : "",
        email : "",
        number : "",
        password : "",
        cpassword : ""
    })

    return (
        <div>
            This is registration page
            <br />
            <form >
                <input 
                    type="text"
                    name="username"
                    placeholder="username" 
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="username" 
                />
                <input 
                    type="text"
                    name="number"
                    placeholder="username" 
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="username" 
                />
                <input 
                    type="password"
                    name="cpassword"
                    placeholder="username" 
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
