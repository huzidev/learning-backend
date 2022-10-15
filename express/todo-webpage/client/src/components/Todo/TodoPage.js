import React from 'react';
import User from '../User';

export default function TodoPage({ username }) {

  const tets = User();


  return (
    <div>
        TodoPage
        <h1>
            Hello, {username}
        </h1>
    </div>
  )
}
