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
        }).then((res)) => {
            Navigate('/login', {
                replace : true // this means after logout we've to COMPULSORY replace it because after logout the cookies will remove
                // therefore we've to make ours user to login again
            })
        }
    }, [])

    return (
        <div>
            <h1>
                Logout page
            </h1>
        </div>
    )
}
