import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Toast from './Toast';

function ViewUserData() {

  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = "http://localhost:4518";


  // userId but its userId
  const { userId } = useParams();

  // userData to store user data get from userId
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [currentUserData, setCurrentUserData] = useState('');

  const fetchCurrentUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4518/user/detail', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setCurrentUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Account.jsx => ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentUserData();
  }, [loading]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:4518/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setUserData(response.data);
        // console.log(response.data)
      } catch (error) {
        if (error.response.data) {
          setToastMessage(error.response.data.msg);
          setShowToast(true);
          if (error.response.data.msg === "Student not found" || "user not found")
            navigate("../404")
        }
        console.error("Error fetching student data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [userId]);

  console.log(userData);
  return (
    <>
      {
        loading ? (
          <>
            <div className="flex justify-center h-72 items-center">
              <i className="fa-solid fa-spinner fa-spin text-3xl" />
            </div>
          </>
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

            <div className="my-8 grid grid-cols-2 gap-2 text-base">
              <div className="backdrop-blur-md bg-white/30 border border-gray-200 rounded-lg shadow p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details</h3>

                <div className="flex justify-between items-start gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-700 font-bold">Full Name: </span>
                      <span className="text-gray-800">
                        {userData?.first_name + " "}
                        {userData?.middle_name && userData?.middle_name + " "}
                        {userData?.last_name}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-700 font-bold">Email: </span>
                      <span className="text-gray-800">
                        {userData?.email}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-700 font-bold">Number: </span>
                      <span className="text-gray-800">
                        {userData?.number}
                      </span>
                    </div>

                    {
                      userData?.gender && (
                        <div>
                          <span className="text-gray-700 font-bold">Gender: </span>
                          <span className="text-gray-800">
                            {userData?.gender}
                          </span>
                        </div>
                      )
                    }
                    {
                      userData?.dateOfBirth && (
                        <div>
                          <span className="text-gray-700 font-bold">Date of Birth: </span>
                          <span className="text-gray-800">
                            {new Date(userData?.dateOfBirth).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      )
                    }

                    {
                      userData?.fullAddress && (
                        <div>
                          <span className="text-gray-700 font-bold">Address: </span>
                          <span className="text-gray-800">
                            {userData?.fullAddress?.address + " - " + userData?.fullAddress?.pincode}
                          </span>
                        </div>
                      )
                    }
                    <div>
                      <span className="text-gray-700 font-bold">Joined On: </span>
                      <span className="text-gray-800">
                        {new Date(userData?.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    {
                      userData?.studentProfile?.isApproved && (
                        <div>
                          <span className="text-gray-700 font-bold">Is Student Approved: </span>
                          <span className="text-gray-800">
                            {userData?.studentProfile?.isApproved === true ? "Yes" : "No"}
                          </span>
                        </div>
                      )
                    }
                  </div>

                  {/* Profile Picture */}
                  <Col xs={6} md={4} className=" flex justify-end rounded">
                    <Image src={BASE_URL + userData?.profile} thumbnail />
                  </Col>
                </div>
              </div>

              {
                userData?.isProfileCompleted === true && (
                  <>
                    <div className="backdrop-blur-md bg-white/30 border border-gray-200 rounded-lg shadow p-6">
                      <div className=''>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">College Information</h3>

                        <div className="grid grid-flow-col gap-6">
                          {/* College Information */}
                          <div className="space-y-4">
                            {
                              userData?.studentProfile?.rollNumber && (
                                <div>
                                  <span className="text-gray-700 font-bold">UIN: </span>
                                  <span className="text-gray-800">
                                    {userData?.studentProfile?.UIN}
                                  </span>
                                </div>
                              )
                            }
                            {
                              userData?.studentProfile?.rollNumber && (
                                <div>
                                  <span className="font-bold text-gray-700">Roll Number: </span>
                                  <span className="text-gray-800">
                                    {userData?.studentProfile?.rollNumber}
                                  </span>
                                </div>

                              )
                            }
                            {
                              userData?.studentProfile?.department && (
                                <div>
                                  <span className="font-bold text-gray-700">Department: </span>
                                  <span className="text-gray-800">
                                    {userData?.studentProfile?.department + " "}
                                    Engineering
                                  </span>
                                </div>
                              )
                            }
                            {
                              userData?.studentProfile?.year && (
                                <div>
                                  <span className="text-gray-700 font-bold">Year: </span>
                                  <span className="text-gray-800">
                                    {userData?.studentProfile?.year}
                                    {userData?.studentProfile?.year === 1 && 'st'}
                                    {userData?.studentProfile?.year === 2 && 'nd'}
                                    {userData?.studentProfile?.year === 3 && 'rd'}
                                    {userData?.studentProfile?.year === 4 && 'th'}
                                  </span>
                                </div>
                              )
                            }
                            {
                              userData?.studentProfile?.addmissionYear && (
                                <div>
                                  <span className="font-bold text-gray-700 ">Addmission Year: </span>
                                  <span className="text-gray-800">
                                    {userData?.studentProfile?.addmissionYear}
                                  </span>
                                </div>
                              )
                            }
                          </div>

                          {
                            userData?.studentProfile?.SGPA && (
                              <>
                                <div className="flex flex-col gap-3">
                                  <div className="font-bold">SGPA:</div>
                                  <div className="flex gap-6 justify-center items-center">
                                    <div className="space-y-4">
                                      {
                                        userData?.studentProfile?.SGPA?.sem1 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="text-gray-700 font-bold">Sem I: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem1}
                                            </span>
                                          </div>
                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem2 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700">Sem II: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem2}
                                            </span>
                                          </div>

                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem3 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700">Sem III: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem3}
                                            </span>
                                          </div>
                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem4 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="text-gray-700 font-bold">Sem IV: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem4}
                                            </span>
                                          </div>
                                        )
                                      }
                                    </div>
                                    <div className="space-y-4">
                                      {
                                        userData?.studentProfile?.SGPA?.sem5 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700 ">Sem V: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem5}
                                            </span>
                                          </div>
                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem6 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700 ">Sem V: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem6}
                                            </span>
                                          </div>
                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem7 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700 ">Sem V: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem7}
                                            </span>
                                          </div>
                                        )
                                      }
                                      {
                                        userData?.studentProfile?.SGPA?.sem8 && (
                                          <div className='border-2 px-2 rounded'>
                                            <span className="font-bold text-gray-700 ">Sem V: </span>
                                            <span className="text-gray-800">
                                              {userData?.studentProfile?.SGPA?.sem8}
                                            </span>
                                          </div>
                                        )
                                      }
                                    </div>
                                  </div>

                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </>
                )
              }


              {
                userData?.studentProfile?.pastQualification && (
                  <>
                    <div className="col-span-2 backdrop-blur-md bg-white/30 border border-gray-200 rounded-lg shadow p-6">
                      <div className=''>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">College Information</h3>
                        <div className="grid grid-flow-col gap-6">
                          {/* Past Qualification */}
                          {
                            userData?.studentProfile?.pastQualification?.ssc && (
                              <>
                                <div className="">
                                  <div className="font-bold">
                                    SSC:
                                  </div>
                                  <div className="space-y-4 pl-2">
                                    {
                                      userData?.studentProfile?.pastQualification?.ssc?.board && (
                                        <div>
                                          <span className="text-gray-700 font-bold">Board: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.ssc?.board}
                                          </span>
                                        </div>
                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.ssc?.year && (
                                        <div>
                                          <span className="font-bold text-gray-700">Passing Year: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.ssc?.year}
                                          </span>
                                        </div>

                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.ssc?.percentage && (
                                        <div>
                                          <span className="font-bold text-gray-700">Percentage: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.ssc?.percentage}
                                          </span>
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                              </>
                            )
                          }
                          {
                            userData?.studentProfile?.pastQualification?.hsc && (
                              <>
                                <div className="">
                                  <div className="font-bold">
                                    HSC:
                                  </div>
                                  <div className="space-y-4 pl-2">
                                    {
                                      userData?.studentProfile?.pastQualification?.hsc?.board && (
                                        <div>
                                          <span className="text-gray-700 font-bold">Board: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.hsc?.board}
                                          </span>
                                        </div>
                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.hsc?.year && (
                                        <div>
                                          <span className="font-bold text-gray-700">Passing Year: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.hsc?.year}
                                          </span>
                                        </div>

                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.hsc?.percentage && (
                                        <div>
                                          <span className="font-bold text-gray-700">Percentage: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.hsc?.percentage}
                                          </span>
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                              </>
                            )
                          }
                          {
                            userData?.studentProfile?.pastQualification?.diploma && (
                              <>
                                <div className="">
                                  <div className="font-bold">
                                    Diploma:
                                  </div>
                                  <div className="space-y-4 pl-2">
                                    {
                                      userData?.studentProfile?.pastQualification?.diploma?.department && (
                                        <div>
                                          <span className="text-gray-700 font-bold">Board: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.diploma?.department}
                                          </span>
                                        </div>
                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.diploma?.year && (
                                        <div>
                                          <span className="font-bold text-gray-700">Passing Year: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.diploma?.year}
                                          </span>
                                        </div>

                                      )
                                    }
                                    {
                                      userData?.studentProfile?.pastQualification?.diploma?.percentage && (
                                        <div>
                                          <span className="font-bold text-gray-700">Percentage: </span>
                                          <span className="text-gray-800">
                                            {userData?.studentProfile?.pastQualification?.diploma?.percentage}
                                          </span>
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </>
                )
              }


            </div>

          </>
        )
      }
    </>
  )
}

export default ViewUserData
