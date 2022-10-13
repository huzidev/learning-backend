import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined
} from '@ant-design/icons';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('User', '1', <UserOutlined />),
  getItem('Home', 'sub1', <HomeOutlined />, [
    getItem('Grocery', '2', <LocalGroceryStoreOutlinedIcon />),
    getItem('Bills', '3', <PaymentOutlinedIcon />),
    getItem('Rent', '4', <PaymentsOutlinedIcon />)
  ]),
  getItem('Office', 'sub2', <MapsHomeWorkOutlinedIcon />, [
    getItem('Project A', '5', <KeyboardOutlinedIcon /> ), 
  ]),
  getItem('Completed Tasks', '6', <FileOutlined />),
  getItem('Logout', '7', <LoginOutlined />),
];

const data = [
  getItem("Hello World")
]

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{paddingTop: 60}}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
export default App;