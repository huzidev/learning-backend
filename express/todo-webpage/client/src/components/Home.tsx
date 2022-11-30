import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactUs from './Pages/Form/contact/ContactUs'
import DataContext from './Context/DataContext';
import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import SingIn from './Pages/Form/signin/SingIn';
import SignUp from './Pages/Form/signup/SignUp';
import TodoPage from './Pages/Todo/todoPage/TodoPage';
import NotesItems from './Pages/Todo/notes/NotesItems';
import UpdateUser from './Pages/Form/update/UpdateUser';
import SignOut from './Pages/Form/signout/SignOut';
import { GlobalStyles } from './styled-components/Global.styled';

export default function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: string, 
    key: string, 
    icon: any,
    children: any, 
    onClick : any
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

  console.log("currenrt location is "  + Location.pathname);

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

  const signingOut = [
    getItem(
      'Signout', '1', 
      <LoginOutlined />, 
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

    const darkModeBG = theme === "dark" ? "#292929" : theme === "light" ?  "whitesmoke" : '';
    const LModeBG = theme === "dark" ? "#292929" : 'white';
    const darkModeC = theme === "dark" ? "white" : 'black';
    const transition = 'all 700ms ease-in-out';

  return (
    <>
      <GlobalStyles darkModeBG={darkModeBG} darkModeC={darkModeC} transition={transition} LModeBG={LModeBG}/>
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
              {Location.pathname === '/' && <TodoPage />}
              {Location.pathname.includes('/contact') && <ContactUs />}
              {Location.pathname.includes('/signin') && <SingIn />}
              {Location.pathname.includes('/signup') && <SignUp />}
              {Location.pathname.includes('/signout') && <SignOut />}
              {Location.pathname.includes('/note') && <NotesItems />}
              {Location.pathname.includes('/about') && <UpdateUser />}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
            className="Dark"
          >
            Designed And Crafted By <a href="https://www.linkedin.com/in/huzidev/" target="_blank">Huzaifa Iqbal</a>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};