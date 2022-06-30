import React from 'react'

export default function Alert(props) {

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
        { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert"> 
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>}
    </div>
  )
}