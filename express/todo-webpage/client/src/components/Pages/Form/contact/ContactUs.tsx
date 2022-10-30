import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
import layout from '../../../Layout/Layout';
import { DataType } from './Type';


export default function Footer() {
  const [user, setUser] = React.useState<DataType>({
    username : "",
    email : "",
    number : "",
    message : ""
  })

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
      setUser({ 
          ...user,
          [e.target.name] : e.target.value 
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

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['Username']}
        label="Name"
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
        name={['Number']}
        label="Number"
      >
        <InputNumber   
          name="number"
          value={user.number}
          onChange={inputHandler}
          style={{ width: '100%' }}
          placeholder="Enter Yours Number (Optional)"
        />
      </Form.Item>
      <Form.Item 
        name={['Message']}
        label="Message"
        rules={[
          {
            required: true,
            min: 0,
            max: 255
          },
        ]}
      >
        <Input.TextArea 
          name="message"
          value={user.message}
          onChange={inputHandler}
          placeholder="Enter Yours Message"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={sendMessage}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};