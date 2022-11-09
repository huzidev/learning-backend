import React, { useContext } from 'react';
import { Button, Card, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';

export default function About(props: any): JSX.Element {
  const context = useContext(DataContext);
  const { userData } = context
  const { updateData } = props;

  const theme = userData.isTheme ? 'Dark Mode' : 'Light Mode'

  return (
    <div className={userData.isTheme ? 'Dark' : ''}>
        <Card title={<Typography.Title level={3}>About</Typography.Title>} bordered={false} style={{ width: "100%" }}>
            <Typography.Title level={4}> 
                UserId: {userData._id}
            </Typography.Title>
            <Typography.Title level={4}>
                Username: {userData.username}
            </Typography.Title> 
            <Typography.Title level={4}>
                Email: {userData.email}
            </Typography.Title> 
            <Typography.Title level={4}>
                Number: {userData.number}
            </Typography.Title> 
            <Typography.Title level={4}>
                Image: {userData.image}
            </Typography.Title>
            <Typography.Title level={4}>
                Theme: {theme}
            </Typography.Title>  
            <Button onClick={() => {updateData(userData)}} style={{ marginTop: "10px" }}>
                Update Data
            </Button>
        </Card>
    </div>
  )
}
