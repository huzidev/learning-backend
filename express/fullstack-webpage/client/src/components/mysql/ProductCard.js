import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@material-ui/core';

export default function ProductCard({ product }) {
    const path  = "http://localhost:8000/"+product.image; // NECESSARY to do because image is uploading at backend server and we've
    // to linked it with client server which is running at 8000 and backend server is running at 3000 therefore here we uses 
    // localhost:8000 because it is all UI is visible at this address
  return (
    <div className='product-container'>
        {/* image is defined in productModel */}
        {!!product.image &&<img src={path} alt="Product-Img" className='product-img' />}
        <h1 className='info'>
            Tittle : {product.title}
        </h1>
        <h2 className='info'>
            Price : ${product.price}
        </h2>
        <h3 className='info'>
            Description : {product.description}
        </h3>
        {/* always remember to use / at start whenever using LINK or URL */}
        <Link to={`/product/${product.pid}`}> 
            <Tooltip title={<Typography fontSize={25}>Details</Typography>}>
                <Button className='details-btn'>
                    Details
                </Button>
            </Tooltip>
        </Link>
    </div>
  )
}