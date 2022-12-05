import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
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
    if (!data) {
      window.alert("Invalid Value!")
    } else if (res.status === 400) {
      window.alert("Email or Password is incorrect")
    } else if (res.status === 500) {
      window.alert("Internal Server Error : Failed to registered!")
    } else if (res.status === 201) {
      window.alert("LoggedIn Successfully!");
      localStorage.setItem('jwtoken', data.token);
      Navigate('/');
      window.location.reload();
    }
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
