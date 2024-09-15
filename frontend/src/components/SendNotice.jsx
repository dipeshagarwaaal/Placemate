import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from './Toast';
import ModalBox from './Modal';
import { BASE_URL } from '../config/config';

function SendNotice() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});
  const [error, setError] = useState('');

  // useState for current user
  const [currentUser, setCurrentUser] = useState({ role: '', id: '' });

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false)

  // checking for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCurrentUser({
          id: res.data.id,
          role: res.data.role,
        });
      })
      .catch(err => {
        console.log("SendNotice.jsx => ", err);
      });
  }, []);



  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!data?.receiver_role && !data?.title && !data?.message) return setError('All Fields Required!');
    setShowModal(true);
  }

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/management/send-notice`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        },
      );
      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
    } catch (error) {
      console.log('error while sending notice ', error);
    }
    setShowModal(false);
  }

  useEffect(() => {
    if (currentUser?.role && currentUser?.id) setData({ ...data, sender: currentUser?.id, sender_role: currentUser?.role })
    setLoading(false);
  }, [currentUser])

  return (
    <>

      {/* Toast Component */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />


      {
        loading ? (
          <div className="flex justify-center h-72 items-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl" />
          </div>
        ) : (
          <>
            <div className="">
              <div className="my-8 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6">
                <div className="grid grid-cols-2 gap-2">
                  {currentUser?.role === 'management_admin' && (
                    <FloatingLabel
                      controlId="floatingSendTo"
                      label={<span>Receiver Role <span style={{ color: 'red' }}>*</span></span>}
                    >
                      <Form.Select
                        aria-label="Floating label select send to"
                        className="cursor-pointer"
                        name="receiver_role"
                        value={data?.receiver_role || "undefined"}
                        onChange={handleDataChange}
                      >
                        <option disabled value="undefined" className="text-gray-400">
                          Select Receiver Role...
                        </option>
                        <option value="student">Student</option>
                        <option value="tpo_admin">TPO</option>
                      </Form.Select>
                    </FloatingLabel>
                  )}

                  <FloatingLabel
                    controlId="floatingTitle"
                    label={<span>Title <span style={{ color: 'red' }}>*</span></span>}
                    className={currentUser?.role === 'tpo_admin' ? 'col-span-2' : ''}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name='title'
                      value={data?.title || ""}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel >
                  <div className="col-span-2">
                    <FloatingLabel controlId="floatingMessage" label={
                      <>
                        <span>Message <span style={{ color: 'red' }}>*</span></span>
                      </>
                    }>
                      <Form.Control
                        as="textarea"
                        placeholder="Title"
                        name='message'
                        style={{ maxHeight: "250px", height: "200px" }}
                        value={data?.message || ""}
                        onChange={handleDataChange}
                      />
                    </FloatingLabel >
                  </div>
                </div>
                <div className="mt-2">
                  <span className='text-center text-red-500'>
                    {error && error}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button
                  variant="primary"
                  type='submit'
                  size='lg'
                  onClick={handleSubmit}
                  onMouseEnter={(e) => {
                    e.target.querySelector('i').classList.remove('fa-regular');
                    e.target.querySelector('i').classList.add('fa-solid');
                    e.target.querySelector('i').classList.add('fa-bounce');
                  }}
                  onMouseLeave={(e) => {
                    e.target.querySelector('i').classList.remove('fa-solid');
                    e.target.querySelector('i').classList.remove('fa-bounce');
                    e.target.querySelector('i').classList.add('fa-regular');
                  }}
                >
                  <i className="fa-regular fa-paper-plane mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        )
      }


      {/* ModalBox Component for Delete Confirmation */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Sending Notice ${data?.message && `${data?.message} to`} ${data?.receiver_role ? data?.receiver_role : "student"}?`}
        btn={"Send"}
        confirmAction={confirmSubmit}
      />
    </>
  )
}

export default SendNotice
