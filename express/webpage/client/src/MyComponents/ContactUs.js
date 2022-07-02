import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {

    const navigate = useNavigate(); 
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [message, setMessage] = React.useState('');

    const sentMessage = async (event) => {    

        event.preventDefault();

        const res = await fetch('/contact', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json" // just like we make changes in POST-MAN for writing raw
            },
            body : JSON.stringify({
                username, // since in SCHEMA for userMessage we've same keys name like username, email, number and here we've 
                email, // created same React state of same keys name as of in ours SCHEMA for messages therefore we can 
                number, // just write username and NOT username : username OR email : email since we've same key properties 
                message // therefore we can just write SINGLE property
            })
        });

        const data = await res.json(); // for getting user data

        if (res.status === 422) {
            window.alert("You've left an tag empty!")
        }
        else if (res.status === 500 ) {
            window.alert("Failed to sent message, Internal Server Error")
        }
        else if (!data) {
            window.alert("Invalid Value")
        }
        else {   
            window.alert("Message Sent Successfully!");
            navigate("/");
        }
    }

    return (
        <div>
            <form method="POST">
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    required="true"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} // MAKE SURE TO USE THIS OTHERWISE NOTHING WILL PRINT INSIDE the input tag
                    placeholder="email"
                    required="true" 
                />
                <input 
                    type="text" 
                    name="number" 
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    placeholder="contact number" 
                    required="true"
                />
                <textarea 
                    name="message" 
                    cols="30" 
                    rows="10" 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder='yours message'>
                </textarea>
                <input 
                    type="submit"
                    name="login"
                    value="log in"
                    onClick={sentMessage}
                 />
            </form>
        </div>
    )
}
