import React from 'react';
import { Typography } from 'antd';

export default function StateNote(props: any): JSX.Element {
  return (
    <div>
          <Typography.Title level={4}>
              No Task {props.type}
          </Typography.Title>
    </div>
  )
}
