import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {

    const [useData, setUserData] = React.useState({}) // if we wanted to upload then we use ('') but here we just getting the data therefore we've used ({}) object we can get object of data

    async function aboutPage() {
        try{
            const res = await fetch('/about', {
                method : 'GET',
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
            const data = await res.json();
            setUserData(data);

            // if status failed
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        aboutPage();
    }, [])
    
    return (
        <>
            <div className='nav'>
                    <div  className='nav-bar'>
                        <Link to='/' className='animation'>Home</Link>
                    </div>
                </div>
            <div className='about-data'>
                <h5>
                    User Id : {useData._id}
                </h5>
                <h5>
                    Username : {useData.username}
                </h5>
                <h5>
                    User Email : {useData.email}
                </h5>
                <h5>
                    User Number : {useData.number}
                </h5>
            </div>
        </>
    )
}
