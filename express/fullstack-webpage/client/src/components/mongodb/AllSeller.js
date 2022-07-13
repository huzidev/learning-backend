import React from 'react';
import Header from '../Header';
import axios from 'axios';

export default function AllSeller() {
    
    const [state, setState] = React.useState({
        username : '',
        email : '',
        posts : []
    })

    
    const getData = () => {
        axios.get('/allSellers')
        .then((res) => {
            const data = res.data
                setState({ posts : data })
            })
            .catch(() => {
                window.alert("error")
            })
    }

    React.useEffect(() => {
        getData()
    }, [])
    
    const displayData = (posts) => {
        if (!posts.length) {
            return
        }

        return posts.map((post, index) => (
            <div key={index}>
                <h3>
                    {post.username}
                </h3>
                <h5>
                    {post.email}
                </h5>
            </div>
        ))
    }

    // const [sellersData, setSellersData] = React.useState({})

    // async function getData() {
    //     try{
    //         const res = await fetch("/allSellers", {
    //             method : "GET",
    //             headers : {
    //                 "Content-Type" : "application/json",
    //             },
    //         })
    //         const data = await res.json()
    //         setSellersData(data)

    //         if (res.status === 421) {
    //             window.alert("Failed getting seller's data")
    //         }
    //         else if (res.status === 200) {
    //             window.alert("Successfully get seller's data")
    //         }
    //     }
    //     catch (err) {
    //         console.log("Error while getting seller's data", err);
    //     }
    // }

    // React.useEffect(() => {
    //     getData()
    // }, [])


    return (
        <div>
            <Header />
            <h3>
                List of all sellers
            </h3>
            {
                displayData(state.posts)
            }
        </div>
    )
}
