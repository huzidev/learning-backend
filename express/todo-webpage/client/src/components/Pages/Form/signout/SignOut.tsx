import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography, notification } from 'antd';
import { CheckCircleOutlined  } from '@ant-design/icons';

export default function SignOut(): JSX.Element {

    const Navigate = useNavigate();
  
    async function openNotification() {
      notification.open({
        icon : <CheckCircleOutlined style={{ color: '#00FF00' }}/>,
        message: "Logout Successfully"
      });
    };

    React.useEffect(() => {
        fetch('/signout', {
          method : 'GET',
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
          },
          credentials : "include"
        }).then((res: Response) => {
            localStorage.removeItem('jwtoken')
            setTimeout(() => {
              Navigate('/', {
                replace : true
              })
            {openNotification()}
            }, 2000)
        }).catch((err: string) => {
          console.log(err);
        })
      }, [])

    return (
        <div style={{width: '300px', margin: '20% auto'}}>
          <Typography.Title level={1}>
            Logging Out <Spin size='large'/>
          </Typography.Title>
        </div>
    )
}
