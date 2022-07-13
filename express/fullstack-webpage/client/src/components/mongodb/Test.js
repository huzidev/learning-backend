import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header';


export default function Test() {

    const [sellersData, setSellersData] = React.useState({
        username : '',
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
            <div key={index}>
                
                <h3>
                    Seller's Name :
                </h3>
                <Link to={`/allSellers/${info._id}`}>
                    <h5>
                        {info.username}
                    </h5>
                </Link>
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
