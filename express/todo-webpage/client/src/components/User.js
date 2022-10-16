import React, { useContext } from 'react';
import DataContext from './Context/DataContext';

export default function User() {

    const context = useContext(DataContext);

  return (
    <div>
        <h1>
            UserId: {context._id}
        </h1>
        <h1>
            Username: {context.username}
        </h1>
        <h1>
            Email: {context.email}
        </h1>
        <h1>
            Number: {context.number}
        </h1>
    </div>
  )
}
