import React from 'react';
import { useContext } from 'react';
import AboutItem from './AboutItem';
import aboutContext from "../context/notes/aboutContext"
import {useNavigate} from 'react-router-dom';

const About = () => {
    
    const context = useContext(aboutContext);
    const Navigate = useNavigate();
    const { data, getData } = context;

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            getData();
        }
        else{
            Navigate("/login");
        }
    }, [])

    return (
        <div>
            This is About page
            {/* <form method='GET'>
                <h3>
                    UserId :
                </h3>
                <h5>
                    {data.id}
                </h5>
                <hr />
                <h3>
                    Username : 
                </h3> 
                <h5>
                    {data.username}
                </h5>
                <hr />
                <h3>
                    Email :
                </h3>
                <h5>
                    {data.email}
                </h5>
            </form> */}
            {data.map((event) => {
                    return <AboutItem key={event._id} />
            })}
        </div>
    )
}

export default About