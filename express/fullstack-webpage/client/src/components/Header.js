import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

    const Navigate = useNavigate()

    function backButton() {
        Navigate(-1); // Navigate -1 will simply moves us one page back
    }

    return (
        <div className='nav'>
            <div  className='nav-bar'>
                <Link to='/' className='animation'>Home</Link>
                <div className='back-btn-container'>
                    <button onClick={backButton} className='animation back-btn'>
                        Go back
                    </button>
                </div>
            </div>
        </div>
    )
}
