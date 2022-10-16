import React, { useContext } from 'react';
import DataContext from './Context/DataContext';

export default function User() {

    const context = useContext(DataContext);

  return (
    <div>
        <h1>
            UserId: {context.userData._id}
        </h1>
        <h1>
            Username: {context.userData.username}
        </h1>
        <h1>
            Email: {context.userData.email}
        </h1>
        <h1>
            Number: {context.userData.number}
        </h1>
    </div>
  )
}
