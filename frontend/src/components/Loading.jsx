import React from 'react';
import Img from '../assets/CPMS.png';

function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Img} alt="Loading" className="w-36 h-36 mb-4 animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <div className="">
          <p className="text-xl font-medium pt-3">Hold your sit tightly, we are coming...</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingComponent;
