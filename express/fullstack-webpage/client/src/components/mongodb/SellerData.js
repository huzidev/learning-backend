import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header';


export default function SellerData() {

    const { id } = useParams()

    const [sellersData, setSellersData] = React.useState({})

    async function getData() {
        try{
            console.log("id");
            console.log("id");
            console.log("id");
            console.log("id");
            console.log("id");
            console.log(id);
            const res = await fetch(`/allSellers/${id}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                },
            })
            const data = await res.json()
            setSellersData(data)
        }
        catch (err) {
            console.log("Error while getting seller's data", err);
        }
    }

    // so every time when function runs when user clicked on the button the useEffect will runs the function all from scratch
    // every time we get the update data
    React.useEffect(() => {
            getData()
    }, [])

    return (
        <>
            <Header />
            <div className="seller-info">
                <h3 className='heading'>
                    About {sellersData.username}
                </h3>
                <div className='seller-data'>
                    ID : {sellersData._id}
                    name : {sellersData.username}
                    email : {sellersData.email}
                    number : {sellersData.number}
                </div>
            </div>
        </>
    )
}
