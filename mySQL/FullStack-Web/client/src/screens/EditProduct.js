import axios from 'axios';
import React from 'react';

export default function EditProduct() {

  const  { id } = useParams();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    
    const getDataById = async () => {
      const {data} = await axios.get(`/api/products/${id}`)
      console.log(data);
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
    }
    getDataById();
    
  }, [id])

  const updateHandler = async () => {

    // update with a put request

    await axios.put(`/api/products/${id}`)

  }

  return (
    <div>
        <h1>
            Edit Products
        </h1>     
        <form onSubmit={updateHandler}>
            <input 
                type="text" 
                placeholder='product name'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input 
                type="number" 
                placeholder='price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            <input 
                type="text" 
                placeholder='description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">
                Update Product
            </button>
        </form>
    </div>
  )
}
