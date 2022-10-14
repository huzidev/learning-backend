import React from 'react'

export default function Logout() {

  React.useEffect(() => {
    fetch('/signout', {
      
    })
  }, [])
  return (
    <div>
      Logging Out
    </div>
  )
}
