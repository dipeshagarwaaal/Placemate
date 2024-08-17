import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaCog, FaSignOutAlt, } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropupCircle } from "react-icons/io";
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:4518";

  const initialDropdown = JSON.parse(localStorage.getItem('sidebar-dropdown')) || false;

  // dropdown active check and save
  const [dropdownOpen, setDropdownOpen] = useState(initialDropdown);

  useEffect(() => {
    localStorage.setItem('sidebar-dropdown', JSON.stringify(dropdownOpen));
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('../student/login');
  };


  // useState for load data
  const [loadData, setLoadData] = useState({
    name: 'Not Found',
    email: 'Not Found',
    profile: 'Profile Img',
  });

  // checking for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4518/student/detail', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setLoadData({
          name: res.data.name,
          email: res.data.email,
          profile: res.data.profile,
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          if (err.response.data) {
            const dataToPass = {
              showToastPass: true,
              toastMessagePass: err.response.data.msg,
            }
            navigate('../student/login', { state: dataToPass });
          }
        } else
          console.log("Sidebar.jsx => ", err);
      });
  }, []);


  return (
    <div className='fixed top-0 left-0 h-screen z-20 flex flex-col bg-slate-50 w-64 transition-width duration-300'>
      <div className='flex items-center justify-between p-4'>
        <h1 className={`text-xl font-bold transition-opacity duration-300 opacity-100`}>
          <Link to='/student/dashboard' className='no-underline text-black'>
            CPMS
          </Link>
        </h1>
      </div>

      <div id='aside'>
        {/* User Profile */}
        <div className=''>
          <div className='flex items-center mt-2 cursor-pointer bg-slate-100' onClick={toggleDropdown}>
            <img src={`${BASE_URL}${loadData.profile}`} alt="Profile Img" width='36px' className="mx-2 my-2 rounded-2xl transition-all duration-300" />
            <div className='w-full flex justify-around items-center transition-all duration-300 ease-in-out'>
              <div className='flex flex-col gap-0 py-2'>
                <h2 className="text-base font-semibold">{loadData.name}</h2>
                <p className="text-sm text-gray-400">{loadData.email}</p>
              </div>
              {
                dropdownOpen
                  ? <IoIosArrowDropupCircle size={24} className=''></IoIosArrowDropupCircle >
                  : <IoIosArrowDropdown size={24} className=''></IoIosArrowDropdown>
              }
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={`flex flex-col w-full rouneded shadow-md transition-all duration-300 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}`}>
              <Link to="../student/account" className="flex items-center no-underline p-3 hover:bg-slate-100">
                <FaCog className="mr-2" /> <span className=''>Account Details</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center text-red-500/100 w-full p-3 hover:bg-slate-100">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col mt-2'>
          <Link to="../student/dashboard" className="flex items-center no-underline p-4 hover:bg-slate-100">
            <FaTachometerAlt size={24} className="mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link to="/account" className="flex items-center no-underline p-4 hover:bg-slate-100">
            <FaUser size={24} className="mr-3" />
            <span>Account</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
