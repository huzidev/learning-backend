import React from 'react';

export default function AddProducts() {
  return (
    <div>
        <h1>
            Add Products
        </h1>     
        <form >
            <input type="text" placeholder='product name'/>
            <input type="number" placeholder='price' />
            <input type="text" placeholder='description' />
        </form>
    </div>
  )
}
