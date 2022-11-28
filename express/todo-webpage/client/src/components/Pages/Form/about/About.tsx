import React, { useContext } from 'react';
import { Button, Card, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';
// import { GlobalStyles } from '../../../styled-components/Global.styled';

export default function About(props: any): JSX.Element {
  const context = useContext(DataContext);
  const { userData } = context
  const { updateData } = props;

  const theme = userData.isTheme ? 'Dark Mode' : 'Light Mode'

  if (userData.isTheme === true) {
    localStorage.setItem("dark", "Dark-Theme")
  } else {
    localStorage.removeItem("dark")
  }

  return (
    <>
        {/* <GlobalStyles dark={dark} darkModeBG={darkModeBG} darkModeC={darkModeC} transition={transition}/> */}
        <Card 
            title={<Typography.Title 
            level={3}>About</Typography.Title>} 
            style={{ width: "100%" }} 
            className="Dark Border"
        >
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
            <Button onClick={() => {updateData(userData)}} style={{ marginTop: "10px" }} type="ghost">
                Update Data
            </Button>
        </Card>
    </>
  )
}
