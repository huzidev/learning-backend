import React from 'react'

export default function Login() {
    return (
        <div>
            <h1>
                Login Page
            </h1>
            <br />
            <form >
                <input 
                    type="text" 
                    placeholder="Username or Email"
                />
                <input 
                    type="password" 
                    placeholder="yours password"
                />
                <input 
                    type="submit" 
                />
            </form>
        </div>
    )
}
