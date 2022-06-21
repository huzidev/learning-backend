import React from 'react';
import axios from 'axios';

export default function AddProducts() {

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState('');

    const addProductHandler = async () => {
        const data = {
            title : title,
            price : price,
            description : description,
            published : true
        }
        await axios.post('/api/products/addProduct', data)
    }

  return (
    <div>
        <h1>
            Add Products
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
            <input 
                type="submit" 
            />
        </form>
    </div>
  )
}
