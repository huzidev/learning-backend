import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header';


export default function SellerData() {

    const [sellersData, setSellersData] = React.useState({
        _id : '',
        username : '',
        email : '',
        number : '',
        sellerinfo : []
    })

    async function getData() {
        try{
            const res = await fetch("/allSellers", {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                },
            })
            const data = await res.json()
            setSellersData({ sellerinfo : data })
        }
        catch (err) {
            console.log("Error while getting seller's data", err);
        }
    }

    React.useEffect(() => {
            getData()
    }, [])
    

    const displayData = (data) => {
        if (!data) {
            return
        }

        return data.map((info, index) => (
            <div key={index} className="user-info-container">
                <div className="user-info">
                    <h5>
                        Seller's ID :&nbsp;
                    </h5>
                    <p>
                        {info._id}
                    </p>
                </div>
                <div className="user-info">
                    <h5>
                        Seller's Name :&nbsp;
                    </h5>
                    <p>
                        {info.username}
                    </p>
                </div>
                <div className="user-info">
                    <h5>
                        Seller's Email :&nbsp;
                    </h5>
                    <p>
                        {info.email}
                    </p>
                </div>
                <div className="user-info">
                    <h5>
                        Seller's Number :&nbsp;
                    </h5>
                    <p>
                        {info.number}
                    </p>
                </div>
            </div>
        ))
    }

    return (
        <>
            <Header />
            <div className="seller-info">
                <h3 className='heading'>
                    List of all sellers
                </h3>
                <div className='seller-data'>
                    {
                        displayData(sellersData.sellerinfo)
                    }
                </div>
            </div>
        </>
    )
}
