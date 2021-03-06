import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stateActions } from '../../store/State-Store';

export default function Logout(props) {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    // since useEffect didn't support async await therefore we'll not use that
    React.useEffect(() => {
        fetch("/logout", {
            method : 'GET',
            headers : {
                "Accept" : "application/json",
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
                // window.alert("User loggedOut successfully!");
                props.showAlert("LoggedOut Successfully!", "success")
                dispatch(stateActions.Logout());
                localStorage.removeItem('jwtokenseller')
                localStorage.removeItem('jwtokenbuyer')
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
