import React, { useContext }from 'react';
import TestContext from '../Context/TestContext';

export default function TodoPage() {

  const context = useContext(TestContext);

  return (
    <div>
      Welcome, {context.email}
    </div>
  )
}
