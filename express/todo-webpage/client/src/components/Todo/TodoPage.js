import React from 'react';
import User from '../User';

export default function TodoPage({ test }) {

  const tets = User();


  return (
    <div>
        TodoPage
        <h1>
            Hello, {test}
        </h1>
    </div>
  )
}
