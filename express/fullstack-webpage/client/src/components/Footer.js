import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    const Navigate = useNavigate();

    const [user, setUser] = React.useState({
        username : "",
        email : "",
        number : "",
        message : ""
    })

    let name, value;

    function handleInput(event) {
        name = event.target.name;
        value = event.target.value;
        setUser({ 
            ...user,
            [name] : value 
        });
    }
    
    async function sendMessage(event) {
        event.preventDefault();

        const { username, email, number, message } = user;

        const res = await fetch("/contact", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username,
                email,
                number,
                message
            })
        });

        const data = await res.json();

        if (res.status === 422) {
            window.alert("You've left an tag empty!")
        }
        else if (res.status === 500 || !data) {
            window.alert("Failed To Send Message")
        }
        else {
            window.alert("Message Sent Successfully!")
            Navigate("/")
        }
    }

    return (
        <>
            <div className='footer-background'>
                <div className='footer-container'>
                    <h2>
                        About Creator
                    </h2>
                    <div className='footer-items'>
                        <div className="logo">
                            <i className="fab fa-github">
                            </i>
                            <a 
                                href="https://github.com/huzidev" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Huzi-Dev
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-envelope">
                            </i>
                            <a 
                                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=huzi.iqdev@gmail.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Huzaifa Iqbal
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-facebook">
                            </i>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Huzaifa Iqbal
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-instagram">
                            </i>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                huzaifa_iqbal_
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-phone">
                            </i>
                            <a href="tel:0303030303"> 
                            {/* if we uses (tel) then it'll directly opens phone app for you */}
                                123-456-789
                            </a>
                        </div>
                    </div>
                    <form action="POST">
                        <div className='form-main'>
                            <div className='form-side'>
                                <input 
                                    type="text"
                                    name="username" // make to sure to add this name property whenever making form
                                    value={user.username}
                                    onChange={handleInput}
                                    placeholder="Yours Name"
                                />
                                <input 
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    placeholder='Yours Email'
                                 />
                                <input 
                                    type="Phone" 
                                    name="number"
                                    value={user.number}
                                    onChange={handleInput}
                                    placeholder='Yours Contact 
                                (Optional)' />
                            </div>
                            <div className='form-comp'>
                                <textarea 
                                    name="message" 
                                    cols="41.5" 
                                    rows="10" 
                                    value={user.message}
                                    onChange={handleInput}
                                    placeholder='Yours Message'
                                >
                                </textarea>
                            </div>
                            <input 
                                className='send-btn'
                                type="submit"
                                name="send"
                                value="send message"
                                onClick={sendMessage}
                            />
                        </div>
                    </form>
                </div>
                <div className='bottom-text'>
                    <p>
                        All Rights Are Reserved by <b>HuziDev</b> &copy; 2021-22
                    </p>
                </div>
            </div>
        </>
    )
}