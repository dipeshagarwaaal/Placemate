import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Placeholder from 'react-bootstrap/Placeholder';
import { GrFormAdd } from "react-icons/gr";
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function AddUserTable({
  users,
  loading,
  handleDeleteUser,
  formOpen,
  setFormOpen,
  data,
  handleDataChange,
  handleSubmit,
  userToAdd,
  handleApproveStudent
}) {

  // useState for load data
  const [currentUser, setCurrentUser] = useState({
    name: 'Not Found',
    email: 'Not Found',
    profile: 'Profile Img',
  });

  // checking for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4518/user/detail', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCurrentUser({
          email: res.data.email,
          role: res.data.role,
        });
      })
      .catch(err => {
        console.log("AddUserTable.jsx => ", err);
      });
  }, []);

  {/* for hover label effect  */ }
  const renderTooltipDeleteUser = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete User
    </Tooltip>
  );
  const renderTooltipApproveUser = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Approve User
    </Tooltip>
  );
  
  
  return (
    <>
      <div className=''>
        {
          loading ? (
            // fake table loading animation 
            <div>
              <Table striped bordered hover className='bg-white p-6 rounded-lg shadow-md w-full'>
                <thead>
                  <tr>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                    <th>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                    <td>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* <i className="fa-solid fa-spinner fa-spin text-3xl" /> */}
            </div>
          ) : (
            <Table striped bordered hover className='bg-white p-6 rounded-lg shadow-md w-full'>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Date of Joining</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.email}>
                      <td>{index + 1}</td>
                      <td>

                        {
                          // for super user 
                          // checking if user is superuser && checking if page is of approve student user 
                          currentUser.role === "superuser" && (
                            <Link to={`/admin/user/${user._id}`}>
                              {user.first_name + " " + user.last_name}
                            </Link>
                          )
                        }
                        {
                          // for management user
                          currentUser.role === "management_admin" && (
                            <Link to={`/management/user/${user._id}`}>
                              {user.first_name + " " + user.last_name}
                            </Link>
                          )
                        }
                        {
                          // for tpo user
                          currentUser.role === "tpo_admin" && (
                            <Link to={`/tpo/user/${user._id}`}>
                              {user.first_name + " " + user.last_name}
                            </Link>
                          )
                        }

                        {/* // :
                      // user.first_name +
                      // " " +
                      // user.last_name */}
                      </td>
                      <td>
                        <Link to={`mailto:${user.email}`} className='no-underline'>
                          {user.email}
                        </Link>
                      </td>
                      <td>{user.number}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        {/* for hover label effect  */}
                        <div className="flex justify-around items-center">
                          <div className="">
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltipDeleteUser}
                            >
                              <i
                                className="fa-regular fa-trash-can text-2xl cursor-pointer hover:text-red-500"
                                onClick={() => handleDeleteUser(user.email)}
                              />
                            </OverlayTrigger >
                          </div>
                          {
                            userToAdd === 'approve-student' && (
                              <div className="">
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltipApproveUser}
                                >
                                  <i
                                    className="fa-solid fa-square-check text-2xl cursor-pointer"
                                    onClick={() => handleApproveStudent(user.email)}
                                    onMouseEnter={(e) => {
                                      e.target.classList.remove('fa-solid');
                                      e.target.classList.add('fa-regular');
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.classList.remove('fa-regular');
                                      e.target.classList.add('fa-solid');
                                    }}
                                  />
                                </OverlayTrigger >
                              </div>
                            )
                          }
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )
        }

        {/* checking if approve student user page is open or not */}
        {
          userToAdd !== "approve-student" && (
            <Button variant="dark" size="lg" onClick={() => setFormOpen(true)}>
              <i className="fa-solid fa-person-circle-plus px-1" /> Add {userToAdd}
            </Button>
          )
        }


        {
          formOpen &&
          <>
            <div className="bg-white flex justify-center w-full mt-4">
              <div className='w-1/2 rounded-lg shadow px-10 py-3'>
                <Form className='text-base' onSubmit={handleSubmit}>
                  <h2>New {userToAdd}</h2>
                  <FloatingLabel className='my-3' label="Name">
                    <Form.Control type="text" autoComplete="name" placeholder="Name" name='first_name' value={data.first_name || ''} onChange={handleDataChange} />
                  </FloatingLabel>
                  <FloatingLabel className='my-3' label="Email">
                    <Form.Control type="email" autoComplete="email" placeholder="Email" name='email' value={data.email || ''} onChange={handleDataChange} />
                  </FloatingLabel>
                  <FloatingLabel className='my-3' label="Number">
                    <Form.Control type="number" autoComplete="number" placeholder="Phone Number" name='number' value={data.number || ''} onChange={handleDataChange} />
                  </FloatingLabel>
                  <FloatingLabel className='my-3' label="Password">
                    <Form.Control type="password" autoComplete="password" placeholder="Enter Initial Password" name='password' value={data.password || ''} onChange={handleDataChange} />
                  </FloatingLabel>
                  <button type="submit" className="flex items-center px-3 py-2 bg-blue-500 text-white rounded">
                    <GrFormAdd className="mr-2 text-3xl" />
                    Create New {userToAdd}
                  </button>
                </Form>
              </div>
            </div>
          </>
        }
      </div >
    </>
  )
}

export default AddUserTable;