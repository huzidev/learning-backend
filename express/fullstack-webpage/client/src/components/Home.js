import React from 'react';
import Nav from './Nav'
import Footer from './Footer';

export default function Home() {
    return (
        <>
            <Nav />
            <div className='home-page'>
                <h1>
                    Home-Page
                </h1>
            </div>
            <Footer />
        </>
    )
}
