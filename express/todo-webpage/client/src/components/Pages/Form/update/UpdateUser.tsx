import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../../Context/DataContext';
import User from '../about/About';
import { Button, Modal, Form, Input, Typography, notification } from 'antd';
import { UserOutlined, MailOutlined, NumberOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { DataType } from './Type';

export default function UpdateUser() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<any>(null);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const context = useContext(DataContext);

  const { setUserData, userData } = context;

  const ref = useRef<any>(null)

  const [data, setData] = useState<DataType>({id: "", eusername: "", eemail: "", enumber: "", eimage: ""})


  const updateData = (currData: any) => {
    ref.current.click();
    setIsChecked(currData.isTheme)
    setData({
        id: currData._id, 
        eusername: currData.username,
        eemail: currData.email, 
        enumber: currData.number,
        eimage: currData.image
    })
}


    function stateChanger() {
        setIsChecked(!isChecked)
    }

    let error: any = <ExclamationCircleOutlined style={{ color: '#FF0000' }}/>;
    let icon : any
    let title: String;
    let description: String | null;

    const handleClick = async () => { 

        const {_id, username, email, number, isTheme} = userData
        const {eusername, eemail, enumber, eimage} = data

        try {
            const res = await fetch(`/updateuser/${_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    username: eusername, 
                    email: eemail, 
                    number: enumber, 
                    image: eimage,
                    isTheme: isChecked
                })
            });
            async function openNotification() {
                notification.open({
                  icon : icon,
                  message: title,
                  description: description
                });
              };
              const text = eusername === "" ? "username" : eemail === "" ? "email" : "number"
            if (eusername === "" || eemail === "" || enumber === "") {
                icon = error;
                title = "Empty Field";
                description = `You can't left ${text} field empty`
            } else if (eusername === username && eemail === email && enumber === number && isTheme === isChecked) {
                icon = error;
                title = "Same Data";
                description = `Nothing New To Update All Values Are Same As Before`
            } else if (isTheme === !isChecked) {
                icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
                title = "Theme Updated";
                description = `Yours Theme Has Been Changed to ${isChecked ? "Dark Mode" : "Light Mode"}`
            } else {
                icon = <CheckCircleOutlined style={{ color: '#00FF00' }}/>;
                title = "Success!";
                description = "Yours Data Have Been Updated Successfully!"
                const data = await res.json();
                let newData = JSON.parse(JSON.stringify(userData))
                for (let index = 0; index < newData.length; index++) {
                    const element = newData[index];
                    if (element._id === _id) {
                        newData[index].username = username;
                        newData[index].email = email;
                        newData[index].number = number;
                        break; 
                    }
                    setUserData(newData);
                }
            }
            openNotification();
        } catch (err) {
            console.log(err);
        }
        setIsModalOpen(false);
        setTimeout(() => {
            window.location.reload()
        }, 2500);
    }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
}

const handlePhoto = (e: any) => {
    setData({...data, eimage: e.target.files[0]});
}

    const style = {
        marginTop : "20px"
    }

  return (
        <div>
            <Button style={{display: "none" }} ref={ref} type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Update Info" open={isModalOpen} okText="Update" cancelText="Cancel" onOk={handleClick} onCancel={handleCancel}>
                <Form>
                    <Input 
                        className="Dark"
                        type="text"
                        name='eusername'
                        value={data.eusername}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        onChange={onChange}
                    />
                    <Input 
                        className="Dark"
                        type="text"
                        name='eemail'
                        value={data.eemail}
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        onChange={onChange}
                        style={style}
                    />
                    <Input 
                        className="Dark"
                        type="text"
                        name='enumber'
                        value={data.enumber}
                        prefix={<NumberOutlined className="site-form-item-icon" />}
                        onChange={onChange}
                        style={style}
                    />
                    <Input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="eimage"
                        onChange={handlePhoto}
                        style={style}
                    />
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <input 
                            type="checkbox"
                            checked= {isChecked}
                            onChange= {stateChanger}
                        />
                        <Typography.Title level={5} style={{ margin: '0px 0px 0px 10px' }}>
                            {isChecked ? "Dark Mode" : "Light Mode"}
                        </Typography.Title>
                    </div>
                </Form>
            </Modal>
            <User updateData={updateData} />
        </div>
  )
}
