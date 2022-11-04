import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined, NumberOutlined, MailOutlined } from '@ant-design/icons';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const Navigate = useNavigate();
  const host = "http://localhost:8000";

  const [user, setUser] = React.useState<DataType>({
    username : "",
    email : "",
    number : "",
    password : "",
    cpassword : ""
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

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    const { username, email, number, password, cpassword } = user;
    const res = await fetch(`${host}/signup`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            number: parseInt(number),
            password,
            cpassword 
        })
    });

    const data = await res.json();
    if (res.status === 421 || !data) {
        window.alert("You've left an tag empty")
    } else if (res.status === 422) {
        window.alert("Email already Exist")
    } else if (res.status === 423) {
        window.alert("Username already Exist")
    } else if (res.status === 424) {
        window.alert("Number already Exist")
    } else if (res.status === 425) {
        window.alert("Password doesn't match")
    } else if (res.status === 426) {
        window.alert(`Username's length must be greater than 2 character and you've used just ${username.length} characters`)
    } else if (res.status === 427) {
        window.alert(`Password's length must be greater than 2 character and you've used just ${password.length} values`)
    } else if (res.status === 500) {
        window.alert("Internal Server Error : Failed to registered!")
    } else {
        window.alert("User registered successfully!")
        console.log("Successful Registration");
        Navigate("/signin");
    }
  };
  return (
    <div style={{ width: '500px', margin: '11% auto 0px auto'}}>
        <Typography.Title level={2}>
            Signup
        </Typography.Title>
        <Form 
            name="nest-messages" 
        >
            <Form.Item
                name={['Username']}
                rules={[
                    {
                        required: true,
                    },
                ]}
                >
                <Input 
                    name="username"
                    value={user.username}
                    onChange={inputHandler}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Enter Yours Username"
                />
            </Form.Item>
            <Form.Item
                name={['Email']}
                rules={[
                    {
                        type: 'email',
                        required: true
                    },
                ]}
            >
                <Input 
                    name="email"
                    value={user.email}
                    onChange={inputHandler}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Enter Yours Email"
                />
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[
                    { 
                        required: true, 
                        message: 'Please input your phone number!' 
                    }
                ]}
            >
                <Input 
                    name="number"
                    value={user.number}
                    onChange={inputHandler}
                    style={{ width: '100%' }}
                    prefix={<NumberOutlined className="site-form-item-icon" />}
                    placeholder="Enter Yours Number"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password
                    name="password"
                    value={user.password}
                    onChange={inputHandler}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter Yours password"
                />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                style={{ marginBottom: '10px' }}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password 
                    name="cpassword"
                    value={user.cpassword}
                    onChange={inputHandler}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm Yours Password"
                />
            </Form.Item>
            <Typography.Text>
                Already have an account? <Link to='/signin'>Signin</Link>
            </Typography.Text>
            <Form.Item
                style={{ marginTop: '10px' }}
            >
                <Button type="primary" htmlType="submit" onClick={signUp}>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
