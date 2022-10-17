import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactUs from './Form/ContactUs'
import DataContext from './Context/DataContext';
import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  MessageOutlined
} from '@ant-design/icons';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';
import { Breadcrumb, Layout, Menu, Icon } from 'antd';
import User from './User';
import SingIn from './Form/SingIn';
import SignUp from './Form/SignUp';
import TodoPage from './Todo/TodoPage';
import AddTodo from './Todo/AddTodo';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children, onClick ) {
    return {
      key,
      icon,
      children,
      label,
      onClick
    };
  }
  
  const Navigate = useNavigate();
  const Location = useLocation();
  const Context = useContext(DataContext);

  console.log("currenrt location is "  + Location.pathname);

  const signedInItems = [
    getItem(
      'User', 
      '1', 
      <UserOutlined />,
      null,
      () => Navigate('/about')
    ),
    getItem('Home', 'sub1', <HomeOutlined />, [
      getItem(
        'Grocery', 
        '2', 
        <LocalGroceryStoreOutlinedIcon />,
        null,
        () => Navigate('/addnote')
      ),
      getItem('Payments', '3', <PaymentsOutlinedIcon />),
      getItem('Bills', '4', <PaymentOutlinedIcon />)
    ]),
    getItem('Office', 'sub2', <MapsHomeWorkOutlinedIcon />, [
      getItem('Project A', '5', <KeyboardOutlinedIcon /> )
    ]),
    getItem('Completed Tasks', '6', <FileOutlined />),
    getItem(
      'Contact Us', 
      '7', 
      <MessageOutlined />,
      null,
      () => Navigate('/contact')
    ),
    getItem(
      'Signout', '8', 
      <LoginOutlined />, 
      null,
      () => Navigate('/signout')
    )
  ];
  
  const signedOutItems = [
    getItem(
      'Signin', '2', 
      <LoginOutlined />, 
      null, 
      () => Navigate('/signin')
    ),
    getItem(
      'Signup', '3', 
      <LoginOutlined />, 
      null, 
      () => Navigate('/signup')
    )
  ];

  const showItems = localStorage.getItem('jwtoken') ? signedInItems : signedOutItems 

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)} 
        style={{paddingTop: 20}}
      >
        <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => Navigate('/')}>
          <h1 
            style={{ color: "#fff" }}>
            My Todo
          </h1>  
        </div>
        <Menu 
          theme="dark" 
          mode="inline"
          items={showItems}
        >
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {localStorage.getItem('jwtoken') ? (

          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{Context.userData.username}</Breadcrumb.Item>
          </Breadcrumb>) : ''
          }
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {!Location.pathname.includes('/about') && 
            !Location.pathname.includes('/contact') && 
            !Location.pathname.includes('/signout') && 
            <TodoPage />
          }
            {Location.pathname.includes('/about') && <User />}
            {Location.pathname.includes('/contact') && <ContactUs />}
            {Location.pathname.includes('/signin') && <SingIn />}
            {Location.pathname.includes('/signup') && <SignUp />}
            {Location.pathname.includes('/addnote') && <AddTodo />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          All Rights Are Reserved &copy; 2022
        </Footer>
      </Layout>
    </Layout>
  );
};