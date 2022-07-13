import React from 'react';
import Header from '../Header';

export default function AllSeller() {
    
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
            <div key={index}>
                <h3>
                    {info._id}
                </h3>
                <h3>
                    {info.username}
                </h3>
                <h3>
                    {info.email}
                </h3>
                <h3>
                    {info.number}
                </h3>
            </div>
        ))
    }

    return (
        <div className="seller-info">
            <Header />
            <h3>
                List of all sellers
            </h3>
            {
                displayData(sellersData.sellerinfo)
            }
        </div>
    )
}
