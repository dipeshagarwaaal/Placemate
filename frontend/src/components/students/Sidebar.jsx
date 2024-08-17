import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaTachometerAlt, FaCog, FaSignOutAlt, } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropupCircle } from "react-icons/io";
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:4518";

  const initialIsOpen = localStorage.getItem('nav-open') ? JSON.parse(localStorage.getItem('nav-open')) : true;

  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    const storedValue = JSON.parse(localStorage.getItem('nav-open'));

    // toggle value of nav-open in localSTorage and useState
    if (storedValue === true) {
      setIsOpen(false);
      localStorage.setItem('nav-open', false);
    } else {
      setIsOpen(true);
      localStorage.setItem('nav-open', true);
    }

    if (isOpen)
      setDropdownOpen(false);
  }

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMouseOver = () => {
    setIsOpen(true);
    localStorage.setItem('nav-open', isOpen);
  };

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
    axios.get('http://localhost:4518/student/home', {
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
        if (err.response && err.response.status === 401)
          navigate('../student/login');
        else
          console.log(err);
      });
  }, []);


  return (
    <div className={`flex flex-col h-screen bg-slate-100/50 ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
      {/* Header with Toggle Icon */}
      <div className={`flex items-center justify-between ${isOpen ? 'p-4' : 'px-4 py-8'}`}>
        {
          isOpen &&
          <h1 className={`text-xl font-bold transition-opacity duration-300 opacity-100`}>
            <Link to='/student/home' className='no-underline text-black'>
              CPMS
            </Link>
          </h1>
        }
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      <div id='aside' onMouseOver={handleMouseOver}>
        {/* User Profile */}
        <div className=''>
          <div className={`flex items-center mt-2 cursor-pointer ${isOpen ? 'bg-slate-200' : 'justify-center'}`} onClick={toggleDropdown}>
            <img src={`${BASE_URL}${loadData.profile}`} alt="Profile Img" width={isOpen ? '36px' : "24px"} className="mx-2 my-2 rounded-2xl transition-all duration-300" />
            {
              isOpen && (
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
              )
            }
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={`flex flex-col w-full rouneded shadow-md transition-all duration-300 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}`}>
              <Link to="/" className="flex items-center no-underline p-3 hover:bg-slate-200/40">
                <FaCog className="mr-2" /> <span className=''>Account Details</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center text-red-500/100 w-full p-3 hover:bg-slate-200/40">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`flex flex-col mt-2 ${!isOpen && 'justify-center items-center'} `}>
          <Link to="/dashboard" className="flex items-center no-underline p-4 hover:bg-slate-100">
            <FaTachometerAlt size={24} className="mr-3" />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/account" className="flex items-center no-underline p-4 hover:bg-slate-100">
            <FaUser size={24} className="mr-3" />
            {isOpen && <span>Account</span>}
          </Link>
          {/* Add more links as needed */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
