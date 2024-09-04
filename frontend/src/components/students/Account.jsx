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
  // console.log(data)
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
        const response = await axios.post("http://localhost:4518/user/upload-photo", formData
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
              <div className="container grid grid-cols-3 gap-3 mx-auto p-4 text-base">
                {/* <div className="container flex justify-center items-start  gap-4 mx-auto p-4"> */}
                {/* basic detail box  */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <Form onSubmit={handleBasicDetailSubmit}>
                    <div className="flex gap-1 justify-center items-start">
                      <div className="">
                        <FloatingLabel className='my-3' label="First Name">
                          <Form.Control type="text" autoComplete="first_name" placeholder="First Name" name='first_name' value={data.first_name || ''} onChange={handleBasicDetailChange} required />
                        </FloatingLabel>
                        <FloatingLabel className='my-3' label="Middle Name">
                          <Form.Control type="text" autoComplete="middle_name" placeholder="Middle Name" name='middle_name' value={data.middle_name || ''} onChange={handleBasicDetailChange} required />
                        </FloatingLabel>
                        <FloatingLabel className='my-3' label="Last Name">
                          <Form.Control type="text" autoComplete="last_name" placeholder="Last Name" name='last_name' value={data.last_name || ''} onChange={handleBasicDetailChange} required />
                        </FloatingLabel>
                      </div>
                      <div className="">
                        <FloatingLabel className='my-3' label="Email">
                          <Form.Control type="email" autoComplete="email" placeholder="Email" name='email' value={data.email || ''} onChange={handleBasicDetailChange} required disabled />
                        </FloatingLabel>
                        <FloatingLabel className='my-3' label="Number">
                          <Form.Control type="number" autoComplete="number" placeholder="Number" name='number' value={data.number || ''} onChange={handleBasicDetailChange} required />
                        </FloatingLabel>
                      </div>
                    </div>
                    <button type="submit" className="flex items-center px-3 py-2 bg-blue-500 text-white rounded">
                      <FaRegSave className="mr-2" />
                      Submit
                    </button>
                  </Form>
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
                        <Form.Control type="password" autoComplete="password" placeholder="Password" name='oldpass' value={passData.oldpass || ''} onChange={handlePassChange} required />
                      </FloatingLabel>
                      <FloatingLabel className='my-3' label="New Password">
                        <Form.Control type="password" autoComplete="password" placeholder="New Password" name='newpass' value={passData.newpass || ''} onChange={handlePassChange} required />
                      </FloatingLabel>
                      <FloatingLabel className='my-3' label="Confirm New Password">
                        <Form.Control type="password" autoComplete="password" placeholder="Confirm New Password" name='newcfmpass' value={passData.newcfmpass || ''} onChange={handlePassChange} required />
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
