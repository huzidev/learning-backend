import React from 'react'

export default function Test() {
  return (
    <div>
        <h1>
            Update User's Info
        </h1>
        <form>
            <input 
                type="text"
                name='eusername'
                value={data.eusername}
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='eemail'
                value={data.eemail}
                onChange={onChange}
                required 
            />
            <input 
                type="text"
                name='enumber'
                value={data.enumber}
                onChange={onChange}
                required 
            />
        </form>
    </div>
  )
}
