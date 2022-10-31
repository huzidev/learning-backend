import React, { useState } from 'react';
import axios from 'axios';

export default function Test() {
    const [newUser, setNewAuthor] = useState(
        {
            image: '',
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', newUser.image);

        axios.post('http://localhost:8000/add', formData)
             .then((res: any) => {
                console.log(res);
             })
             .catch((err: any) => {
                console.log(err);
             });
    }

    const handlePhoto = (e: any) => {
        setNewAuthor({...newUser, image: e.target.files[0]});
    }

    const [test, setTest] = useState(false)

    function ff() {
        setTest(prevState => !prevState)
    }

    console.log("State is ", test);

    return (
        <div>
            <h1>
                Add Image
            </h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={handlePhoto}
                />
                <input 
                    type="submit"
                />
            </form>
            <input 
                type="checkbox"
                onClick={ff} 
            />
        </div>
    )
}
