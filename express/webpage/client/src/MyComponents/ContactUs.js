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
                username,
                email,
                number,
                message
            })
        });

        const data = await res.json(); // for getting user data

        if ( res.status === 400 || res.status === 422 || !data ) {
            window.alert("Invalid Value!");
        }
        else{   
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
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email"
                    required="true" 
                />
                <input 
                    type="text" 
                    name="number" 
                    placeholder="contact number" 
                    required="true"
                />
                <textarea name="message" id="" cols="30" rows="10" placeholder='yours message'></textarea>
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
