import React from 'react';
import testContext from './testContext';

export default function TestState(props) {
  return (
    <div>
        <TestState.Provider>
            {props.children}
        </TestState.Provider>
    </div>
  )
}
