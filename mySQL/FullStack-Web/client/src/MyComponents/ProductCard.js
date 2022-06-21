import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div>
        <h1>
            Tittle : {product.title}
        </h1>
        <h2>
            Prce : {product.price}
        </h2>
        <h3>
            Description : {product.description}
        </h3>
        <Link to={`product/${product.id}`}>
            <button>
                Details
            </button>
        </Link>
    </div>
  )
}
