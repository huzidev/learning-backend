import React from 'react';

export default function About() {

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

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        }

        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        CallAboutPage();
    }, []);

    return (
        <div>
            {/* we've to use GET because we just wanted to show user its own data just */}
            <form method='GET'> 
                
            </form>
        </div>
    )
}
