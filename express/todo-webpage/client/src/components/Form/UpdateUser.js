import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext';
import User from '../User';
import { Button, Modal, Select  } from 'antd';
import Test from './Test';
import { current } from '@reduxjs/toolkit';

export default function UpdateUser() {

    const { Option } = Select;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    const context = useContext(DataContext);
  const Navigate = useNavigate();

  const { updateUser } = context;

  const ref = useRef(null)
  const refClose = useRef(null)

  const [data, setData] = useState({id: "", eusername: "", eemail: "", enumber: "", eimage: ""})


  const updateData = (currData) => {
    ref.current.click();
    setData({
        id: currData._id, 
        eusername: currData.username,
        eemail: currData.email, 
        enumber:currData.number,
        eimage: currData.image
    })
}

    const handleClick = (e)=>{ 
        setIsModalOpen(false);
        updateUser(data.id, data.eusername, data.eemail, data.enumber)
        window.location.reload();
    }

  const onChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
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
            <form>
                <input 
                    type="text"
                    name='eusername'
                    value={data.eusername}
                    onChange={onChange}
                />
                <input 
                    type="text"
                    name='eemail'
                    value={data.eemail}
                    onChange={onChange}
                />
                <input 
                    type="text"
                    name='enumber'
                    value={data.enumber}
                    onChange={onChange}
                />
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto}
                />
            </form>
        </Modal>
        <User updateData={updateData} />
    </div>
  )
}
