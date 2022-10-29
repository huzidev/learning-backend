import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import layout from '../../../Layout/Layout';

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
        password: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
  /* eslint-enable no-template-curly-in-string */

    interface DataTypes {
        username: string,
        email: string,
        number: string,
        password: string,
        cpassword: string
    }

  const [user, setUser] = React.useState<DataTypes>({
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
  
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div>
        <h1>
            Signup
        </h1>
        <Form 
            {...layout} 
            name="nest-messages" 
            onFinish={onFinish} 
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={['Username']}
                label="Username"
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
                    placeholder="Enter Yours Username"
                />
            </Form.Item>
            <Form.Item
                name={['Email']}
                label="Email"
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
                    placeholder="Enter Yours Email"
                />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
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
                    placeholder="Enter Yours Number"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
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
                    placeholder="Enter Yours password"
                />
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
                    placeholder="Confirm Yours Password"
                />
            </Form.Item>
            <Form.Item
                    wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit" onClick={signUp}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
