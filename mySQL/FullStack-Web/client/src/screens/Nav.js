import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/addProducts'>Add Products</Link>
            <Link to='/product/edit/:id'>Edit Products</Link>
            <Link to='/product/:id'>Product Details</Link>
            <Link to='/products'>Show Products</Link>
        </div>
    )
}
