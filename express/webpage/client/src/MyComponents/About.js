import React from 'react';

export default function About() {

    const CallAboutPage = async () => {
        try{
            const res = await fetch('/about')
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
            <form method=''>
                
            </form>
        </div>
    )
}
