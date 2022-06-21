import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {

  const  { id } = useParams();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    const getSingleProduct = async () => {
      const {data} = await axios.get(`/api/products/${id}`)
      console.log(data);
    }
  })

  return (
    <div>
        
    </div>
  )
}
