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
  const [reviews, setReviews] = React.useState([])


  React.useEffect(() => {

    const getSingleProduct = async () => {

      const {data} = await axios.get(`/api/products/getProductReviews/${id}`)
      console.log(data);
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
      //for reviews
      setReviews(data.review)// it should be review not reviews
    }
    getSingleProduct();

  }, [id])

  // Delete function

  const handleDelete = async (id) => {

    await axios.delete(`/api/products/${id}`);
    
    alert("Product Deleted Successfully!");
    
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
        <h4>
          Reviews
        </h4>
        <br />
        {
          reviews.length > 0 ? (
            reviews.map((review) => (
              <p key={review.id}>
                Rating : {review.rating}
                <br />
                Description : {review.description}
              </p>
            ))
          ) : (<p>No Reviews For This Product</p>)
        }
        <Link to={`/product/edit/${id}`}>
          <button>
            Edit
          </button>
        </Link>
        <button onClick={() => handleDelete(id)}>
          Delete
        </button>
        <br />
        <h2>
          Add Review
        </h2>
        <hr />
        
    </div>
  )
}
