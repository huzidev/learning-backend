import React from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../service/api';

const About = () => {
    
    const Navigate = useNavigate();
    const [data, setData] = React.useState({})
    const host = "http://localhost:5000"

    React.useEffect(() => {

        const getUserData = async () => {
            const {data} = await fetch(`${host}/api/auth/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
            })    
            const json = await data.json()
            console.log(data);
            setData(data.name)
            setData(data.email)
        }
        getUserData();
    })
    
    return (
        <div>
            This is About page
            <form method='GET'>
                <h3>
                    UserId :
                </h3>
                <h5>
                </h5>
                <hr />
                <h3>
                    Username : {data.name}
                </h3> 
                <h5>
                </h5>
                <hr />
                <h3>
                    Email : {data.email}
                </h3>
                <h5>
                </h5>
            </form>
        </div>
    )
}

export default About