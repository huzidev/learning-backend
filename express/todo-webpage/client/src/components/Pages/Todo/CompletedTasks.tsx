import React from 'react';

export default function CompletedTasks(props: any): JSX.Element {
  const { notes } = props;
  console.log("Notes", notes);
  return (
    <div>
        <h1>
            Completed Tasks
        </h1>
    </div>
  )
}
