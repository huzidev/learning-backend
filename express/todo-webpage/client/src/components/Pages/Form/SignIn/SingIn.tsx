import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';

export default function SingIn() {

  const Navigate = useNavigate();
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
    password: {
        range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [user, setUser] = React.useState<DataType>({
    email: "",
    password : ""
  });


  let name, value;
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    name= e.target.name;
    value= e.target.value;
    setUser({
        ...user,
        [name]: value
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
      body : JSON.stringify({
        email,
        password
      })
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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
        <h1>
          Singin
        </h1>
        <Form 
            {...layout} 
            name="nest-messages" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input 
              name='email'
              value={user.email}
              onChange={inputHandler}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email" 
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              name='password'
              value={user.password}
              onChange={inputHandler}
              placeholder="Password"
            />
          </Form.Item>
          <Typography.Text>
            Don't have an account? <Link to='/signup'>Signup</Link>
          </Typography.Text>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={signIn} 
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}