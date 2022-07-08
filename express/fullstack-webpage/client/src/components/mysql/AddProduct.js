import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {

    const Navigate = useNavigate();

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');

    async function addProductHandler(event) {
        event.preventDefault();

        const formData = new FormData()

        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', image)

        await axios.post('/products/addProduct', formData);

        Navigate({
            pathname : '/products',
            search : `?name=${title}&price=${price}`,
            state : { detail : Response.data }
        });
        
    }

    return (
        <div>
            <h1>
                Add Product
            </h1>
            <form 
                method='POST'
                onClick={addProductHandler}
                encType = 'multipart/form-data' //It is specifically used when FILE uploading is required
            >
                <input 
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="product name"
                />
                <input 
                    type="text"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="product price"
                />
                <input 
                    type="text" 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <input 
                    type="file"
                    value={image}
                    onChange={(event) => setImage(event.target.files[0])} // if we just uses files means multiple images
                    // therefore we've to specify that only one image therefore we've used [0] array of zero index 
                />
            </form>
        </div>
    )
}
