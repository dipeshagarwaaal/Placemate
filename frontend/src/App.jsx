import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// Landing Page 
import LandingPage from "./pages/LandingPage";

// Student Pages 
import Login from "./pages/Students/Login.jsx";
import Signup from "./pages/students/Signup";
import StudentHome from './pages/students/Home.jsx';
import UpdatePlacementProfile from "./components/Students/UpdatePlacementProfile.jsx";
import UpdateJobStatus from "./components/Students/UpdateJobStatus.jsx";
// TPO pages
import LoginTPO from "./pages/TPO/Login.jsx";
import StudentsTPO from "./components/TPO/Students.jsx";
import StudentAccYearTPO from "./components/TPO/StudentYear.jsx";
import PostJobTPO from "./components/TPO/PostJob.jsx";
import AddCompany from "./components/TPO/AddCompany.jsx";
// Management pages
import LoginManagement from "./pages/Management/Login.jsx";
import AddTPO from "./pages/Management/AddTPO.jsx";
// super user
import LoginSuperUser from "./components/SuperUser/Login.jsx";
import ManagementSuperUser from "./components/SuperUser/AddManagement.jsx";
import TPOSuperUser from "./components/SuperUser/AddTPO.jsx";
import StudentSuperUser from "./components/SuperUser/AddStudent.jsx";
import HomeSuperUser from "./components/SuperUser/Home.jsx";
import ApproveStudent from "./components/ApproveStudent.jsx";

// common users
// for admin, tpo to edit or view user details 
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from "./components/Footer.jsx";
import Account from "./components/Account.jsx";
import UserDetails from "./components/UserDetails.jsx";
import ViewJobPost from "./components/ViewJobPost.jsx";
import ViewUserData from "./components/ViewUserData.jsx";
import AllJobPost from "./components/AllJobPost.jsx";
import AllCompany from "./components/AllCompany.jsx";

// Page not found 
import PageNotFound from "./pages/PageNotFound.jsx";
// breadcrumb
import BreadcrumbExp from "./components/Breadcrumb.jsx";
// css
import './style/index.css';

import { UserProvider } from "./context/userContext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import { useState, useEffect } from "react";


function Layout({ header }) {
  // Get sidebar state from localStorage or default to false
  const isSidebarOpenFromStorage = localStorage.getItem('isSidebarOpen') === 'true';

  // State to control sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(isSidebarOpenFromStorage);

  // Toggle sidebar visibility and update localStorage
  const toggleSidebar = () => {
    const newState = !isSidebarVisible;
    setSidebarVisible(newState);
    localStorage.setItem('isSidebarOpen', newState);
  };

  useEffect(() => {
    // Ensure localStorage has a default value on initial load
    if (localStorage.getItem('isSidebarOpen') === null) {
      localStorage.setItem('isSidebarOpen', 'false');
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="flex flex-grow">
          <Sidebar isSidebarVisible={isSidebarVisible} />
          <div className={`content flex-grow p-4 transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
            <BreadcrumbExp header={header} />
            <Outlet />
          </div>
        </div>
        <Footer isSidebarVisible={isSidebarVisible} />
      </div>
    </>
  );
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route  */}
          <Route index element={<LandingPage />} />
          {/* Student Login, Sign Up  */}
          <Route path="/student/logIn" element={<Login />} />
          <Route path="/student/signup" element={<Signup />} />
          {/* TPO Login  */}
          <Route path="/tpo/login" element={<LoginTPO />} />
          {/* Management Login  */}
          <Route path="/management/login" element={<LoginManagement />} />
          {/* admin login */}
          <Route path="/admin" element={<LoginSuperUser />} />



          {/* All student routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['student']} /></UserProvider>}>

            <Route path="/student/complete-profile/:userId" element={<UserDetails />} />

            <Route element={<Layout header="Dashboard" />}>
              <Route path="/student/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<Layout header="Account Details" />}>
              <Route path="/student/account" element={<Account />} />
            </Route>
            <Route element={<Layout header="Placement Listings" />}>
              <Route path="/student/job-listings" element={<AllJobPost />} />
            </Route>
            {/* view a job post */}
            <Route element={<Layout header="Job Listing" />}>
              <Route path="/student/job/:jobId" element={<ViewJobPost />} />
            </Route>
            {/* placement profile update */}
            <Route element={<Layout header="Placement Profile" />}>
              <Route path="/student/placement-profile" element={<UpdatePlacementProfile />} />
            </Route>
            {/* update status of job */}
            <Route element={<Layout header="Update Job Application Status" />}>
              <Route path="/student/status/:jobId" element={<UpdateJobStatus />} />
            </Route>
          </Route>


          {/* All tpo routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['tpo_admin']} /></UserProvider>}>
            <Route path="/tpo/complete-profile/:userId" element={<UserDetails />} />
            <Route element={<Layout header="Dashboard" />}>
              <Route path="/tpo/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<Layout header="Account Details" />}>
              <Route path="/tpo/account" element={<Account />} />
            </Route>
            <Route element={<Layout header="Students" />}>
              <Route path="/tpo/students" element={<StudentAccYearTPO />} />
            </Route>
            <Route element={<Layout header="Approve Student User" />}>
              <Route path="/tpo/approve-student" element={<ApproveStudent />} />
            </Route>
            {/* to view student data  */}
            <Route element={<Layout header="User Details" />}>
              <Route path="/tpo/user/:userId" element={<ViewUserData />} />
            </Route>
            {/* post jobs */}
            <Route element={<Layout header="Post New Job" />}>
              <Route path="/tpo/post-job" element={<PostJobTPO />} />
            </Route>
            {/* edit post jobs */}
            <Route element={<Layout header="Edit Job Detail" />}>
              <Route path="/tpo/post-job/:jobId" element={<PostJobTPO />} />
            </Route>
            {/* all jobs post */}
            <Route element={<Layout header="Placement Listings" />}>
              <Route path="/tpo/job-listings" element={<AllJobPost />} />
            </Route>
            {/* view a job post */}
            <Route element={<Layout header="Job Listing" />}>
              <Route path="/tpo/job/:jobId" element={<ViewJobPost />} />
            </Route>
            {/* all company */}
            <Route element={<Layout header="All Companys" />}>
              <Route path="/tpo/companys" element={<AllCompany />} />
            </Route>
            {/* add company */}
            <Route element={<Layout header="Add Company Detail" />}>
              <Route path="/tpo/add-company" element={<AddCompany />} />
            </Route>
            {/* company */}
            <Route element={<Layout header="Edit Company Detail" />}>
              <Route path="/tpo/add-company/:companyId" element={<AddCompany />} />
            </Route>
          </Route>


          {/* All management routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['management_admin']} /></UserProvider>}>
            <Route element={<Layout header="Dashboard" />}>
              <Route path="/management/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<Layout header="Account Details" />}>
              <Route path="/management/account" element={<Account />} />
            </Route>
            <Route element={<Layout header="TPO Admins" />}>
              <Route path="/management/tpoadmin" element={<AddTPO />} />
            </Route>
            <Route element={<Layout header="Approve Student User" />}>
              <Route path="/management/approve-student" element={<ApproveStudent />} />
            </Route>
            {/* to view student data  */}
            <Route element={<Layout header="User" />}>
              <Route path="/management/user/:userId" element={<UserDetails />} />
            </Route>
            <Route path="/management/complete-profile/:userId" element={<UserDetails />} />
          </Route>


          {/* all admin routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['superuser']} /></UserProvider>}>
            <Route element={<Layout header="Dashboard" />}>
              <Route path="/admin/Dashboard" element={<HomeSuperUser />} />
            </Route>
            <Route element={<Layout header="Management Users" />}>
              <Route path="/admin/management" element={<ManagementSuperUser />} />
            </Route>
            <Route element={<Layout header="TPO Users" />}>
              <Route path="/admin/tpo" element={<TPOSuperUser />} />
            </Route>
            <Route element={<Layout header="Student Users" />}>
              <Route path="/admin/student" element={<StudentSuperUser />} />
            </Route>
            <Route element={<Layout header="Approve Student User" />}>
              <Route path="/admin/approve-student" element={<ApproveStudent />} />
            </Route>
            <Route element={<Layout header="Users" />}>
              <Route path="/admin/user/:userId" element={<UserDetails />} />
            </Route>
          </Route>


          {/* 404 page not found route */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
