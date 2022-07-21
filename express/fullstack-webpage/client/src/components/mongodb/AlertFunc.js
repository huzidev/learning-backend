import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertFunc(props) {
    
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        else if (word === "warning") {
            word = "warning"
        }
        else if (word === "success") {
            word = "success"
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }

    let setType = 
        props.alert 
            ? (
                props.alert.type 
            )
            : ''

    
    return (
        <div>
        {/* here we are adding class respective to the type if type is danger then we'll run the class which is been created acc to 
        danger in ours css file */}
            { 
                props.alert 
                    ? (
                        <Alert severity={`${setType}`} className={`alert alert-${props.alert.type}`} role="alert">
                            <AlertTitle>
                                {capitalize(props.alert.type)}
                            </AlertTitle>
                            {props.alert.msg}
                        </Alert>
                    ) 
                    : ''
            }
        </div>
    )
}
