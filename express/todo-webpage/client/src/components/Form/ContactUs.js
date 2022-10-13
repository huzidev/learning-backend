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
    username: '${label} is not a valid username!',
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
        window.location.reload();
    }
  }

  const onFinish = (values) => {
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
          onChange={handleInput}
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
          onChange={handleInput}
          placeholder="Enter Yours Email"
        />
      </Form.Item>
      <Form.Item 
        name={['Number']}
        label="Number"
        rules={[
          {
            type: 'number',
          },
        ]}
      >
        <InputNumber   
          style={{ width: '100%' }}
          name="number"
          value={user.number}
          onChange={handleInput}
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
          onChange={handleInput}
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