import React from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/Students/NotificationBox';

// student 
function Home() {
  document.title = 'CPMS | Student Dashboard';

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <NotificationBox />
        <NoticeBox />
      </div>
    </>
  )
}

export default Home
