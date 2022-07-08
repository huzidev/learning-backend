import React from 'react'

export default function addProduct() {

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');

    async function addProductHandler(event) {
        event.preventDefault();

        const formData = new FormData()

        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', image)

        
    }

    return (
        <div>
            
        </div>
    )
}
