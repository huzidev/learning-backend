import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header';


export default function SellerData() {

    const { id } = useParams()

    const [sellersData, setSellersData] = React.useState({
        // _id : '',
        // username : '',
        // email : '',
        // number : '',
        // sellerinfo : []
    })

    async function getData() {
        try{
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
    

    // const displayData = (data) => {
    //     if (!data) {
    //         return
    //     }

    //     return data.map((info, index) => (
    //         <div key={index} className="user-info-container">
    //             <div className="user-info">
    //                 <h5>
    //                     Seller's ID :&nbsp;
    //                 </h5>
    //                 <p>
    //                     {info._id}
    //                 </p>
    //             </div>
    //             <div className="user-info">
    //                 <h5>
    //                     Seller's Name :&nbsp;
    //                 </h5>
    //                 <p>
    //                     {info.username}
    //                 </p>
    //             </div>
    //             <div className="user-info">
    //                 <h5>
    //                     Seller's Email :&nbsp;
    //                 </h5>
    //                 <p>
    //                     {info.email}
    //                 </p>
    //             </div>
    //             <div className="user-info">
    //                 <h5>
    //                     Seller's Number :&nbsp;
    //                 </h5>
    //                 <p>
    //                     {info.number}
    //                 </p>
    //             </div>
    //         </div>
    //     ))
    // }

    return (
        <>
            <Header />
            <div className="seller-info">
                <h3 className='heading'>
                    List of all sellers
                </h3>
                <div className='seller-data'>
                    {/* {
                        displayData(sellersData.sellerinfo)
                    } */}
                    name : {sellersData.username}
                </div>
            </div>
        </>
    )
}
