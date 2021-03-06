import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import Header from '../Header';
import Rating from '@mui/material/Rating';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@material-ui/core';

export default function ProductDetails() {
  
  let { id } = useParams();
  const Navigate = useNavigate();

  // for product info
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [productImage, setProductImage] = React.useState('');

  // for reviews
  const [reviews, setReviews] = React.useState([]);
  const [rating, setRating] = React.useState('');
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

    window.alert("You sure you wanted to delete that item?")

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
    if (description.length > 0 && rating.length > 0) {
      await api.post(`/api/reviews/addReview`, review) // so here we don't have to give ${id} rather we have to use the URL where from
      Navigate("/allProducts");
      // where reviews will add if we go to postman we can see that from THIS URL http://127.0.0.1:8000/api/reviews/addReview WE can add
      // reviews SINCE https://127.0.0.1:8000 adds automatically therefore we just have to specify the path through which we can
      // add review
    }
    if (description.length === 0 && rating.length === 0) {
      window.alert("Description and rating must have to be something")
    }
    else if (description.length === 0) {
      window.alert("Description must have to be something")
    }
    else if (rating.length === 0) {
      window.alert("You must have select at least one star")
    }
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
                  <Tooltip title={<Typography fontSize={25}>Edit Item</Typography>}>
                    <Link to={`/product/edit/${id}`}>
                      <Button className='edit-btn' startIcon={<EditIcon />}>
                        Edit
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip title={<Typography fontSize={25}>Delete Item</Typography>}>
                    <Button onClick={() => handleDelete(id)} startIcon={<DeleteIcon />} className='delete-btn'>
                      Delete
                    </Button>
                  </Tooltip>
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
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event) => setRating(event.target.value)}
                    />
                    <TextField 
                      className='text-field'
                      label="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      type="text"
                    />
                    <Tooltip title={<Typography fontSize={25}>Add Review</Typography>}>
                      <Button type="submit" startIcon={<AddIcon />} className='review-btn'>
                        Add Review
                      </Button>
                    </Tooltip>
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
                (reviews.map((review, index) => {
                  return (
                    <>
                    <div className='rating-container'>
                      <p>
                        <b>{index + 1}) Rating :</b>
                      </p>
                       <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                      <p key={review.id}> 
                        <b>Description :</b> {review.description}
                      </p>
                      <hr />
                    </>
                  )
                  })) : 
                ( <p> No reviews for this product </p> )
              }
            </div>
          </div>
      </div>
    </>
  )
}