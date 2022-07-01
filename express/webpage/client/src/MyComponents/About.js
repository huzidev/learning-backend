import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {

    const Navigate = useNavigate();
    const [userData, setUserData] = React.useState({});

    const CallAboutPage = async () => {
        try{
            const res = await fetch('http://127.0.0.1:8000/about', {
                method : "GET",
                headers : {
                    Accept : "application/json", // here we are not using POST we are using GEt therefore accept type is application/json for reading
                    "Content-Type" : "application/json",
                    "jwtoken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFjOGVmYTM1ODllMDU4MTViY2UwZWYiLCJpYXQiOjE2NTY2NjkyMzB9.C1GWgivfrdxASTGn40c3Hm8IdPB9UUMtmMQjN9Vc7RY"

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
            {/* we've to use GET because we just wanted to show user its own data just */}
            <form method='GET'> 
                <h1>
                    This is about page
                </h1>
                <h2>
                    Name : 
                </h2>
                <h3>
                    {userData.username}
                </h3>
                <h2>
                    Email :
                </h2>
                <h3>
                    {userData.email}
                </h3>
            </form>
        </div>
    )
}
