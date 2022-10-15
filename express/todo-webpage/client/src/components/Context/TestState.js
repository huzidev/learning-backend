import React from 'react';
import TestContext from './testContext';

export default function TestState(props) {
    const state = {
        "name" : "Huzi"
    }

  return (
    <div>
        <TestContext.Provider value={state}>
            {props.children}
        </TestContext.Provider>
    </div>
  )
}
