import React from 'react';
import { Link } from 'react-router-dom'
import defaultImg from '../assets/default.png';

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
                <div className='top-header'>
                    <h3>
                        User's Information
                    </h3>
                    <p>
                        User's status : Active
                    </p>
                    <span className='dot'></span>
                </div>
                <div className='container'>
                    <div className='user-info-container'>
                        <div className='user-info'>
                            <h5>
                                User Id :&nbsp;
                            </h5>
                            <p>
                                {useData._id}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                Username :&nbsp;
                            </h5>
                            <p>
                                {useData.username}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                User Email :&nbsp;
                            </h5>
                            <p>
                                {useData.email}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                User Number :&nbsp; 
                            </h5>
                            <p>
                                {useData.number}
                            </p>
                        </div>
                    </div>
                    <div className='user-profile'>
                        <img src={defaultImg} alt="user's-img" />
                        <form>
                            <input type="file" className='upload-img'/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
