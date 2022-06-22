import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {

  const Navigate = useNavigate();

  const  { id } = useParams();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [productDescription, setProductDescription] = React.useState('');
  const [reviews, setReviews] = React.useState([])

  // rating and description
  const [rating, setRating] = React.useState(0);
  const [description, setRatingDescription] = React.useState('');

  React.useEffect(() => {

    const getSingleProduct = async () => {

      const {data} = await axios.get(`/api/products/getProductReviews/${id}`)
      console.log(data);
      setTitle(data.title)
      setPrice(data.price)
      setProductDescription(data.description) // the description in bracket should be same as of in database
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

  const addReviewHandler = async (event) => {

    event.preventDefault();

    let review = {
      product_id : id,
      rating : rating,
      description : description
    }
    
    await axios.post(`/api/products/getProductReviews/${id}`, review)
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
          description : {productDescription}
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
        <form onSubmit={addReviewHandler}>
            <input 
                type="text" 
                placeholder='product name'
                value={rating}
                onChange={(event) => setRating(event.target.value)}
            />
            <input 
                type="text" 
                placeholder='description'
                value={description}
                onChange={(event) => setRatingDescription(event.target.value)}
            />
            <button type="submit">
                Add Product
            </button>
        </form>
    </div>
  )
}
