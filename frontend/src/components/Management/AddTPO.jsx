import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Placeholder from 'react-bootstrap/Placeholder';
import { GrFormAdd } from "react-icons/gr";
import Toast from '../Toast';
import ModalBox from '../Modal';

function AddTPO() {
  // tpo users store here
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4518/management/tpo-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        }
      });

      if (response.data) {
        console.log(response.data.tpoUsers)
        setUsers(response.data.tpoUsers);
      } else {
        console.warn('Response does not contain tpoUsers:', response.data);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };
  // fetchUserDetails();

  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: ""
  });

  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleDeleteUser = (email) => {
    setUserToDelete(email);
    setShowModal(true);
  }

  const confirmDelete = async (email) => {
    try {
      const response = await axios.post("http://localhost:4518/management/deletetpo",
        { email: userToDelete },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setShowModal(false);
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("AddTPO => confirmDelete ==> ", error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4518/management/addtpo",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("handleSubmit => AddTPO.jsx ==> ", error);
    }
  }


  return (
    <>
      {/*  any message here  */}
      < Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="top-center"
      />

      <div className='ml-60'>
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
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.email}>
                      <td>{index + 1}</td>
                      <td>{user.first_name}</td>
                      <td>{user.email}</td>
                      <td>{user.number}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <i className="fa-regular fa-trash-can text-2xl cursor-pointer hover:text-red-500" onClick={() => handleDeleteUser(user.email)} />
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
        <Button variant="dark" size="lg" onClick={() => setFormOpen(true)}>
          <i className="fa-solid fa-person-circle-plus px-1" /> Add TPO Admin
        </Button>
        {
          formOpen &&
          <>
            <div className="bg-white flex justify-center w-full mt-4">
              <div className='w-1/2 rounded-lg shadow px-10 py-3'>
                <Form className='text-base' onSubmit={handleSubmit}>
                  <h2>New TPO Admin</h2>
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
                    Create New TPO User
                  </button>
                </Form>
              </div>
            </div>
          </>
        }

        {/* ModalBox Component for Delete Confirmation */}
        <ModalBox
          show={showModal}
          close={closeModal}
          header={"Confirmation"}
          body={`Do you want to delete ${userToDelete}?`}
          btn={"Delete"}
          confirmAction={confirmDelete}
        />
      </div>
    </>
  );
}

export default AddTPO;
