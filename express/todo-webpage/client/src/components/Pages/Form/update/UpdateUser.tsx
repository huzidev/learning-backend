import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../../Context/DataContext';
import User from '../about/About';
import { Button, Modal, Form, Input } from 'antd';
import { UserOutlined, MailOutlined, NumberOutlined } from '@ant-design/icons';
import { DataType, DataTypeF } from './Type';

export default function UpdateUser() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    setData({
        id: currData._id, 
        eusername: currData.username,
        eemail: currData.email, 
        enumber: currData.number,
        eimage: currData.image
    })
}

console.log("User data", userData);


    const handleClick = async () => { 

        const {_id, username, email, number, image} = userData
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
                    image: eimage
                })
            });
            if (eusername === "") {
                window.alert("You can't left username field empty")
            } else if (eemail === "") {
                window.alert("You can't left email field empty")
            } else if (enumber === "") {
                window.alert("You can't left number field empty")
            } else if (res.status === 401) {
                window.alert("Username already taken")
            } else if (res.status === 402) {
                window.alert("Email already taken")
            } else if (res.status === 403) {
                window.alert("Number already taken")
            }
            else {
                const data = await res.json();
        
                let newData = JSON.parse(JSON.stringify(userData))
        
                for (let index = 0; index < newData.length; index++) {
                    const element = newData[index];
                    if (element._id === _id) {
                        newData[index].username = username;
                        newData[index].email = email;
                        newData[index].number = number;
                        newData[index].image = image;
                        break; 
                    }
                    setUserData(newData)
                    window.location.reload()
                }
            }
        } catch (err) {
            console.log(err);
        }
        setIsModalOpen(false);
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
        <Modal title="Update Todo" open={isModalOpen} okText="Update" cancelText="Cancel" onOk={handleClick} onCancel={handleCancel}>
            <h1>
                Update User's Info
            </h1>
            <Form>
                <Input 
                    type="text"
                    name='eusername'
                    value={data.eusername}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    onChange={onChange}
                />
                <Input 
                    type="text"
                    name='eemail'
                    value={data.eemail}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    onChange={onChange}
                    style={style}
                />
                <Input 
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
            </Form>
        </Modal>
        <User updateData={updateData} />
    </div>
  )
}
