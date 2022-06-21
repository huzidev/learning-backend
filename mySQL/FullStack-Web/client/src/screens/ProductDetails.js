import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {

  const Navigate = useNavigate();

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

  }, [id])

  // Delete function

  const handleDelete = async (id) => {

    await axios.delete(`/api/products/${id}`);

    Navigate('/products');
  }

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
        <Link to={`/product/edit/${id}`}>
          <button>
            Edit
          </button>
        </Link>
        <button onClick={handleDelete(id)}>
          Delete
        </button>
    </div>
  )
}
