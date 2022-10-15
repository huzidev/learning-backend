import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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


function test() {
  window.alert("Hello world");
}



const items = [
  getItem('User', '1', <UserOutlined />, null, test),
  getItem('Home', 'sub1', <HomeOutlined />, [
    getItem('Grocery', '2', <LocalGroceryStoreOutlinedIcon />),
    getItem('Bills', '3', <PaymentOutlinedIcon />),
    getItem('Rent', '4', <PaymentsOutlinedIcon />)
  ]),
  getItem('Office', 'sub2', <MapsHomeWorkOutlinedIcon />, [
    getItem('Project A', '5', <KeyboardOutlinedIcon /> )
  ]),
  getItem('Completed Tasks', '6', <FileOutlined />),
  getItem('Contact Us', '7', <MessageOutlined />),
  getItem('Logout', '8', <LoginOutlined />)
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const Navigate = useNavigate();

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
          items={items}
        >
          <Menu.Item key="8" onClick={console.log("Hello")}>
          </Menu.Item>
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
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Huzi-Dev</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
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