import React, { useContext } from 'react';
import DataContext from './Context/DataContext';

export default function User(props) {
  const context = useContext(DataContext);
  const { userData } = context

  const { updateData } = props;
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
        <button onClick={()=>{updateData(userData)}}>
            Update Data
        </button>
    </div>
  )
}
