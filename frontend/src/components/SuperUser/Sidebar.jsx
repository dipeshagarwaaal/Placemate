import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt, } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropupCircle } from "react-icons/io";
import axios from 'axios';
import Logo from '../../assets/CPMS.png';
import { GrUserWorker } from "react-icons/gr";
import { FaUserSecret } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa6";

// TODO: Reactjs Bootstrap offcanvas to implement

const Sidebar = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:4518";


  // dropdown active check
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('../admin');
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
    axios.get('http://localhost:4518/user/detail', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setLoadData({
          name: res.data.first_name + " " + res.data.middle_name + " " + res.data.last_name,
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
    <div className='fixed top-0 left-0 h-screen z-20 flex flex-col bg-slate-50 w-64 transition-width duration-300 shadow-md shadow-gray'>
      {/* Main Asidebar Logo and Name  */}
      <div className='flex items-center px-3 py-4 gap-2 bg-slate-200 shadow-sm'>
        <img className="rounded-xl shadow-sm" src={`${Logo}`} alt="Logo Image" width="75" height="75" />
        <h1 className={`text-xl font-bold transition-opacity duration-300 opacity-100`}>
          <Link to='/admin/dashboard' className='no-underline text-black'>
            CPMS
          </Link>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-col flex-grow overflow-x-auto sidebar-nav mb-24'>
        <Link to="../admin/dashboard" className="flex items-center no-underline p-4 hover:bg-slate-100">
          <AiTwotoneDashboard size={24} className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link to="../admin/management" className="flex items-center no-underline p-4 hover:bg-slate-100">
          <FaUserSecret size={24} className="mr-3" />
          <span>Management</span>
        </Link>
        <Link to="../admin/tpo" className="flex items-center no-underline p-4 hover:bg-slate-100">
          <GrUserWorker size={24} className="mr-3" />
          <span>TPO</span>
        </Link>
        <Link to="../admin/student" className="flex items-center no-underline p-4 hover:bg-slate-100">
          <PiStudentDuotone size={24} className="mr-3" />
          <span>Student</span>
        </Link>
        <Link to="../admin/approve-student" className="flex items-center no-underline p-4 hover:bg-slate-100">
          <FaClipboardCheck size={24} className="mr-3" />
          <span>Approve Students</span>
        </Link>
      </nav>

      <div className='bottom-0 absolute w-full shadow-sm '>
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className={`w-full rounded-t-md bg-slate-700  ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}`}>
            <button onClick={handleLogout} className="flex items-center rounded-t-md text-red-500 w-full p-3 hover:bg-slate-900">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}

        {/* User Profile */}
        <div className='flex items-center cursor-pointer bg-slate-100' onClick={toggleDropdown}>
          <img src={`${BASE_URL}${loadData.profile}`} alt="Profile Img" width='36px' className="mx-2 my-2 rounded-2xl transition-all duration-300" />
          <div className='w-full flex justify-around items-center'>
            <div className='flex flex-col gap-0 py-2'>
              {/* <h2 className="text-base font-semibold">{loadData.name}</h2> */}
              <p className="text-sm text-gray-400">{loadData.email}</p>
            </div>
            <div className="transition-all duration-300 ease-in-out">
              {
                dropdownOpen
                  ? <IoIosArrowDropupCircle size={24} className=''></IoIosArrowDropupCircle >
                  : <IoIosArrowDropdown size={24} className=''></IoIosArrowDropdown>
              }
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default Sidebar;
