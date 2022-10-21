import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from './Context/DataContext';

export default function User() {
  const context = useContext(DataContext);
  const { userData } = context

  const updateData = (currData) => {
    ref.current.click();
    setNote({
        id: currData._id, 
        eusername: currData.username, 
        eemail: currData.email, 
        enumber:currData.number
    })
}

  return (
    <div>
        <h1>
            UserId: {userData._id}
        </h1>
        <h1>
            Username: {userData.username}
        </h1>
        <h1>
            Email: {userData.email}
        </h1>
        <h1>
            Number: {userData.number}
        </h1>
        {/* <Link to={`/updateuser/${userData._id}`}> 
            Update Info
        </Link> */}
        <button onClick={()=>{updateData(userData)}}>
            Update Data
        </button>
    </div>
  )
}
