import {
  FileOutlined, HomeOutlined,
  LoginOutlined, LogoutOutlined, MessageOutlined, UserOutlined
} from '@ant-design/icons';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from './Context/DataContext';
import { GlobalStyles } from './styled-components/Global.styled';

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children}: Props): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: string,
    key: string,
    icon: any,
    children: any,
    onClick: any
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick
    } as MenuItem;
  }

  const Navigate = useNavigate();
  const Location = useLocation();
  const Context = useContext(DataContext);

  const { userData } = Context

  const signedInItems: MenuItem[] = [
    getItem(
      'User',
      '1',
      <UserOutlined />,
      null,
      () => Navigate('/about')
    ),
    getItem('Home', 'sub1', <HomeOutlined />, [
      getItem(
        'Add Todo',
        '2',
        <CreateOutlinedIcon />,
        null,
        () => Navigate('/note/addnote')
      ),
    ], null),
    getItem(
      'Completed Notes',
      '6',
      <FileOutlined />,
      null,
      () => Navigate('/note/completed')
    ),
    getItem(
      'Contact Us',
      '7',
      <MessageOutlined />,
      null,
      () => Navigate('/contact')
    ),
    getItem(
      'Signout', '8',
      <LogoutOutlined />,
      null,
      () => Navigate('/signout')
    )
  ];

  const signedOutItems: MenuItem[] = [
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

  const signingOut: MenuItem[] = [
    getItem(
      'Signout', '1',
      <LogoutOutlined />,
      null,
      () => Navigate('/signout')
    )
  ];

  let showItems = localStorage.getItem('jwtoken') ? signedInItems : signedOutItems

  if (Location.pathname.includes('/signout')) {
    showItems = signingOut
  }

  let theme;
  if (localStorage.getItem("dark")) {
    theme = "dark";
  } else {
    theme = "light";
  }

  const darkModeBG = theme === "dark" ? "#292929" : 'rgb(255 255 255)';
  const LModeBG = theme === "dark" ? "#292929" : 'rgb(255 255 255)';
  const darkModeC = theme === "dark" ? "white" : 'black';
  const transition = 'all 700ms ease-in-out';

  return (
    <>
      <GlobalStyles darkModeBG={darkModeBG} darkModeC={darkModeC} transition={transition} LModeBG={LModeBG} />
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ paddingTop: 20 }}
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
        <Layout className="site-layout Dark">
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
                <Breadcrumb.Item>{userData.username}</Breadcrumb.Item>
              </Breadcrumb>
            ) : ''
            }
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
            className="Dark"
          >
            Designed And Crafted By <a href="https://www.linkedin.com/in/huzidev" target="_blank">Huzaifa Iqbal</a>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};