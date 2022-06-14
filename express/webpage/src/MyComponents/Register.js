import React from 'react';

export default function register() {

    const [user, setUser] = React.useState({
        
        name : "",
        email : "",
        number : "",
        password : "",
        cpassword : ""

    });

    return (
        <div>
            <form method="POST"> 
            {/* didn't need to use action method here */}
                <input 
                    type="text" 
                    name="username" 
                    value={user.name} 
                    placeholder="username" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                />
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    placeholder="email" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                />
                <input 
                    type="text" 
                    name="number" 
                    value={user.phone} 
                    placeholder="contact number" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                />
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    placeholder="password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <input 
                    type="password" 
                    name="cpassword" 
                    value={user.cpassword} 
                    placeholder="confirm password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <input 
                    type="submit"
                    name="login"
                    value="log in"
                    onClick={loginUser}
                 />
            </form>
        </div>
    )
}
