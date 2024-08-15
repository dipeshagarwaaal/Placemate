import React, { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';

function LandingNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`flex justify-between items-center playfair transition-all duration-200 ease-in z-50 ${isScrolled && 'shadow-lg bg-slate-50 top-0 sticky'}`}>
        <div className='flex items-center my-2 mx-3 p-1 gap-3'>
          <img src={Logo} alt="Logo" className='w-20 h-20 rounded-lg border border-black' />
          <h1>College Placement Management System</h1>
        </div>
        <div className='flex gap-3 p-1 mr-5 justify-center items-center'>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate('student/login')}
          > Login </button>
          <button
            type="button"
            className="btn btn-success btn-lg text-nowrap"
            onClick={() => navigate('student/signup')}
          >Sign Up</button>
        </div>
      </div>
    </>
  )
}

export default LandingNavbar
