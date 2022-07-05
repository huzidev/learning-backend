import React from 'react';
import Nav from './Nav'
import Footer from './Footer';

export default function Home() {
    return (
        <div className='home-page'>
            <Nav />
            <h1>
                Home-Page
            </h1>
            <Footer />
        </div>
    )
}
