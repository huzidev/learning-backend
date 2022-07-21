import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function AddProducts() {

    const Navigate = useNavigate();

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
 
    const addProductHandler = async (event) => {

        event.preventDefault();

        const formData = new FormData()

        formData.append('image', image) // the image at right is same as of the name = 'image' of input tag for uploading image
        formData.append('title', title) // append means add
        formData.append('price', price)
        formData.append('description', description)

        await api.post('/api/products/addProduct', formData);

        Navigate({
            pathname : '/allProducts',
            search : `?name=${title}&price=${price}`,
            state : { detail : Response.data } // this will pass all the information to the path where we Navigate to
        });
    }

  return (
    <>
        <Header />
        <div className='add-products-container'>
            <h1>
                Add Products
            </h1>     
            <form 
                onSubmit = {addProductHandler}
                method = "POST"
                encType = 'multipart/form-data' //It is specifically used when FILE uploading is required
            >
                <TextField 
                    className='text-field'
                    type="text"
                    placeholder="product's name"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField 
                    className='text-field'
                    type='number'
                    placeholder="product's price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <TextField 
                    className='text-field'
                    type="text"
                    placeholder="product's description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Stack className='stack'>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input 
                            hidden accept="image/*" 
                            multiple type="file" 
                            onChange={(event) => setImage(event.target.files[0])} // if we just uses files means multiple images therefore we've to
                            // specify that only one image therefore we've used [0] array of zero index 
                        />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </Stack>
                <Button type="submit">
                    Add Product
                </Button>
            </form>
        </div>
    </>
  )
}