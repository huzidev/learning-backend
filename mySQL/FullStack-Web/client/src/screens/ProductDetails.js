import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
    }
    getSingleProduct();
  }, [])

  return (
    <div>
        <h1>
          Product Details
        </h1>
        <h2>
          Tittle : {title}
        </h2>
        <h3>
          Price : {price}
        </h3>
        <p>
          description : {description}
        </p>
        <Link to={`product/edit/${id}`}>
          <button>
            Edit
          </button>
        </Link>
        <Link to={`product/${id}`}>
          <button>
            Delete
          </button>
        </Link>
    </div>
  )
}
