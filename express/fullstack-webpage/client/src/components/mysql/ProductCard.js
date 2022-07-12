import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const path  = "http://localhost:8000/"+product.image; // NECESSARY to do because image is uploading at backend server and we've
    // to linked it with client server which is running at 8000 and backend server is running at 3000 therefore here we uses 
    // localhost:8000 because it is all UI is visible at this address
  return (
    <div>
        {/* image is defined in productModel */}
        {!!product.image &&<img src={path} alt="Product-Img" />}
        <h1>
            Tittle : {product.title}
        </h1>
        <h2>
            Price : ${product.price}
        </h2>
        <h3>
            Description : {product.description}
        </h3>
        {/* always remember to use / at start whenever using LINK or URL */}
        <Link to={`/api/products/product/${product.pid}`}> 
            <button>
                Details
            </button>
        </Link>
    </div>
  )
}