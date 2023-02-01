import React, { useContext, useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks/hooks';
import { fetchUsers } from '../../../../store/user/userSlice';

export default function About(props: any): JSX.Element {
    const context = useContext(DataContext);
    const { userData } = context;
    const { updateData } = props;

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    console.log("user", user.userData);

    const theme = userData.isTheme ? 'Dark Mode' : 'Light Mode'

    if (userData.isTheme === true) {
        localStorage.setItem("dark", "Dark-Theme");
        localStorage.removeItem("light");
    } else if (userData.isTheme === false) {
        localStorage.setItem("light", "Light-Theme");
        localStorage.removeItem("dark");
    }

    const fontWeight = {
        fontWeight: '500'
    };
    return (
        <>
            <Card
                title={<Typography.Title
                    level={3}>About</Typography.Title>}
                style={{ width: "100%" }}
                className="Dark Border"
            >
                <div>
                    <Typography.Text>
                        <span style={fontWeight}>
                            Description: {" "}
                        </span>
                        {note.description}
                    </Typography.Text>
                    <Typography.Title level={4}>
                        Username: {userData.username}
                    </Typography.Title>
                </div>
                <Typography.Title level={4}>
                    Email: {userData.email}
                </Typography.Title>
                <Typography.Title level={4}>
                    Number: {userData.number}
                </Typography.Title>
                <Typography.Title level={4}>
                    Image: {userData.image}
                </Typography.Title>
                <Typography.Title level={4}>
                    Theme: {theme}
                </Typography.Title>
                <Button onClick={() => { updateData(userData) }} style={{ marginTop: "10px" }} type="ghost">
                    Update Data
                </Button>
            </Card>
        </>
    )
}
