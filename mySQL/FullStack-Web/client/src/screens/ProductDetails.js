import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {

  const  { id } = useParams();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    const getSingleProduct = async () => {
      
    }
  })

  return (
    <div>
        
    </div>
  )
}
