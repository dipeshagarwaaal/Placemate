import React from 'react';

function Footer({ isSidebarVisible }) {
  return (
    <>
      <div className={`bg-white bottom-0 right-0 border-t-2 border-gray-200 shadow-inner text-gray-500 transition-all duration-300 flex justify-between items-center h-20 ${isSidebarVisible ? 'ml-60 w-[calc(100%-15rem)] px-10' : 'ml-0 w-full px-4'}`}>
        <div className="flex text-left">
          <span className="font-semibold">Developed & Maintained by</span>
          <span className="px-1">
            <a
              href="https://www.linkedin.com/in/moinnaik/"
              target='_blanck'
              className='cursor-pointer font-bold text-blue-500 no-underline hover:text-blue-700'
            >
              Moin MN
            </a>
          </span>
          <span className="px-1 cursor-pointer font-bold text-blue-500  hover:text-blue-700">
            & Team
          </span>
        </div>
        <div className="flex text-right">
          <span className="font-semibold">Version</span>
          <span className="px-1">1.0.1</span>
        </div>
      </div>

    </>
  )
}
export default Footer
