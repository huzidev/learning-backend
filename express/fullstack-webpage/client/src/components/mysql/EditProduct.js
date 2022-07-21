import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../service/api';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@material-ui/core';

export default function EditProduct() {

  const  { id } = useParams();

  const Navigate = useNavigate();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    
    const getDataById = async () => {
      const {data} = await api.get(`/api/products/${id}`)
      console.log(data);
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
    }
    getDataById();
    
  }, [id])

  const updateHandler = async (event) => {

    event.preventDefault();

    const data = {
      title : title,
      price : price,
      description : description,
    }

    // update with a put request
    await api.put(`/api/products/${id}`, data);

    Navigate({
      pathname : '/allProducts',
      search : `?name=${title}`,
      state : { detail : Response.data }
    });

  }

  return (
    <>
      <Header />
      <div className="edit-products-container">
          <h1>
              Edit Products
          </h1>     
          <form onSubmit={updateHandler}>
              <TextField 
                className='text-field'
                type="text"
                placeholder="product's name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              / >
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
              <Tooltip title={<Typography fontSize={25}>Update Product</Typography>}>
                <Button type="submit" className='update-button'>
                    Update Product
                </Button>
              </Tooltip>
          </form>
      </div>
    </>
  )
}