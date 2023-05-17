import { CheckCircleOutlined, ExclamationCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, notification } from 'antd';
import React from 'react';
import { contactAction, sendThisMessage } from '../../../../store/form/Contact/contactSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';

export default function Footer(): JSX.Element {
  const contactRes = useAppSelector(state => state.contact)
  const dispatch = useAppDispatch();
  let res: number | null = contactRes.res

  const initialState = {
    username: "",
    email: "",
    number: "",
    message: ""
  }

  const [user, setUser] = React.useState<DataType>(initialState);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  let icon: React.ReactNode;
  let title: string, field: string, info: string | null;

  const { username, email, message } = user;
  if (username === "") {
    dispatch(contactAction.receiveTEst(422));
    field = "Username";
  } else if (email === "") {
    dispatch(contactAction.receiveTEst(423));
    field = "Email";
  } else if (message === "") {
    dispatch(contactAction.receiveTEst(424))
    field = "Message";
  } else {
    dispatch(contactAction.receiveTEst(200))
  }

  function sendMessage() {
    dispatch(sendThisMessage(user))
    if (res === 422 || 423 || 424) {
      icon = <ExclamationCircleOutlined style={{ color: '#FF0000' }} />;
      title = `Empty Field`;
      info = `You've Left ${field} Field Empty!`;
    }  
    if (res === 200) {
      icon = <CheckCircleOutlined style={{ color: '#00FF00' }} />;;
      title = "Message Sent Successfully!";
      info = null;
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
    function openNotification() {
      notification.open({
        icon: icon,
        message: title,
        description: info
      });
    }
    openNotification();
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
          onChange={onChange}
          prefix={<UserOutlined className="site-form-item-icon" style={style} />}
          placeholder="Enter Yours Username"
        />
        <Input
          className='Dark styleMargin'
          type='email'
          name="email"
          value={user.email}
          onChange={onChange}
          placeholder="Enter Yours Email"
          prefix={<MailOutlined className="site-form-item-icon" style={style} />}
          required
        />
        <Input
          className='Dark styleMargin'
          type='number'
          name="number"
          value={user.number}
          onChange={onChange}
          placeholder="Enter Yours Number (Optional)"
          prefix='+92'
        />
        <Input.TextArea
          className='Dark styleMargin'
          name="message"
          value={user.message}
          onChange={onChange}
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