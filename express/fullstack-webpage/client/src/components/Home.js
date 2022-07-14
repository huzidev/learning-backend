import React from 'react';
import Nav from './Nav'
import ShowProducts from './mysql/ShowProducts'
// import Footer from './Footer';

export default function Home() {
    return (
        <>
            <Nav />
            <div className='home-page'>
                <h1>
                    Items For Sale
                </h1>
                <ShowProducts />
            </div>
            {/* <Footer /> */}
        </>
    )
}
