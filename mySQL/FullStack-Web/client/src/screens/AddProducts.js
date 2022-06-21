import React from 'react';

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
    }

  return (
    <div>
        <h1>
            Add Products
        </h1>     
        <form >
            <input type="text" placeholder='product name'/>
            <input type="number" placeholder='price' />
            <input type="text" placeholder='description' />
            <input type="submit" />
        </form>
    </div>
  )
}
