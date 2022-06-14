import React from 'react';

export default function register() {

    const [user, setUser] = React.useState({
        
        username : "",
        email : "",
        number : "",
        password : "",
        cpassword : ""

    });

    let name, value;

    function handleInput(event) {
        
        console.log(event);
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name] : value});

    }

    const register = async (event) => {
        
        event.preventDefault();

        const { username, email, number, password, cpassword } = user;

        fetch("/register")
    }

    return (
        <div>
            <form method="POST"> 
            {/* didn't need to use action method here */}
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    placeholder="username" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    placeholder="email" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="text" 
                    name="number" 
                    value={user.number} 
                    placeholder="contact number" 
                    onChange={handleInput} // so we can get what user is typing
                />
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    placeholder="password" 
                    onChange={handleInput} 
                />
                <input 
                    type="password" 
                    name="cpassword" 
                    value={user.cpassword} 
                    placeholder="confirm password" 
                    onChange={handleInput} 
                />
                <input 
                    type="submit"
                    name="login"
                    value="log in"
                    onClick={register}
                 />
            </form>
        </div>
    )
}
