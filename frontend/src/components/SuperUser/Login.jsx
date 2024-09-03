import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/CPMS.png';
import isAuthenticated from '../../utility/auth.utility';
import Toast from '../../components/Toast';

function LoginSuperUser() {
  const navigate = useNavigate();

  // if login user visit redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../admin/dashboard");
    }
  }, [navigate]);

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4518/admin/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('../admin/dashboard');
    } catch (error) {
      if (error.response.data.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("Error in admin login.jsx => ", error);
    }
  }

  // toggle eye
  const [isEyeOpen, setEyeOpen] = useState(false);

  const handleEye = () => {
    setEyeOpen(!isEyeOpen);
  }
  return (
    <>
      {/* for any message "toast" */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-400 from-10% via-sky-300 via-40% to-emerald-500 to-100% ">
        <form className="form-signin flex justify-center items-center flex-col gap-3 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-8 shadow shadow-red-400 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5" onSubmit={handleSubmit}>
          <div className='flex justify-center items-center flex-col'>
            <img className="mb-4 rounded-xl shadow" src={`${Logo}`} alt="Logo Image" width="150" height="150" />
            <h1 className="h3 mb-3 font-weight-normal">Super User Log In</h1>
          </div>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control ml-1" placeholder="Email address" required autoFocus="" fdprocessedid="gwlj3s" autoComplete='email' name='email' value={email} onChange={handleChange} />

          <div className="flex justify-center items-center w-full">
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type={`${isEyeOpen ? "text" : "password"}`} id="inputPassword" className="form-control" placeholder="Password" required fdprocessedid="9sysne" autoComplete='current-password' name='password' value={password} onChange={handleChange} />
            <i className={`${isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"} -ml-6 cursor-pointer`} onClick={handleEye}></i>
          </div>

          <div className="flex justify-center items-center flex-col">
            <button className="btn btn-lg btn-primary btn-block" type="submit" fdprocessedid="a45f8">Log in</button>
          </div>
          <p className="text-muted text-center">© College Placement Management System 2024 - 25</p>
        </form>
      </div>
    </>
  )
}

export default LoginSuperUser
