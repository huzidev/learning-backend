import { Button, Form, Input, Typography, notification } from 'antd';
import { ExclamationCircleOutlined, ClockCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons';
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
    
  async function notificationTs(icon: React.ReactNode, title: String, info: String | null) {
    notification.open({
        icon : icon,
        message: title,
        description: info
    });
  }

  let error : React.ReactNode = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
  let icon : React.ReactNode;
  let title : String;
  let info : String | null;

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
      let text: any;
      let status: any = res.status === 422 ? text = "Username Error" : res.status === 423 ? text = "Email Error" : res.status === 424 ? text = "Message Field Empyty!" : null 
      if (status) {
        icon = error;
        title = text;
        info = `Username must be provide`;
      } 
      // else if (res.status === 423) {
      //   window.alert("Email must be provide")
      //   icon = error;
      //   title = `Email Error`;
      //   info = `Email must be provide`;
      // } else if (res.status === 424) {
      //   icon = error;
      //   title = `Message Field Empty`;
      //   info = `Write atleasts 10 characters`;
      // } 
      else if (res.status === 500 || !data) {
        icon = <ClockCircleOutlined style={{ color: '#FF0000' }}/>;
        title = `Server Error`;
        info = `Failed To Send Message, Internal Server Error!`;
      } else {
        icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>
        title = `Message Sent Successfully!`
    }
    notificationTs(icon, title, info);
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
              minLength={10}
            />
            <Button className='styleMargin' type="primary" htmlType="submit" onClick={sendMessage}>
              Send Message
            </Button>
        </Form>
    </div>
  );
};