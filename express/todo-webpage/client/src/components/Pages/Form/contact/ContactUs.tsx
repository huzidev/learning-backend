import { Button, Form, Input, Typography, notification } from 'antd';
import { ExclamationCircleOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { sendThisMessage, contactAction } from '../../../../store/form/Contact/contactSlice';

export default function Footer(): JSX.Element {
  const contactRes = useAppSelector(state => state.contact)
  const dispatch = useAppDispatch();
  let res: number | null = contactRes.res

  const [user, setUser] = React.useState<DataType>({
    username: "",
    email: "",
    number: "",
    message: ""
  })

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function notificationTs(icon: React.ReactNode, title: String, info: String | null) {
    notification.open({
      icon: icon,
      message: title,
      description: info
    });
  }

  let error: React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }} />;
  let icon: React.ReactNode;
  let title: string, description: string, text: string, holdType: string;
  let info: string | null;

  const { username, email, message } = user;
  if (username === "") {
    dispatch(contactAction.receiveTEst(421));
    holdType = "username";
  } else if (email === "") {
    dispatch(contactAction.receiveTEst(422));
    holdType = "email";
  } else if (message === "") {
    dispatch(contactAction.receiveTEst(423))
  } else {
    dispatch(contactAction.receiveTEst(200))
  }

  function sendMessage() {
    dispatch(sendThisMessage(user))
    let status: any = res === 42 ? (
      text = "Username Is Missing"
    ) : res === 423 ? (
      text = "Email Is Missing"
    ) : res === 424 ? (
      text = "Message Is Field Empty!"
    ) : null
    if (status) {
      icon = error;
      title = text;
      info = description;
    }
    if (res === 421 || 422 || 423) {
      icon = <ExclamationCircleOutlined style={{ color: '#FF0000' }} />;
      title = `Empty Field`;
      info = `You've Left ${holdType} Field Empty!`;
    }  
    else if (res === 200) {
      icon = <CheckCircleOutlined style={{ color: '#00FF00' }} />;;
      title = "Message Sent Successfully!";
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      icon = <ClockCircleOutlined style={{ color: '#FF0000' }} />;;
      title = "Server Error!";
      info = "Failed To Send Message, Internal Server Error"
    }
    notificationTs(icon, title, info);
  }

  const style = { padding: '0px 5px' }

  return (
    <div style={{ width: '700px', margin: '5% auto 0px auto' }}>
      <Typography.Title level={2}>
        Contact Us
      </Typography.Title>
      <Form {...layout} name="nest-messages">
        <Input
          className='Dark'
          type='text'
          name="username"
          value={user.username}
          onChange={inputHandler}
          prefix={<UserOutlined className="site-form-item-icon" style={style} />}
          placeholder="Enter Yours Username"
        />
        <Input
          className='Dark styleMargin'
          type='email'
          name="email"
          value={user.email}
          onChange={inputHandler}
          placeholder="Enter Yours Email"
          prefix={<MailOutlined className="site-form-item-icon" style={style} />}
          required
        />
        <Input
          className='Dark styleMargin'
          type='number'
          name="number"
          value={user.number}
          onChange={inputHandler}
          placeholder="Enter Yours Number (Optional)"
          prefix='+92'
        />
        <Input.TextArea
          className='Dark styleMargin'
          name="message"
          value={user.message}
          onChange={inputHandler}
          placeholder="Enter Yours Message"
          minLength={10}
        />
        <Button className='styleMargin' type="primary" htmlType="submit" onClick={sendMessage}>
          Send Message
        </Button>
      </Form>
    </div>
  );
};