import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';

export default function SignUp() {
  const Navigate = useNavigate();
  const host = "http://localhost:8000";

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
        username: '${label} is not a valid username!',
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        },
        number: {
        range: '${label} must be between ${min} and ${max}',
        },
    };
  /* eslint-enable no-template-curly-in-string */

  const [user, setUser] = React.useState({
    username : "",
    email : "",
    number : "",
    password : "",
    cpassword : ""
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

  async function signUp(e) {

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
            number: parseInt(user.number),
            password,
            cpassword 
        })
    });

    const data = await res.json();

    if (res.status === 421 || !data) {
        window.alert("Invalid Value")
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
  
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
  return (

    <div>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: 'Please input your number!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!', min: 6 }]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
                min: 6
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
            <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={signUp}>
                Submit
            </Button>
        </Form.Item>
        </Form>
    </div>
  )
}
