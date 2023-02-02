import React from 'react';

export default function StateNote(props: any): JSX.Element {
  return (
    <div>
          <Typography.Title level={4}>
              <StateNote
                  type={Type}
              />
              No Task {Type}
          </Typography.Title>
    </div>
  )
}
