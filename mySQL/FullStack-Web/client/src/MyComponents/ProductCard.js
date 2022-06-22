import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div>
        <img src={product.image} alt="Product-Img" />
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
