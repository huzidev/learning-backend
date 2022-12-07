import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, notification } from 'antd';
import { LockOutlined, UserOutlined, ExclamationCircleOutlined, SettingOutlined, CheckCircleOutlined  } from '@ant-design/icons';
import layout from './Layout';
import { DataType } from './Type';

export default function SingIn() {
  const Navigate = useNavigate();
  const [user, setUser] = React.useState<DataType>({ email: "", password : "" });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ 
      ...user, 
      [e.target.name]: e.target.value 
    });
  };

  let error: any = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
  let icon : any
  let title: String;
  let description: String | null;

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch(`/signin`, {
      method : "POST",
      headers : { 
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data || res.status === 421) {
      icon = error;
      title = "You've left an tag Empty!";
    } else if (res.status === 422) {
      icon = error;
      title = `Email Not Found`;
      description = `"${email}" Doesn't Found`;
    } else if (res.status === 423) {
      icon = error;
      title = `Wrong Password`;
      description = `"${email}" Doesn't Found`;
    } else if (res.status === 500) {
      window.alert("Internal Server Error : Failed to registered!")
    } else if (res.status === 201) {
      window.alert("LoggedIn Successfully!");
      localStorage.setItem('jwtoken', data.token);
      Navigate('/');
      window.location.reload();
    }
    async function openNotification() {
      notification.open({
        icon : icon,
        message: title,
        description: description
      });
    };
  openNotification()
  }
  return (
    <div style={{ width: '500px', margin: '15% auto 0px auto'}}>
      <Form name="nest-messages">
        <Typography.Title level={2}> Singin </Typography.Title>
          <Input 
            className='Dark'
            name='email'
            value={user.email}
            onChange={inputHandler}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email" 
            required
          />
          <Input.Password
            className='Dark styleMargin'
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={user.password}
            onChange={inputHandler}
            placeholder="Password"
            required
          />
          <div className='styleMargin'>
            <Typography.Text>
              Don't have an account? <Link to='/signup'>Signup</Link>
            </Typography.Text>
          </div>
        <div>
          <Button 
            type="primary" 
            htmlType="submit"
            onClick={signIn}
            style={{ marginTop: '10px' }}
            className="login-form-button"
          >
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  )
}
