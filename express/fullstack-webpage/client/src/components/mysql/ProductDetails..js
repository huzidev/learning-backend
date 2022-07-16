import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import Header from '../Header';

export default function ProductDetails() {
  
  let { id } = useParams();
  const Navigate = useNavigate();

  // for product info
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [productDescription, setProductDescription] = React.useState('');
  const [productImage, setProductImage] = React.useState('');

  // for reviews
  const [reviews, setReviews] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {

    const getSingleProduct = async () => {

      const {data} = await api.get(`/api/products/productReviews/${id}`)
      console.log(data);
      
      setTitle(data.title)
      setPrice(data.price)
      setProductDescription(data.description)
      setProductImage(data.image)

      // for reviews
      setReviews(data.review)
    }
    getSingleProduct();

  }, [id])

  // Delete function

  const handleDelete = async (id) => {

    await api.delete(`/api/products/${id}`);
    
    alert("Product Deleted Successfully!");
    
    Navigate('/allProducts');
  }

  const addReviewHandler = async (event) => {

    event.preventDefault()
    
    let review = {
        id : id,
        rating : rating,
        description : description
    }
    await api.post(`/api/reviews/addReview`, review) // so here we don't have to give ${id} rather we have to use the URL where from
    // where reviews will add if we go to postman we can see that from THIS URL http://127.0.0.1:8000/api/reviews/addReview WE can add
    // reviews SINCE https://127.0.0.1:8000 adds automatically therefore we just have to specify the path through which we can
    // add review

    Navigate("/allProducts");
  }

  const path  = "http://localhost:8000/"+productImage;
  return (
    <>
      <Header />
      <div className='detail-product-container'>
          <h1>
            Product Details
          </h1>
          {/* it is MANDATORY to use localhost address otherwise the image will not be shown in the detail page */}
          <img src={path} alt="Product-Img" className='details-img'/>
          <h2 className='info'>
            Tittle : {title}
          </h2>
          <h3 className='info'>
            Price : ${price}
          </h3>
          <p className='info'>
            description : {productDescription}
          </p>
          { 
            localStorage.getItem('jwtokenseller') 
              ? (
                <div className='buttons'>
                  <Link to={`/product/edit/${id}`}>
                    <button className='edit-btn'>
                      Edit
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(id)} className='delete-btn'>
                    Delete
                  </button>
                </div>
              ) 
              : ''
            }
          {/* Add Reviews */}
          {
            localStorage.getItem("jwtokenseller") || localStorage.getItem("jwtokenbuyer") 
              ? (
                <div className="reviews-container">
                  <h4 className='main-heading-reviews'>
                    Add Reviews
                  </h4>
                  <hr />
                  <form onSubmit={addReviewHandler}>
                    <h4>
                      Rating
                    </h4>
                    <input 
                      value={rating}
                      onChange={(event) => setRating(event.target.value)}
                      type="number"
                      placeholder="Rating for product"
                    />
                    <h4>
                      Description
                    </h4>
                    <input 
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      type="text"
                      placeholder="Description related to rating"
                    />
                    <button type="submit" className='review-btn'>
                      Add Review
                    </button>
                  </form>
                </div>
              )
              : ''
          }
          <div className="reviews-container">
            {/* ALL REVIEWS */}
            <div className="added-review">
              <h5>
                Product Reviews
              </h5>
              <hr />
              {
                reviews.length > 0 ? 
                (reviews.map((review) => {
                  return <p key={review.id}> Rating : {review.rating} <br /> {review.description}</p>
                  })) : 
                ( <p> No reviews for this product </p> )
              }
            </div>
          </div>
      </div>
    </>
  )
}