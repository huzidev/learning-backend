import React from 'react';

export default function ContactUs() {
    return (
        <div>
            <form method="POST">
                <input 
                    type="text" 
                    name="username" 
                    value={email} 
                    placeholder="username" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                    required="true"
                />
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="email"
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                    required="true" 
                />
                <input 
                    type="text" 
                    name="number" 
                    value={email} 
                    placeholder="contact number" 
                    onChange={(event) => setEmail(event.target.value)} // so we can get what user is typing
                    required="true"
                />
                <textarea name="message" id="" cols="30" rows="10" placeholder='yours message'></textarea>
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
