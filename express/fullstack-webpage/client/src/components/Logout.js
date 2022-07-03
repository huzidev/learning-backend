import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const Navigate = useNavigate();

    React.useEffect(() => {
        fetch('/logout', {
            method : 'GET',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })
    })

    return (
        <div>
            Logout Page
        </div>
    )
}
