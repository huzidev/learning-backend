import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const Navigate = useNavigate();
    React.useEffect(() => {
        fetch('/logout', {
            method : 'GET',
            headers : {
                Accept : "application/json", 
                "Content-Type" : "application/json",
            },
            credentials : "include"
        }).then((res) => { // if we used async then we can use (const data = await res.json();) but since we are using promises here
            // we've to use then catch if we use async await then we can use try catch  
            Navigate('/login', {
                replace : true // this means after logout we've to COMPULSORY replace it because after logout the cookies will remove
                // therefore we've to make ours user to login again
            })
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err => {
            console.log(err);
        }))
    }, [])

    return (
        <div>
            <h1>
                Logout page
            </h1>
        </div>
    )
}
