import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { signUpUser, signupAction } from '../../../../store/form/Signup/signupSlice';
import { testRes } from '../../../../store/form/Signup/signupSlice';

export default function SignUp() {
    const dispatch = useAppDispatch();
    const signUpRes = useAppSelector(state => state.signup);
    let res: number | null = signUpRes.res;
    const [state, testState] = useState(false)
  const Navigate = useNavigate();

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

  useEffect(() => {
      dispatch(signUpUser(user))
  }, [state])

  async function notificationTs(icon: React.ReactNode, message: string, info: string | null) {
    notification.open({
        icon : icon,
        message: message,
        description: info
    });
  }

  const { username, email, number, password, cpassword, isTheme } = user;

  console.log("STATUS TS CODE", res);
  console.log("RES TS CODE", testRes);

  const error: React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
  let icon : React.ReactNode
  let title: string, field: any;
  let description: string | null;

    let inputType: string = username === "" ? "Username" : email === "" ? "Email" : number === "" ? "Number" : password === "" ? "Password" : cpassword === "" ? "Confirm Password" : ""
    if (inputType) {
        dispatch(signupAction.receiveTEst(421))
        field = inputType
    } 
    // else if (username !== "" && username.length < 3) {
    //     dispatch(signupAction.receiveTEst(426));
    // }
    // else if (password !== cpassword) {
        //     dispatch(signupAction.receiveTEst(425));
        // } 
        // else if (username.length < 3) {
            //     dispatch(signupAction.receiveTEst(426));
            // } 
            // else if ((password || cpassword) !== "" && (password.length || cpassword.length) < 6) {
                //     dispatch(signupAction.receiveTEst(427));
                // }
                
    if (testRes !== undefined) {
        res = testRes
    }

  function signUp() {
    testState(!state)
    if (res === 421) {
        icon = error;
        title = `You've left ${field} Field Empty`
    } 
    else if (res === 422) {
        icon = error;
        title = `Username Already Exist!`
        description = `"${username}" is already taken, Enter New Username`;
    } 
    else if (res === 423) {
            icon = error;
        title = `Email Already Exist!`
        description = `"${email}" is already taken, Enter New Email`;
    } else if (res === 424) {
        icon = error;
        title = `Number Already Exist!`
        description = `"${number}" is already taken, Enter New Number`;
    } 
    else if (res === 425) {
        icon = error;
        title = `Password Error!`
        description = `Password Doesn't match`;
    } 
    else if (res === 426) {
        icon = error;
        title = `Username Error!`
        description = `Username must be 3 characters Long, You've used only ${username.length === 1 ? `${username.length} character` : `${username.length} characters`}`;
    } 
    else if (res === 427) {
        icon = error;
        title = `Password Error!`
        description = `Password must be 6 characters Long, You've used only ${password.length === 1 ? `${password.length} character` : `${password.length} characters`}`;
    }
    //  else if (res.status === 500) {
    //     icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
    //     title = `Internal Server Error!`
    //     description = `Failed To Register, Internal Server Error!`;
    // } 
    if (res === 200) {
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
                value={username}
                onChange={inputHandler}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Enter Yours Username"
                required
            />
            <Input 
                className='Dark styleMargin'
                name="email"
                value={email}
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
                    value={password}
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
                    value={cpassword}
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
