import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../Header';
import defaultImg from '../../assets/default.png';

export default function About() {

    const [userData, setUserData] = React.useState({}) // if we wanted to upload then we use ('') but here we just getting the data therefore we've used ({}) object we can get object of data

    // about page for seller
    async function aboutPageSeller() {
        try{
            const res = await fetch(`/about/seller`, {
                method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
                credentials : "include",
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

    async function aboutPageBuyer() {
        try{
            const res = await fetch(`/about/buyer`, {
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

    // about page for buyer
    React.useEffect(() => {
        if (localStorage.getItem('jwtokenseller')) {
            aboutPageSeller();
        }
        else if (localStorage.getItem('jwtokenbuyer')) {
            aboutPageBuyer();
        }
    }, [])
    

    return (
        <>
            <Header />
            <div className='about-data'>
                <div className='top-header'>
                    <h3>
                        {localStorage.getItem('jwtokenseller') ? "Seller's Information" : ''}
                        {localStorage.getItem('jwtokenbuyer') ? "Buyer's Information" : ''}
                    </h3>
                    <p>
                        User's status : 
                        {
                            localStorage.getItem('jwtokenseller')  || localStorage.getItem('jwtokenbuyer') 
                                ? ' Active' 
                                : ' Inactive'
                        } 
                    </p>
                    {
                        localStorage.getItem('jwtokenseller')  || localStorage.getItem('jwtokenbuyer') 
                            ? <span className='dot'></span> 
                            : <span className='line'></span>
                    }
                </div>
                <div className='container'>
                    <div className='user-info-container'>
                        <div className='user-info'>
                            <h5>
                                User Id :&nbsp;
                            </h5>
                            <p>
                                {userData._id}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                Username :&nbsp;
                            </h5>
                            <p>
                                {userData.username}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                User Email :&nbsp;
                            </h5>
                            <p>
                                {userData.email}
                            </p>
                        </div>
                        <div className='user-info'>
                            <h5>
                                User Number :&nbsp; 
                            </h5>
                            <p>
                                {userData.number}
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
