import React, { useContext, useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../../../../Store/UserState';

export default function About(props: any): JSX.Element {
  const context = useContext(DataContext);
  const { userData } = context;
  const { updateData } = props;

  const test = useSelector((state: any) => state.user.setUserData)
  const dispatch = useDispatch();

  const theme = userData.isTheme ? 'Dark Mode' : 'Light Mode'

    if (userData.isTheme === true) {
        localStorage.setItem("dark", "Dark-Theme");
        localStorage.removeItem("light");
    } else if (userData.isTheme === false) {
        localStorage.setItem("light", "Light-Theme");
        localStorage.removeItem("dark");
    }
  let themae = localStorage.getItem('dark') ? 'dark' : 'light' 
    
  console.log("wahts is theme in localStorage", themae);
  
  function getData() {
    dispatch(stateActions.getNotes())
    console.log("what is getData", test);
  }

  return (
    <>
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
        <button className='Dark' onClick={getData}>
          Get Data
        </button>
    </>
  )
}
