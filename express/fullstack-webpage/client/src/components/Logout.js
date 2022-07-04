import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInActions } from '../store/Login-Store';

export default function Logout() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    React.useEffect(() => {
        fetch('/logout', {
            method : 'GET',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials : "include"
        }).then((res) => {
            Navigate('/login', {
                replace : true
            })
            if (!res.status === 200) {  
                const error = new Error(res.error);
                throw error;
            }
            else {
                window.alert("User loggedOut successfully!");
                dispatch(logInActions.Logout());
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className='logout'>
            Logging out
        </div>
    )
}
