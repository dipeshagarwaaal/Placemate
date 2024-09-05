import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from '../Toast';
import ModalBox from '../Modal';

function PostJob() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [data, setData] = useState({});

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    setShowModal(true);
  }

  const confirmSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4518/tpo/post-job',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )

      // console.log(response.data)
      if (response?.data?.msg) {
        setToastMessage(response.data.msg);
        setShowToast(true);
      }
      navigate('../tpo/dashboard');
    } catch (error) {
      if (error.response) {
        if (error?.response.data?.msg) setToastMessage(error.response.data.msg)
        else setToastMessage(error.message)

        setShowToast(true);
      }
      console.log("PostJob error while fetching => ", error);
    }
  }

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/*  any message here  */}
      < Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />


      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="my-8 text-base backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6">
            <div className="grid grid-cols-2 gap-2">
              {/* company details  */}
              <FloatingLabel controlId="floatingCompanyName" label="Company Name">
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  name='companyName'
                  onChange={handleDataChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingCompanyWebsite" label="Company Website">
                <Form.Control
                  type="url"
                  placeholder="Company Website"
                  name='companyWebsite'
                  onChange={handleDataChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingCompanyLocation" label="Company Location">
                <Form.Control
                  type="text"
                  placeholder="Company Location"
                  name='companyLocation'
                  onChange={handleDataChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingSelectDifficulty" label="Difficulty Level">
                <Form.Select
                  aria-label="Floating label select difficulty"
                  className='cursor-pointer'
                  name='difficulty'
                  onChange={handleDataChange}
                  required
                >
                  <option disabled selected className='text-gray-400'>Enter Difficulty Level</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>

          <div className="my-8 text-base backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6">
            <div className="">
              {/* job details  */}
              <div className="grid grid-flow-col gap-2">
                <FloatingLabel controlId="floatingJobTitle" label="Job Title">
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    name='jobTitle'
                    onChange={handleDataChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingSalary"
                  label="Salary (In LPA)"
                  name='salary'
                >
                  <Form.Control
                    type="number"
                    placeholder="Salary"
                    name='number'
                    onChange={handleDataChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingDeadlineDate" label="Deadline Date">
                  <Form.Control
                    type="date"
                    placeholder="Deadline Date"
                    name='applicationDeadline'
                    onChange={handleDataChange}
                    required
                  />
                </FloatingLabel>
              </div>

              {/* text editor  */}
              <div className="py-6">
                <label className=''>
                  Enter Job Description
                </label>
                <JoditEditor
                  ref={editor}
                  tabIndex={1}
                  onChange={(e) => {
                    setData({ ...data, ['contentJobDes']: e })
                  }}
                />
              </div>
              <div className="py-6">
                <label className=''>
                  Enter Eligibility
                </label>
                <JoditEditor
                  ref={editor}
                  tabIndex={2}
                  onChange={(e) => {
                    setData({ ...data, ['contentJobEli']: e })
                  }}
                />
              </div>
              <div className="py-6">
                <label className=''>
                  Enter Eligibility
                </label>
                <JoditEditor
                  ref={editor}
                  tabIndex={3}
                  onChange={(e) => {
                    setData({ ...data, ['contentJobHowToApply']: e })
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Button variant="primary" type='submit' size='lg'>POST</Button>
          </div>
        </form>
      </div>

      {/* ModalBox Component for Delete Confirmation */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Do you want to post job title ${data?.jobTitle}?`}
        btn={"Post"}
        confirmAction={confirmSubmit}
      />
    </>
  )
}
export default PostJob
