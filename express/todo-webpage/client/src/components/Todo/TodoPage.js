import React, { useContext }from 'react';
import DataContext from '../Context/DataContext';

export default function TodoPage() {

  const context = useContext(DataContext);

  return (
    <div>
      <h1>
        Welcome, {context.userData.username}
      </h1>
    </div>
  )
}
