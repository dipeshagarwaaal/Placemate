import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // page name 
  let pageName = location.pathname.split('/').filter(Boolean).pop();
  if (pageName === 'dashboard') pageName = "home";

  // capital 1st alphabet
  pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  console.log(pageName);
  return (
    <>
      <div className="fixed top-0 right-0 z-10 h-20 w-full bg-white flex justify-start items-center border-b-2 border-gray-100 shadow-sm text-gray-500">
        <span className='ml-72 text-xl transition-all duration-300'>
          {pageName}
        </span>
      </div>
    </>
  )
}

export default Navbar
