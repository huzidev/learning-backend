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
                <ShowProducts />
            </div>
        </>
    )
}
