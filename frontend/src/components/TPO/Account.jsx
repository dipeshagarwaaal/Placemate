import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { RiKeyFill } from "react-icons/ri";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from '../Toast';

function Account() {
  document.title = 'CPMS | Account';
  const BASE_URL = "http://localhost:4518";

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4518/user/detail', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Account.jsx => ", error);
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const handleBasicDetailChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleBasicDetailSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:4518/student/update-basic-detail",
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setToastMessage(response.data.msg);
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.message);
      setShowToast(true);
      console.log("handleBasicDetailSubmit => ", error);
    }
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImgs', file);
      formData.append('userId', data.id);

      try {
        // const token = localStorage.getItem('token');
        const response = await axios.post("http://localhost:4518/student/upload-photo", formData
          // , {
          // headers: {
          //   'Authorization': `Bearer ${token}`,
          //   'Content-Type': 'multipart/form-data'
          // }}
        );
        setToastMessage(response.data.msg);
        setShowToast(true);
        // updating data so dont require refresh
        setData({ ...data, profile: response.data.file });
      } catch (error) {
        setToastMessage(error.message);
        setShowToast(true);
        console.error('Error uploading photo:', error);
      }
    }
  }

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for passwords
  const [passData, setPassData] = useState({
    oldpass: "",
    newpass: "",
    newcfmpass: "",
    error: "",
  });

  const handlePassChange = (e) => setPassData({ ...passData, [e.target.name]: e.target.value })

  // password update
  const handlePassUpdate = (e) => {
    e.preventDefault();

    if (!passData.oldpass || !passData.newpass || !passData.newcfmpass) return setPassData({ ...passData, error: "All Field Requied!" });

    // if newpass and newcfmpass is matching or not
    if (passData.newpass != passData.newcfmpass) return setPassData({ ...passData, error: "new password and confirm new password didn't matched" });

    try {
      const token = localStorage.getItem('token');
      const response = axios.post("http://localhost:4518/student/changepass",
        passData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      response.then((res) => setPassData({ ...passData, error: res.data }));
    } catch (error) {
      console.log("Account.jsx updatepass =>", error);
      setPassData({ ...passData, error: error.message });
    }
  }  

  console.log(BASE_URL + data.profile);


  return (
    <>
      {
        loading ? (
          <div className="flex justify-center h-72 items-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl" />
          </div>
        ) : (
          <>
            {/*  any message here  */}
            < Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
              delay={3000}
              position="bottom-end"
            />

            <div className="ml-60 text-xl text-wrap">
              <div className="container grid grid-cols-3 gap-3 mx-auto p-4">
                {/* <div className="container flex justify-center items-start  gap-4 mx-auto p-4"> */}
                {/* basic detail box  */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="">
                    <Form onSubmit={handleBasicDetailSubmit}>
                      <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Full Name </Form.Label>
                        <span className="text-red-500 px-1">*</span>
                        <Form.Control type="text" placeholder="Enter Name" value={data.name || ''} name='name' onChange={handleBasicDetailChange} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email </Form.Label>
                        <span className="text-red-500 px-1">*</span>
                        <Form.Control disabled type="email" placeholder="Email Address" value={data.email || ''} name='email' />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupNumber">
                        <Form.Label>Mobile Number </Form.Label>
                        <span className="text-red-500 px-1">*</span>
                        <Form.Control type="number" placeholder="Mobile Number" name='number' value={data.number || ''} onChange={handleBasicDetailChange} />
                      </Form.Group>
                      <button type="submit" className="flex items-center px-3 py-2 bg-blue-500 text-white rounded">
                        <FaRegSave className="mr-2" />
                        Submit
                      </button>
                    </Form>
                  </div>
                </div>

                {/* photo box */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="">
                    <Form className='flex flex-col justify-center items-center gap-3 text-center'>
                      <img src={BASE_URL + data.profile} alt="Profile Img" width="150" height="150" className='rounded-full' />
                      <Form.Group controlId="formFile" className="mb-3" onChange={handlePhotoChange}>
                        <Form.Label>{data.name}</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" />
                      </Form.Group>
                    </Form>
                  </div>
                </div>

                {/* password box */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="">
                    <Form onSubmit={handlePassUpdate} className='text-base'>
                      <FloatingLabel className='my-3' label="Old Password">
                        <Form.Control type="password" autoComplete="password" placeholder="Password" name='oldpass' value={passData.oldpass || ''} onChange={handlePassChange} />
                      </FloatingLabel>
                      <FloatingLabel className='my-3' label="New Password">
                        <Form.Control type="password" autoComplete="password" placeholder="New Password" name='newpass' value={passData.newpass || ''} onChange={handlePassChange} />
                      </FloatingLabel>
                      <FloatingLabel className='my-3' label="Confirm New Password">
                        <Form.Control type="password" autoComplete="password" placeholder="Confirm New Password" name='newcfmpass' value={passData.newcfmpass || ''} onChange={handlePassChange} />
                      </FloatingLabel>
                      <button type="submit" className="flex items-center px-3 py-2 bg-blue-500 text-white rounded">
                        <RiKeyFill className="mr-2" />
                        Change Password
                      </button>
                    </Form>
                  </div>
                </div>


              </div>
            </div>
          </>
        )
      }

    </>
  )
}

export default Account
