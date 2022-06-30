import React from 'react';
import {useNavigate} from 'react-router-dom';

const About = () => {
    
    const Navigate = useNavigate();
    const [userData, setUserData] = React.useState({});
    
    const CallAboutPage = async () => {
        try{
            const res = await fetch('/about', {
                method : "GET",
                headers : {
                    Accept : "application/json", // here we are not using POST we are using GEt therefore accept type is application/json for reading
                    "Content-Type" : "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                credentials : "include" // so cookies could reach backend easily
            });

            const data = await res.json(); // for getting user's data
            console.log(data);
            setUserData(data) // because data variable have all the data of user
            
            if (await (!res.status) === 200) {
                const error = new Error(res.error);
                throw error;
            }

        }

        catch (err) {
            console.log(err);
            Navigate('/login'); // so user can go login again
        }
    }

    React.useEffect(() => {
        CallAboutPage();
    });

    return (
        <div>
            This is About page
            <form method='GET'>
                <h3>
                    UserId :
                </h3>
                <h5>
                    {userData.id}
                </h5>
                <hr />
                <h3>
                    Username : 
                </h3> 
                <h5>
                    {userData.username}
                </h5>
                <hr />
                <h3>
                    Email :
                </h3>
                <h5>
                    {userData.email}
                </h5>
            </form>
        </div>
    )
}

export default About