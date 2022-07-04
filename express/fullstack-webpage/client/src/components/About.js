import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {

    const Navigate = useNavigate();
    
    const [useData, setUserData] = React.useState('')

    async function aboutPage() {
        try{
            const res = await fetch('/about', {
                method : 'GET',
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
            const data = await res.json();
            setUserData(data);
            
            // if status failed
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='about-data'>
            <h5>
                User Id :
            </h5>
            <h5>
                Username :
            </h5>
            <h5>
                User Email :
            </h5>
            <h5>
                User Number :
            </h5>
        </div>
    )
}
