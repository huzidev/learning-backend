import React from 'react';
import { Typography } from 'antd';

export default function NoteState(props: any) {
  return (
    <div>
        <Typography.Title level={4}>
            No Task {props.type}
        </Typography.Title>
    </div>
  )
}
