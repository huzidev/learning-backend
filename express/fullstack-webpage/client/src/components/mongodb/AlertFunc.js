import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertFunc(props) {
    
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }


    return (
        <div>
        {/* here we are adding class respective to the type if type is danger then we'll run the class which is been created acc to 
        danger in ours css file */}
            { 
                props.alert 
                    ? (
                        <Alert severity={`error`} className={`alert alert-${props.alert.type}`} role="alert">
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
