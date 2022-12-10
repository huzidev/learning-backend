import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, notification } from 'antd';
import { 
    LockOutlined, 
    UserOutlined, 
    MailOutlined, 
    ExclamationCircleOutlined, 
    ClockCircleOutlined, 
    CheckCircleOutlined 
} from '@ant-design/icons';
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
    cpassword : "",
    isTheme: false
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

  async function notificationTs(icon: React.ReactNode, message: String, info: String | null) {
    notification.open({
        icon : icon,
        message: message,
        description: info
    });
  }

  const error: React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
  let icon : React.ReactNode
  let title: String;
  let description: String | null;

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    const { username, email, number, password, cpassword, isTheme } = user;
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
            cpassword,
            isTheme
        })
    });

    const data = await res.json();
    if (res.status === 421 || !data) {
        icon = error;
        title = "You've left an tag Empty!"
    } else if (res.status === 422) {
        icon = error;
        title = `Email Already Exist!`
        description = `"${email}" is already taken, Enter New Email`;
    } else if (res.status === 423) {
        icon = error;
        title = `Username Already Exist!`
        description = `"${username}" is already taken, Enter New Username`;
    } else if (res.status === 424) {
        icon = error;
        title = `Number Already Exist!`
        description = `"${number}" is already taken, Enter New Number`;
    } else if (res.status === 425) {
        icon = error;
        title = `Password Error!`
        description = `Password Doesn't match`;
    } else if (res.status === 426) {
        icon = error;
        title = `Username Error!`
        description = `Username character must be greater than 3, You've used only ${username.length} character`;
    } else if (res.status === 427) {
        icon = error;
        title = `Password Error!`
        description = `Password character must be greater than 5, You've used only ${password.length} character`;
    } else if (res.status === 500) {
        icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
        title = `Internal Server Error!`
        description = `Failed To Register, Internal Server Error!`;
    } else {
        icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>
        title = `Registeration Successful!`
        description = `User Registered Successfully`;
        console.log("Registration Successful");
        Navigate("/signin");
    }
    notificationTs(icon, title, description);
  };

  return (
    <div style={{ width: '500px', margin: '11% auto 0px auto'}}>
        <Typography.Title level={2}>
            Signup
        </Typography.Title>
        <Form 
            name="nest-messages" 
        >
            <Input 
                className='Dark'
                name="username"
                value={user.username}
                onChange={inputHandler}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Enter Yours Username"
                required
            />
            <Input 
                className='Dark styleMargin'
                name="email"
                value={user.email}
                onChange={inputHandler}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter Yours Email"
                required
            />
            <Input 
                className='Dark styleMargin'
                name="number"
                value={user.number}
                onChange={inputHandler}
                // prefix={<NumberOutlined className="site-form-item-icon" />}
                prefix = "+92"
                placeholder="Enter Yours Number"
                required
            />
            <Form.Item
                name="password"
                hasFeedback
                className='margin-input'
            >
                <Input.Password
                    className='Dark'
                    name="password"
                    value={user.password}
                    onChange={inputHandler}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter Yours password"
                    required
                />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                className='margin-input'
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
                    className='Dark' 
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
                className='styleMargin' 
            >
                <Button type="primary" htmlType="submit" onClick={signUp}>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
