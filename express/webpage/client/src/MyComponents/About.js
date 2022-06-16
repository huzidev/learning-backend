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
            })
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
