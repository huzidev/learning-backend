import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';

export default function AddProducts() {

    const Navigate = useNavigate();

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [published, setPublished] = React.useState(true);
    const [image, setImage] = React.useState('');
 
    const addProductHandler = async (event) => {

        event.preventDefault();

        const formData = new FormData()

        formData.append('image', image) // the image at right is same as of the name = 'image' of input tag for uploading image
        formData.append('title', title) // append means add
        formData.append('price', price)
        formData.append('description', description)
        formData.append('published', published)

        await api.post('/api/products/addProduct', formData);

        Navigate({
            pathname : '/products',
            search : `?name=${title}&price=${price}`,
            state : { detail : Response.data } // this will pass all the information to the path where we Navigate to
        });
    }

  return (
    <div>
        <h1>
            Add Products
        </h1>     
        <form 
            onSubmit = {addProductHandler}
            method = "POST"
            encType = 'multipart/form-data' //It is specifically used when FILE uploading is required
        >
            <input
                name='image' // name must have to be same as of we defined in the productModel
                type='file'
                onChange={(event) => setImage(event.target.files[0])} // if we just uses files means multiple images therefore we've to
                // specify that only one image therefore we've used [0] array of zero index 
            />
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
                type="checkbox" 
                onChange={(event) => setPublished(event.target.checked)} // it should've to be (checked) because it is checkbox
            />
            <button type="submit">
                Add Product
            </button>
        </form>
    </div>
  )
}
