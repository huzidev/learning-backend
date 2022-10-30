import React, { useContext } from 'react';
import { Card, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';

export default function About(props: any): JSX.Element {
  const context = useContext(DataContext);
  const { userData } = context
  const { updateData } = props;
  return (
    <div>
        <Card title={<Typography.Title level={3}>About</Typography.Title>} bordered={false} style={{ width: 500 }}>
            <Typography.Title level={4}> 
                UserId: {userData._id}
            </Typography.Title>
            <h1>
                Username: {userData.username}
            </h1>
            <h1>
                Email: {userData.email}
            </h1>
            <h1>
                Number: {userData.number}
            </h1>
            <h1>
                Image: {userData.image}
            </h1>
            <button onClick={() => {updateData(userData)}}>
                Update Data
            </button>
        </Card>
    </div>
  )
}
