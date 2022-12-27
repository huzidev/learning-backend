import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, notification } from 'antd';
import { 
  LockOutlined, 
  UserOutlined, 
  ExclamationCircleOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined  
} from '@ant-design/icons';
import { DataType } from './Type';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { signInUser, signinAction } from '../../../../store/form/Signin/signinSlice';

export default function SingIn() {
  const Navigate = useNavigate();
  const signinRes = useAppSelector(state => state.signin)
  const dispatch = useAppDispatch();
  let res: number | null = signinRes.res
  let data: string | null = signinRes.data
  const [user, setUser] = React.useState<any>({ email: "", password : "" });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ 
      ...user, 
      [e.target.name]: e.target.value 
    });
  };

  let error: React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
  let icon : React.ReactNode
  let message: string;
  let info: string | null;

  async function notificationTs(icon: React.ReactNode, message: string, info: string | null) {
    notification.open({
        icon : icon,
        message: message,
        description: info
    });
  }

  const { email, password } = user;
  if (email === "" || password === "") {
    dispatch(signinAction.receiveTEst(421))
  } else if (password === "") {
    dispatch(signinAction.receiveTEst(423))
  }  else if (email && password !== "") {
    dispatch(signinAction.receiveTEst(200))
  }

  console.log("what is token from ts code", data);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    dispatch(signInUser(user))
    // const { email, password } = user;
    // const res = await fetch(`/signin`, {
    //   method : "POST",
    //   headers : { 
    //     "Content-Type" : "application/json" 
    //   },
    //   body : JSON.stringify({ email, password })
    // });
    // const data = await res.json();
    if (res === 421) {
      icon = error;
      message = "You've Left Email Field Empty!";
    } else if (res === 422 || res === 423) {
      icon = error;
      message = `Error`;
      info = `Email or Password Is Incorrect!`;
    } else if (res === 500) {
      icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
      message = `Server Error`;
      info = `Failed To Signin, Internal Server Error!`;
    } else {
      // localStorage.setItem('jwtoken', data.token);
      console.log("Signin Successful");
      icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>
      message = `Signin Successful!`
      info = `User Signedin Successfully`;
      Navigate('/');
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000)
    }
    notificationTs(icon, message, info);
  }
  return (
    <div style={{ width: '500px', margin: '15% auto 0px auto'}}>
      <Form name="nest-messages">
        <Typography.Title level={2}> Singin </Typography.Title>
          <Input 
            className='Dark'
            name='email'
            value={email}
            onChange={inputHandler}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email" 
            required
          />
          <Input.Password
            className='Dark styleMargin'
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={password}
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
