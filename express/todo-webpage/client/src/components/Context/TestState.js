import React from 'react';
import TestContext from './testContext';

export default function TestState(props) {
    const state = {
        "name" : "Huzi"
    }

  return (
    <div>
        <TestState.Provider value={state}>
            {props.children}
        </TestState.Provider>
    </div>
  )
}
