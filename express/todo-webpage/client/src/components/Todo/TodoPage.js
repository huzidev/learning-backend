import React from 'react';
import User from '../User';

export default function TodoPage() {

  const tets = User();


  return (
    <div>
        TodoPage
        <h1>
            Hello, {tets.username}
        </h1>
    </div>
  )
}
