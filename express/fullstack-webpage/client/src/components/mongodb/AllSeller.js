import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

export default function AllSeller() {
    
    const [sellersData, setSellersData] = React.useState({
        _id : '',
        username : '',
        sellerinfo : []
    })

    async function getData() {
        try{
            const res = await fetch(`/allSellers`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                },
            })
            const data = await res.json()
            setSellersData({ sellerinfo : data }) // so we can assign all the fetched data to sellerinfo then we can use it
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
            <div key={index} className="sellers-name">
                <div className="user-info">
                    <h3>
                        Seller's Name :&nbsp;
                    </h3>
                    <Link to={`/allSellers/${info._id}`}>
                        <h5>
                            {info.username}
                        </h5>
                    </Link>
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
                <div className='sellers-name-info'>
                    {
                        displayData(sellersData.sellerinfo)
                    }
                </div>
            </div>
        </>
    )
}
