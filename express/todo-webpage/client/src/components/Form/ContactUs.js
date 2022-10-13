import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

export default function Footer() {

  const [user, setUser] = React.useState({
    username : "",
    email : "",
    number : "",
    message : ""
  })

  let name, value;
  function handleInput(e) {
      name = e.target.name;
      value = e.target.value;
      setUser({ 
          ...user,
          [name] : value 
      });
  }
    
  async function sendMessage(e) {
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
            number,
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
    }
    else if (res.status === 500 || !data) {
        window.alert("Failed To Send Message")
    }
    else {
        window.alert("Message Sent Successfully!")
    }
    setUser({
      username : "",
      email : "",
      number : "",
      message : ""
    })
  }

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'username']}
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
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
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
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item 
        name="number"
        value={user.number}
        onChange={handleInput}
        label="Yours Number"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="message"
        value={user.message}
        onChange={handleInput}
        label="Yours Message"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input.TextArea 
          name="message"
          value={user.message}
          onChange={handleInput}
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