import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';

export default function ProductDetails() {

  const Navigate = useNavigate();

  const  { id } = useParams();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [productImage, setProductImage] = React.useState('');
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {

    const getSingleProduct = async () => {

      const {data} = await api.get(`/api/products/productReviews/${id}`)
      console.log(data);
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
      setProductImage(data.image)
    }
    getSingleProduct();

  }, [id])

  // Delete function

  const handleDelete = async (id) => {

    await api.delete(`/api/products/${id}`);
    
    alert("Product Deleted Successfully!");
    
    Navigate('/products');

  }

  const path  = "http://localhost:8000/"+productImage;
  return (
    <div>
        <h1>
          Product Details
        </h1>
        {/* it is MANDATORY to use localhost address otherwise the image will not be shown in the detail page */}
        <img src={path} alt="Product-Img" />
        <h2>
          Tittle : {title}
        </h2>
        <h3>
          Price : {price}
        </h3>
        <p>
          description : {description}
        </p>

        <h4>
          Reviews
        </h4>
        <hr />

        <Link to={`/product/edit/${id}`}>
          <button>
            Edit
          </button>
        </Link>
        <button onClick={() => handleDelete(id)}>
          Delete
        </button>
    </div>
  )
}
