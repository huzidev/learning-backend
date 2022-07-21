import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';

export default function Footer() {

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
            window.location.reload(); // so all the input data for sending message will remove automatically
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
                        <div className="parts">
                            <div className="logo">
                                <i className="fab fa-github">
                                </i>
                                <a 
                                    href="https://github.com/huzidev" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    // it is necessary to use rel property
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
                        </div>
                        <div className="parts">
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
                        </div>
                        <div className="bottom">
                            <div className="logo">
                                <i className="fa fa-phone">
                                </i>
                                <a href="tel:0303030303"> 
                                {/* if we uses (tel) then it'll directly opens phone app for you */}
                                    123-456-789
                                </a>
                            </div>
                        </div>
                    </div>
                    <form action="POST">
                        <div className='form-main'>
                            <div className='form-side'>
                                <TextField 
                                    className='text-field'
                                    name='username'
                                    type="text"
                                    placeholder="Yours Name"
                                    value={user.username}
                                    onChange={handleInput}
                                />
                                <TextField 
                                    className='text-field'
                                    name="email"
                                    type="email"
                                    placeholder="Yours Email"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                                <TextField 
                                    className='text-field'
                                    name="number"
                                    type="Phone"
                                    placeholder='Yours Contact (Optional)'
                                    value={user.number}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className='form-comp'>
                                <TextareaAutosize 
                                    className='textarea-field'
                                    name="message" 
                                    minRows={9}
                                    value={user.message}
                                    onChange={handleInput}
                                    placeholder='Yours Message'
                                />
                            </div>
                            <Tooltip title="Send Message">
                                <Button 
                                    className='send-btn'
                                    type="submit"
                                    name="send"
                                    onClick={sendMessage}
                                    endIcon={<SendIcon />}
                                >
                                    send message
                                </Button>
                            </Tooltip>
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