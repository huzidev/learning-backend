import React from 'react';

export default function EditProduct() {
  return (
    <div>
        <h1>
            Edit Products
        </h1>     
        <form onSubmit={addProductHandler}>
            <input 
                type="text" 
                placeholder='product name'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input 
                type="number" 
                placeholder='price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            <input 
                type="text" 
                placeholder='description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">
                Add Product
            </button>
        </form>
    </div>
  )
}
