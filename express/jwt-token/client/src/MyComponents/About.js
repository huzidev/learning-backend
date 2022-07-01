import React from 'react';
import {useNavigate} from 'react-router-dom';

const About = () => {
    
    const Navigate = useNavigate();
    const [data, setData] = useState({}) 

    const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({email, password})
    });

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
                    Username : 
                </h3> 
                <h5>
                </h5>
                <hr />
                <h3>
                    Email :
                </h3>
                <h5>
                </h5>
            </form>
        </div>
    )
}

export default About