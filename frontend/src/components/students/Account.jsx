import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Account() {
  document.title = 'CPMS | Account';

  const [data, setData] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:4518/student/detail', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => {
      setData({
        ...data,
        name: res.data.name,
        email: res.data.email,
        profile: res.data.profile
      });
    }).catch((err) => {
      console.log("Account.jsx => ", err);
    });

  }, []);
  
  return (
    <>
      <div className="ml-64 mt-16 p-4 text-xl">
        <div>
          <label htmlFor="Name: ">
            <input disabled type="text" name='first_name' id='first_name' value={data.name} />
          </label>
        </div>
        <div>
          <label htmlFor="Email: ">
            <input disabled type="email" name='email' id='email' value={data.email} />
          </label>
        </div>
        <div>
          <label htmlFor="Profile">
            <input disabled type="input" name='profile' id='profile' value={data.profile} />
          </label>
        </div>



      </div>
    </>
  )
}

export default Account
