import React from 'react';
import Header from '../Header';

export default function AllSeller() {

    const [sellersData, setSellersData] = React.useState({})

    async function getData() {
        try{
            const res = await fetch("/allSellers", {
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
                credentials : "include",
            })
            const data = await res.json()
            setSellersData(data)

            if (res.status === 421) {
                window.alert("Failed getting seller's data")
            }
            else if (res.status === 200) {
                window.alert("Successfully get seller's data")
            }
        }
        catch (err) {
            console.log("Error while getting seller's data", err);
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Header />
            <h3>
                List of all sellers
            </h3>
            <h5>
                Seller's ID : {sellersData._id}
            </h5>
            <h5>
                Seller's Name : {sellersData.username}
            </h5>
            <h5>
                Seller's Email : {sellersData.email}
            </h5>
            <h5>
                Seller's Number : {sellersData.number}
            </h5>
        </div>
    )
}
