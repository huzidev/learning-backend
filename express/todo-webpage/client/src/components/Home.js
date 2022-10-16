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

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
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
      'My Todo', 
      '1', 
      <HomeOutlined />,
      null,
      () => Navigate('/')
    ),
    getItem(
      'User', 
      '2', 
      <UserOutlined />,
      null,
      () => Navigate('/about')
    ),
    getItem('Home', 'sub1', <HomeOutlined />, [
      getItem('Grocery', '3', <LocalGroceryStoreOutlinedIcon />),
      getItem('Payments', '4', <PaymentsOutlinedIcon />),
      getItem('Bills', '5', <PaymentOutlinedIcon />)
    ]),
    getItem('Office', 'sub2', <MapsHomeWorkOutlinedIcon />, [
      getItem('Project A', '6', <KeyboardOutlinedIcon /> )
    ]),
    getItem('Completed Tasks', '7', <FileOutlined />),
    getItem(
      'Contact Us', 
      '8', 
      <MessageOutlined />,
      null,
      () => Navigate('/contact')
    ),
    getItem(
      'Signout', '9', 
      <LoginOutlined />, 
      null,
      () => Navigate('/signout')
    )
  ];
  
  const signedOutItems = [
    getItem('Todo', '1', <UserOutlined />),
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
        style={{paddingTop: 60}}
      >
        <div className="logo" />
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline"
          items={showItems}
        >
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
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
          </Breadcrumb>) : ''}
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {!Location.pathname.includes('/about') && !Location.pathname.includes('/contact') && <TodoPage />}
            {Location.pathname.includes('/about') && <User />}
            {Location.pathname.includes('/contact') && <ContactUs />}
            {Location.pathname.includes('/signin') && <SingIn />}
            {Location.pathname.includes('/signup') && <SignUp />}
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