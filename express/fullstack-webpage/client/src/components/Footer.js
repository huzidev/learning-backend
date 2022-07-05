import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                            <Link to="#">
                                Huzi-Dev
                            </Link>
                        </div>
                        <div className="logo">
                            <i className="fa fa-envelope">
                            </i>
                            <Link to="#">
                                Huzaifa Iqbal
                            </Link>
                        </div>
                        <div className="logo">
                            <i className="fa fa-facebook">
                            </i>
                            <Link to="#">
                                huzaifa_iqbal_
                            </Link>
                        </div>
                        <div className="logo">
                            <i className="fa fa-instagram">
                            </i>
                            <Link to="#">
                                huzaifa_iqbal_
                            </Link>
                        </div>
                        <div className="logo">
                            <i className="fa fa-phone">
                            </i>
                            <Link to="#">
                                123-456-789
                            </Link>
                        </div>
                    </div>
                    <form action="POST">
                        <div className='form-main'>
                            <div className='form-side'>
                                <input type="text" placeholder='Yours Name'/>
                                <input type="email" placeholder='Yours Email' />
                                <input type="Phone" placeholder='Yours Contact (Optional)' />
                            </div>
                            <div className='form-comp'>
                                <textarea name="message" cols="41.5" rows="10" placeholder='Yours Message'>
                                </textarea>
                            </div>
                            <button>
                                Send Message
                            </button>
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