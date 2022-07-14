import React from 'react';
import Header from '../Header';
import ShowProducts from './ShowProducts';


export default function ShowProduct() {
    return (
        <>
            <Header />
            <div className='container-products'>
                <h1>
                    All Products
                </h1>
                {/* we've created the separate components for showProducts with (s) and showProduct without (s)
                is because we don't wanted to show the heading and header component when user is at home page
                 */}
                <ShowProducts />
            </div>
        </>
    )
}
