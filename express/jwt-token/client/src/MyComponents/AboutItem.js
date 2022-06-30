// import React, {useContext} from 'react'
// import aboutContext from "../context/notes/aboutContext"

import React from 'react'

export default function AboutItem(props) {
    // const context = useContext(aboutContext);
    const { data, setData } = props;

  return (
    <div>
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{data.title}</h5>
                    </div>
                    <p className="card-text">{data.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
