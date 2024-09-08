import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { RiKeyFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from './Toast';

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
        // console.log(response.data)
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
      const response = await axios.post("http://localhost:4518/user/update-profile",
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

      if (error?.response.data?.msg) setToastMessage(error.response.data.msg)
      else setToastMessage(error.message)

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
      const response = axios.post("http://localhost:4518/user/change-password",
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
  // for password update toasts
  useEffect(() => {
    if (passData.error) {
      setToastMessage(passData.error);
      setShowToast(true);
    }
  }, [passData.error]);

  // for formating date of birth
  const formatDate = (isoString) => {
    if (!isoString || isoString === "undefined") return "";
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };


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

            <div className="text-wrap">
              <div className="container grid grid-cols-3 gap-3 mx-auto p-4">

                {/* basic details */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-md w-full">
                  <Form onSubmit={handleBasicDetailSubmit}>
                    <div className="grid grid-cols-2 gap-2  justify-center items-start">
                      <FloatingLabel label="First Name">
                        <Form.Control
                          type="text"
                          autoComplete="first_name"
                          placeholder="First Name"
                          name='first_name'
                          value={data.first_name || ''}
                          onChange={handleBasicDetailChange}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Middle Name">
                        <Form.Control
                          type="text"
                          autoComplete="middle_name"
                          placeholder="Middle Name"
                          name='middle_name'
                          value={data.middle_name || ''}
                          onChange={handleBasicDetailChange}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Last Name">
                        <Form.Control
                          type="text"
                          autoComplete="last_name"
                          placeholder="Last Name"
                          name='last_name'
                          value={data.last_name || ''}
                          onChange={handleBasicDetailChange}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Number">
                        <Form.Control
                          type="number"
                          autoComplete="number"
                          placeholder="Number"
                          name='number'
                          value={data.number || ''}
                          onChange={handleBasicDetailChange}
                          onInput={(e) => {
                            if (e.target.value.length > 10) {
                              e.target.value = e.target.value.slice(0, 10);
                            }
                          }}
                          required
                        />
                      </FloatingLabel>
                      <div className="col-span-2">
                        <FloatingLabel label="Email">
                          <Form.Control
                            // className='cursor-not-allowed'
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            name='email'
                            value={data.email || ''}
                            onChange={handleBasicDetailChange}
                            required
                          // readOnly
                          />
                        </FloatingLabel>
                      </div>
                      <FloatingLabel controlId="floatingBirthDate" label="Date of Birth">
                        <Form.Control
                          type="date"
                          placeholder="Date of Birth"
                          name='dateOfBirth'
                          value={formatDate(data?.dateOfBirth)}
                          onChange={handleBasicDetailChange}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelectGender" label="Gender">
                        <Form.Select
                          aria-label="Floating label select gender"
                          className='cursor-pointer'
                          name='gender'
                          value={data?.gender === undefined ? "undefined" : data?.gender}
                          onChange={handleBasicDetailChange}
                        >
                          <option disabled value="undefined" className='text-gray-400'>Enter Your Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center my-2 px-3 py-2 bg-blue-500 text-white rounded"
                    >
                      <FaRegSave className="mr-2" />
                      Save
                    </button>
                  </Form>
                </div>

                {/* address box */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <Form onSubmit={handleBasicDetailSubmit}>
                    <div className="grid gap-2 ">
                      <FloatingLabel className='w-full' controlId="floatingTextareaAddress" label="Address">
                        <Form.Control
                          as="textarea"
                          placeholder="Enter Full Address here..."
                          style={{ height: '150px', resize: "none" }}
                          name='address'
                          value={data?.fullAddress?.address}
                          onChange={(e) => {
                            setData({
                              ...data,
                              fullAddress: {
                                ...data?.fullAddress,
                                address: e.target.value
                              }
                            });
                          }}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingAddressPincode" label="Pincode">
                        <Form.Control
                          type="number"
                          placeholder="Pincode"
                          maxLength={6}
                          name='pincode'
                          value={data?.fullAddress?.pincode}
                          onChange={(e) => {
                            setData({
                              ...data,
                              fullAddress: {
                                ...data?.fullAddress,
                                pincode: e.target.value
                              }
                            });
                          }}
                          pattern="\d{6}"
                          onInput={(e) => {
                            if (e.target.value.length > 6) {
                              e.target.value = e.target.value.slice(0, 6);
                            }
                          }}
                          required
                        />
                      </FloatingLabel>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center my-2 px-3 py-2 bg-blue-500 text-white rounded"
                    >
                      <FaMapLocationDot className="mr-2" />
                      Change Address
                    </button>
                  </Form>
                </div>

                {/* photo box */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="">
                    <Form className='flex flex-col justify-center items-center gap-3 text-center'>
                      <img src={BASE_URL + data.profile} alt="Profile Img" width="150" height="150" className='rounded-full' />
                      <Form.Group controlId="formFile" className="mb-3 text-xl" onChange={handlePhotoChange}>
                        <Form.Label>{data.first_name + " " + data.middle_name + " " + data.last_name}</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" />
                      </Form.Group>
                    </Form>
                  </div>
                </div>

                {/* password box */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <Form onSubmit={handlePassUpdate}>
                    <div className="grid gap-2 ">
                      <FloatingLabel label="Current Password">
                        <Form.Control
                          type="password"
                          autoComplete="password"
                          placeholder="Password"
                          name='oldpass'
                          value={passData.oldpass || ''}
                          onChange={handlePassChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel label="New Password">
                        <Form.Control
                          type="password"
                          autoComplete="password"
                          placeholder="New Password"
                          name='newpass'
                          value={passData.newpass || ''}
                          onChange={handlePassChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Confirm New Password">
                        <Form.Control
                          type="password"
                          autoComplete="password"
                          placeholder="Confirm New Password"
                          name='newcfmpass'
                          value={passData.newcfmpass || ''}
                          onChange={handlePassChange}
                        />
                      </FloatingLabel>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center my-2 px-3 py-2 bg-blue-500 text-white rounded"
                    >
                      <RiKeyFill className="mr-2" />
                      Change Password
                    </button>
                  </Form>
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
