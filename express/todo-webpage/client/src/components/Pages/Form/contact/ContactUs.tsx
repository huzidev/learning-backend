import { Button, Form, Input, Typography, notification } from 'antd';
import React from 'react';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';
import { UserOutlined, MailOutlined } from '@ant-design/icons';


export default function Footer(): JSX.Element {
  const [user, setUser] = React.useState<DataType>({
    username : "",
    email : "",
    number : "",
    message : ""
  })

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      setUser({ 
          ...user,
          [e.target.name] : e.target.value 
      });
  }
    
  async function notificationTs(icon: React.ReactNode, message: String, info: String | null) {
    notification.open({
        icon : icon,
        message: message,
        description: info
    });
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const { username, email, number, message } = user;
    const res = await fetch("/contact", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username,
            email,
            number: parseInt(number),
            message
        })
      });
      const data = await res.json();
      if (res.status === 422) {
        window.alert("Username must be provide")
      } else if (res.status === 423) {
        window.alert("Email must be provide")
      } else if (res.status === 424) {
        window.alert("Mesasge field is empty")
      } else if (res.status === 500 || !data) {
        window.alert("Failed To Send Message")
      } else {
        window.alert("Message Sent Successfully!");
    }
  }

  const style = {padding: '0px 5px'}

  return (
    <div style={{ width: '700px', margin: '5% auto 0px auto'}}>
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
              prefix={<MailOutlined className="site-form-item-icon"  style={style} />}
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
            />
            <Button className='styleMargin' type="primary" htmlType="submit" onClick={sendMessage}>
              Send Message
            </Button>
        </Form>
    </div>
  );
};