import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography } from 'antd';

export default function SignOut(): JSX.Element {

    const Navigate = useNavigate();

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
              window.alert("Logout successfully")
              Navigate('/', {
                replace : true
              })
              window.location.reload();
            }, 2000000)
        }).catch((err: string) => {
          console.log(err);
        })
      }, [])

    return (
        <div style={{width: '300px', margin: '22% auto'}}>
          <Typography.Title level={1}>
            Logging Out <Spin size='large'/>
          </Typography.Title>
        </div>
    )
}
