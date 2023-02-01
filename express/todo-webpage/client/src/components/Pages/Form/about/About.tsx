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
    const user = useAppSelector(state => state.user);
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const theme = userData.isTheme ? 'Dark Mode' : 'Light Mode';

    if (userData.isTheme === true) {
        localStorage.setItem("dark", "Dark-Theme");
        localStorage.removeItem("light");
    } else if (userData.isTheme === false) {
        localStorage.setItem("light", "Light-Theme");
        localStorage.removeItem("dark");
    }

    const font = {
        fontSize: '20px'
    }

    const fontSize = {
        fontSize: '20px',
        letterSpacing: '1.2px'
    }

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
                        <span style={font} className="fontWeight">
                            Username: {" "}
                        </span>
                        <span style={fontSize}>
                            {userData.username}
                        </span>
                    </Typography.Text>
                </div>
                <div className='marginTop'>
                    <Typography.Text>
                        <span style={font} className="fontWeight">
                            Email: {" "}
                        </span>
                        <span style={fontSize}>
                            {userData.email}
                        </span>
                    </Typography.Text>
                </div>
                <div className='marginTop'>
                    <Typography.Text>
                        <span style={font} className="fontWeight">
                            Number: {" "}
                        </span>
                        <span style={fontSize}>
                            {userData.number}
                        </span>
                    </Typography.Text>
                </div>
                <div className='marginTop'>
                    <Typography.Text>
                        <span style={font} className="fontWeight">
                            Image: {" "}
                        </span>
                        <span style={fontSize}>
                            {userData.image}
                        </span>
                    </Typography.Text>
                </div>
                <div className='marginTop'>
                    <Typography.Text>
                        <span style={font} className="fontWeight">
                            Theme: {" "}
                        </span>
                        <span style={fontSize}>
                            {theme}
                        </span>
                    </Typography.Text>
                </div>
                <Button onClick={() => { updateData(userData) }} className='marginTop' type="ghost">
                    Update Data
                </Button>
            </Card>
        </>
    )
}
