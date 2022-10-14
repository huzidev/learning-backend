import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

export default function SingIn() {

  const Navigate = useNavigate();

  const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
        username: '${label} is not a valid username!',
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    password: {
        range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [user, setUser] = React.useState({
    username: "",
    number : "",
    email: "",
    password : ""
  });


  let name, value;
  function inputHandler(e) {
    name= e.target.name;
    value= e.target.value;
    setUser({
        ...user,
        [name]: value
    });
  };

  async function signIn(e) {
    e.preventDefault();

    const { email, number, password } = user;

    const res = await fetch(`/signin`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email,
        number,
        password
      })
    });
    
    const data = await res.json();
    if (!data) {
      window.alert("Invalid Value!")
    } else if (res.status === 400) {
      window.alert("Email or Password is incorrect")
    } else if (res.status === 401) {
      window.alert("Username or Password is incorrect")
    } else if (res.status === 402) {
      window.alert("Number or Password is incorrect")
    } else if (res.status === 500) {
      window.alert("Internal Server Error : Failed to registered!")
    }
    else {
      window.alert("LoggedIn Successfully!");
      localStorage.setItem('jwtoken', data.token);
      Navigate('/');
    }
  }

  const onFinish = (values) => {
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
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
    </div>
  )
}
