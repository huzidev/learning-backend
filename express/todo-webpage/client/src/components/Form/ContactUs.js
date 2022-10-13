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
    

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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
        <Input />
      </Form.Item>
      <Form.Item 
        name={['user', 'number']} 
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
        name={['user', 'message']} 
        label="Yours Message"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};