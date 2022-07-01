import React from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../service/api';

const About = () => {
    
    const Navigate = useNavigate();
    const [userData, setUserData] = React.useState({});
    const host = "http://localhost:5000"

    const CallAboutPage = async () => {
        try{
            const res = await fetch(`${host}/api/auth/getuser`, {
                method : "GET",
                headers : {
                    Accept : "application/json", // here we are not using POST we are using GEt therefore accept type is application/json for reading
                    "Content-Type" : "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                // credentials : "include" // so cookies could reach backend easily
            });

            const data = await res.json(); // for getting user's data
            console.log(data);
            setUserData(data) // because data variable have all the data of user
            
        }

        catch (err) {
            console.log(err);
            Navigate('/login'); // so user can go login again
        }
    }

    React.useEffect(() => {
        CallAboutPage();
    }, []); // we've to use empty array dependency here other wise the data will fetch continuously
    
    return (
        <div>
            This is About page
                <h3>
                    UserId :
                </h3>
                <h5>
                </h5>
                <hr />
                <h3>
                    Username : {userData.name}
                </h3> 
                <h5>
                </h5>
                <hr />
                <h3>
                    Email : {userData.email}
                </h3>
                <h5>
                </h5>
        </div>
    )
}

export default About
