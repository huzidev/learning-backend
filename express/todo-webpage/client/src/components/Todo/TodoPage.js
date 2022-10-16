import React, { useContext }from 'react';
import DataContext from '../Context/DataContext';

export default function TodoPage() {

  const context = useContext(DataContext);

  return (
    <div>
      Welcome, {context.email}
    </div>
  )
}
