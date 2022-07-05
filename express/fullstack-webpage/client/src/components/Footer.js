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
                            <a href="#">
                                Huzi-Dev
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-envelope">
                            </i>
                            <a href="#">
                                Huzaifa Iqbal
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-facebook">
                            </i>
                            <a href="#">
                                huzaifa_iqbal_
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-instagram">
                            </i>
                            <a href="#">
                                huzaifa_iqbal_
                            </a>
                        </div>
                        <div className="logo">
                            <i className="fa fa-phone">
                            </i>
                            <a href="#">
                                123-456-789
                            </a>
                        </div>
                    </div>
                    <form action="">
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