import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import { useLocation, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalBox from './Modal';
import Toast from './Toast';
import TablePlaceholder from './TablePlaceholder';
import { BASE_URL } from '../config/config';

function AllJobPost() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState({});

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);
  const [dataToParasModal, setDataToParasModal] = useState(null);
  const [modalBody, setModalBody] = useState({
    cmpName: '',
    jbTitle: ''
  });
  // const [modalBtn, setModalBtn] = useState('');

  // useState for load data
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: 'Not Found',
    email: 'Not Found',
  });


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
          email: res.data.email,
          role: res.data.role,
        });
      })
      .catch(err => {
        console.log("AddUserTable.jsx => ", err);
        setToastMessage(err);
        setShowToast(true);
      });

    // calling function fetch jobs
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tpo/jobs`);
      setJobs(response.data.data)
      fetchCompanies(response.data.data);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDeletePost = (jobId, cmpName, jbTitle) => {
    setDataToParasModal(jobId);
    setModalBody({
      cmpName: cmpName,
      jbTitle: jbTitle
    });
    setShowModal(true);
  }

  const confirmDelete = async (jobId) => {
    try {
      const response = await axios.post(`${BASE_URL}/tpo/delete-job`, { jobId });

      setShowModal(false);
      fetchJobs();
      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
      // setLoading(false);
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error?.response?.data?.msg);
        setShowToast(true);
      }
      console.log("Error deleting job ", error);
    }
  }

  const fetchCompanies = async (jobs) => {
    const companyNames = {};
    for (const job of jobs) {
      if (job.company && !companyNames[job.company]) {
        try {
          const response = await axios.get(`${BASE_URL}/company/company-data?companyId=${job.company}`);
          companyNames[job.company] = response.data.company.companyName;
        } catch (error) {
          console.log("Error fetching company name => ", error);
        }
      }
    }
    setCompanies(companyNames);
  };



  const renderTooltipDeletePost = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete Post
    </Tooltip>
  );

  const renderTooltipEditPost = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit Post
    </Tooltip>
  );

  const renderTooltipViewPost = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View Post
    </Tooltip>
  );

  const closeModal = () => {
    setShowModal(false);
    setDataToParasModal(null);
  };


  const { showToastPass, toastMessagePass } = location.state || { showToastPass: false, toastMessagePass: '' };


  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      // Clear the state after the toast is shown
      navigate('.', { replace: true, state: {} });
    }
  }, []);

  // console.log(jobs.data);
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

      <div className=''>
        {
          loading ? (
            // fake table loading animation 
            <div>
              <TablePlaceholder />
              {/* <i className="fa-solid fa-spinner fa-spin text-3xl" /> */}
            </div>
          ) : (
            <Table striped bordered hover className='bg-white my-6 rounded-lg shadow w-full'>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>Sr. No.</th>
                  <th style={{ width: '18%' }}><b>Company Name</b></th>
                  <th style={{ width: '18%' }}>Job Title</th>
                  <th style={{ width: '10%' }}>Annual CTC</th>
                  <th style={{ width: '15%' }}>Last date of Application</th>
                  <th style={{ width: '15%' }}>No. of Students Applied</th>
                  <th style={{ width: '15%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.length > 0 ? (
                  jobs?.map((job, index) => {
                    const isMatched = job?.applicants?.find(student => student.studentId == currentUser.id)
                    return (
                      <tr
                        key={job?._id}
                        className={`${isMatched ? 'table-success' : ''}`}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <b>
                            {companies[job?.company] || <Placeholder as="p" animation="glow">
                              <Placeholder xs={12} />
                            </Placeholder>}
                          </b>
                        </td>
                        <td>
                          {job?.jobTitle}
                        </td>
                        <td>
                          {job?.salary}
                        </td>
                        <td>
                          {new Date(job?.applicationDeadline).toLocaleDateString('en-In')}
                        </td>
                        <td>
                          {job?.applicants?.length}
                        </td>
                        <td>
                          {/* for hover label effect  */}
                          <div className="flex justify-around items-center">
                            <div className="px-0.5">
                              {/* view post  */}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipViewPost}
                              >
                                <i
                                  className="fa-solid fa-circle-info text-2xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-500"
                                  onClick={() => {
                                    if (currentUser.role === 'tpo_admin') navigate(`../tpo/job/${job?._id}`)
                                    else if (currentUser.role === 'management_admin') navigate(`../management/job/${job?._id}`)
                                    else if (currentUser.role === 'superuser') navigate(`../admin/job/${job?._id}`)
                                    else if (currentUser.role === 'student') navigate(`../student/job/${job?._id}`)
                                  }}
                                />
                              </OverlayTrigger>
                            </div>
                            {
                              currentUser.role !== 'student' && (
                                <>
                                  {/* Edit post */}
                                  <div className="px-0.5">
                                    <OverlayTrigger
                                      placement="top"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltipEditPost}
                                    >
                                      <i
                                        className="fa-regular fa-pen-to-square text-2xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-green-500 hover:fa-solid"
                                        onClick={() => {
                                          const rolePaths = {
                                            'tpo_admin': `../tpo/post-job/${job._id}`,
                                            'management_admin': `../management/post-job/${job._id}`,
                                            'superuser': `../admin/post-job/${job._id}`,
                                          };
                                          navigate(rolePaths[currentUser.role] || '#');
                                        }}
                                      />
                                    </OverlayTrigger>
                                  </div>

                                  {/* Delete post */}
                                  <div className="px-0.5">
                                    <OverlayTrigger
                                      placement="top"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltipDeletePost}
                                    >
                                      <i
                                        className="fa-regular fa-trash-can text-2xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-red-500 hover:fa-solid"
                                        onClick={() =>
                                          handleDeletePost(job?._id, companies[job?.company], job?.jobTitle)
                                        }
                                      />
                                    </OverlayTrigger>
                                  </div>
                                </>
                              )
                            }
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No Jobs found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )
        }
      </div >


      {/* ModalBox Component for Delete Confirmation */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Do you want to delete post of ${modalBody.cmpName} for ${modalBody.jbTitle}`}
        btn={"Delete"}
        confirmAction={() => confirmDelete(dataToParasModal)}
      />
    </>
  )
}

export default AllJobPost
