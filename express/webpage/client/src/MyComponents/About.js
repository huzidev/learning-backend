import React from 'react';

export default function About() {

    const CallAboutPage = async () => {
        try{
            const res = await fetch('/about', {
                
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
