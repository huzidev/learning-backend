import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const path  = "http://localhost:8000/"+product.image; // NECESSARY to do because image is uploading at backend server and we've
    // to linked it with client server which is running at 8000 and backend server is running at 3000

    console.log('path', path);
  return (
    <div>
        {/* image is defined in productModel */}
        {!!product.image &&<img src={path} alt="Product-Img" />}
        <h1>
            Tittle : {product.title}
        </h1>
        <h2>
            Prce : {product.price}
        </h2>
        <h3>
            Description : {product.description}
        </h3>
        {/* always remember to use / at start whenever using LINK or URL */}
        <Link to={`/product/${product.id}`}> 
            <button>
                Details
            </button>
        </Link>
    </div>
  )
}
