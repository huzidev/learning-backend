import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div>
        <Link to={`product/${product.id}`}>
            <h1>
                Tittle : {product.title}
            </h1>
            <h2>
                Prce : {product.price}
            </h2>
            <h3>
                Description : {product.description}
            </h3>
        </Link>
    </div>
  )
}
