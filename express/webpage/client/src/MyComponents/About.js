import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {

    const Navigate = useNavigate();
    const [userData, setUserData] = React.useState();

    const CallAboutPage = async () => {
        try{
            const res = await fetch('/about', {
                method : "GET",
                headers : {
                    Accept : "application/json", // here we are not using POST we are using GEt therefore accept type is application/json for reading
                    "Content-Type" : "application/json"
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
            </form>
        </div>
    )
}
