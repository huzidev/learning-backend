import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from './Context/DataContext';

export default function User() {
  const context = useContext(DataContext);
  const { userData } = context
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
        <Link to={`/updateuser/${userData._id}`}> 
            Update Info
        </Link>
    </div>
  )
}
