import React from 'react';

export default function Home() {

  const [userName, setUserName] = React.useState('');
  
    const userData = async () => {
      try{
        const res = await fetch('/about', {
          method : "GET",
            headers : {
              Accept : "application/json", // here we are not using POST we are using GEt therefore accept type is application/json for reading
              "Content-Type" : "application/json",
            },
            credentials : "include" // so cookies could reach backend easily
        });
        const data = await res.json();
        setUserName(data); // since we only need username
        }
      catch (err) {
        console.log("Error : ", err);
      }
    }
  React.useEffect(() => {
    userData();
  }, [])

  return (
    <div>
        <h1>
            Home Page
        </h1>
        <h5>
          Welcome {userName.username}
        </h5>
    </div>
  )
}
