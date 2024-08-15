import React from 'react';
import About1 from '../../assets/aboutImg1.jpg';
import About2 from '../../assets/aboutImg2.jpg';
import About3 from '../../assets/aboutImg3.jpg';

function LandAbout() {
  return (
    <>
      <div id='about' className="bg-gradient-to-r from-slate-100 via-pink-100 to-orange-100">
        <h1 className='ml-12 p-3 text-4xl'>About Us</h1>
        <div className="h-96 flex justify-around items-center ">
          <div className='w-1/4 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-red-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About1}`} alt="Image" className='w-72 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
          <div className='w-1/4 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-red-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About2}`} alt="Image" className='w-72 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
          <div className='w-1/4 h-5/6 bg-opacity-10 shadow-lg shadow-slate-200 bg-red-500 border border-black rounded-lg text-center'>
            <h3 className='py-1'>Get Placement</h3>
            <div className="flex justify-center flex-col items-center py-1">
              <img src={`${About3}`} alt="Image" className='w-72 border-2 border-black rounded-xl' />
              <span className='mx-10 max-md:mx-0'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, omnis!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandAbout
