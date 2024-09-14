import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// Landing Page 
import LandingPage from "./pages/LandingPage";

// Student Pages 
import Login from "./pages/Students/Login.jsx";
import Signup from "./pages/Students/Signup";
import HomeStudent from './pages/Students/Home.jsx';
import UpdatePlacementProfile from "./components/Students/UpdatePlacementProfile.jsx";
import UpdateJobStatus from "./components/Students/UpdateJobStatus.jsx";
import AddInternship from "./components/Students/AddInternship.jsx";
import MyAppliedJobs from "./components/Students/MyApplied.jsx";
// TPO pages
import LoginTPO from "./pages/TPO/Login.jsx";
import HomeTPO from './pages/TPO/Home.jsx';
import StudentAccYearTPO from "./components/TPO/StudentYearAndBranchView.jsx";
import PostJobTPO from "./components/TPO/PostJob.jsx";
import AddNewUser from "./components/Management/AddNewUser.jsx";
import AddCompany from "./components/TPO/AddCompany.jsx";
// Management pages
import HomeManagement from './pages/Management/Home.jsx';
import LoginManagement from "./pages/Management/Login.jsx";
import ListAllTPO from "./components/Management/ListAllTPO.jsx";
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
import ViewAllInternship from "./components/ViewAllInternship.jsx";
import SendNotice from "./components/SendNotice.jsx";
import ViewlAllNotice from "./pages/ViewlAllNotice.jsx";

// Page not found 
import PageNotFound from "./pages/PageNotFound.jsx";
// breadcrumb
import BreadcrumbExp from "./components/Breadcrumb.jsx";
// css
import './style/index.css';

import { UserProvider } from "./context/userContext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import { useState, useEffect } from "react";
import ViewNotice from "./components/ViewNotice.jsx";


function Layout({ header }) {
  // Get sidebar state from localStorage or default to false
  const isSidebarOpenFromStorage = localStorage.getItem('isSidebarOpen') === 'true' || true;

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
              <Route path="/student/dashboard" element={<HomeStudent />} />
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
            {/* my applied jobs */}
            <Route element={<Layout header="Applied Jobs" />}>
              <Route path="/student/myjob" element={<MyAppliedJobs />} />
            </Route>
            {/* placement profile update */}
            <Route element={<Layout header="Placement Profile" />}>
              <Route path="/student/placement-profile" element={<UpdatePlacementProfile />} />
            </Route>
            {/* update status of job */}
            <Route element={<Layout header="Update Job Application Status" />}>
              <Route path="/student/status/:jobId" element={<UpdateJobStatus />} />
            </Route>
            {/* view all internships */}
            <Route element={<Layout header="My Internships" />}>
              <Route path="/student/internship" element={<ViewAllInternship />} />
            </Route>
            {/* add internships */}
            <Route element={<Layout header="Add New Internship" />}>
              <Route path="/student/add-internship" element={<AddInternship />} />
            </Route>
            {/* add internships */}
            <Route element={<Layout header="Update Internship Details" />}>
              <Route path="/student/add-internship/:internshipId" element={<AddInternship />} />
            </Route>
            {/* view notice */}
            <Route element={<Layout header="Notice" />}>
              <Route path="/student/notice/:noticeId" element={<ViewNotice />} />
            </Route>
            {/* all notice */}
            <Route element={<Layout header="All Notices" />}>
              <Route path="/student/all-notice" element={<ViewlAllNotice />} />
            </Route>
          </Route>


          {/* All tpo routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['tpo_admin']} /></UserProvider>}>
            <Route path="/tpo/complete-profile/:userId" element={<UserDetails />} />
            <Route element={<Layout header="Dashboard" />}>
              <Route path="/tpo/dashboard" element={<HomeTPO />} />
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
            {/* update particular company */}
            <Route element={<Layout header="Edit Company Detail" />}>
              <Route path="/tpo/add-company/:companyId" element={<AddCompany />} />
            </Route>
            {/* all notice */}
            <Route element={<Layout header="All Notices" />}>
              <Route path="/tpo/all-notice" element={<ViewlAllNotice />} />
            </Route>
            {/* view notice */}
            <Route element={<Layout header="Notice" />}>
              <Route path="/tpo/notice/:noticeId" element={<ViewNotice />} />
            </Route>
            {/* send notice */}
            <Route element={<Layout header="Send Notice" />}>
              <Route path="/tpo/send-notice" element={<SendNotice />} />
            </Route>
          </Route>


          {/* All management routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['management_admin']} /></UserProvider>}>

            <Route path="/management/complete-profile/:userId" element={<UserDetails />} />

            <Route element={<Layout header="Dashboard" />}>
              <Route path="/management/dashboard" element={<HomeManagement />} />
            </Route>
            <Route element={<Layout header="Account Details" />}>
              <Route path="/management/account" element={<Account />} />
            </Route>
            {/* list all tpo  */}
            <Route element={<Layout header="TPO Admins" />}>
              <Route path="/management/tpo-admin" element={<ListAllTPO />} />
            </Route>
            {/* add new tpo */}
            <Route element={<Layout header="Create New TPO Admin" />}>
              <Route path="/management/add-tpo-admin" element={<AddNewUser />} />
            </Route>
            <Route element={<Layout header="Approve Students" />}>
              <Route path="/management/approve-student" element={<ApproveStudent />} />
            </Route>
            <Route element={<Layout header="Approve Student User" />}>
              <Route path="/management/approve-student" element={<ApproveStudent />} />
            </Route>
            {/* all student  */}
            <Route element={<Layout header="Students" />}>
              <Route path="/management/students" element={<StudentAccYearTPO />} />
            </Route>
            {/* to view student data  */}
            <Route element={<Layout header="User" />}>
              <Route path="/management/user/:userId" element={<ViewUserData />} />
            </Route>
            {/* all company */}
            <Route element={<Layout header="All Companys" />}>
              <Route path="/management/companys" element={<AllCompany />} />
            </Route>
            {/* add company */}
            <Route element={<Layout header="Add Company Detail" />}>
              <Route path="/management/add-company" element={<AddCompany />} />
            </Route>
            {/* update particular company */}
            <Route element={<Layout header="Edit Company Detail" />}>
              <Route path="/management/add-company/:companyId" element={<AddCompany />} />
            </Route>
            {/* all jobs post */}
            <Route element={<Layout header="Placement Listings" />}>
              <Route path="/management/job-listings" element={<AllJobPost />} />
            </Route>
            {/* view a job post */}
            <Route element={<Layout header="Job Listing" />}>
              <Route path="/management/job/:jobId" element={<ViewJobPost />} />
            </Route>
            {/* post jobs */}
            <Route element={<Layout header="Post New Job" />}>
              <Route path="/management/post-job" element={<PostJobTPO />} />
            </Route>
            {/* edit post jobs */}
            <Route element={<Layout header="Edit Job Detail" />}>
              <Route path="/management/post-job/:jobId" element={<PostJobTPO />} />
            </Route>
            {/* all notice */}
            <Route element={<Layout header="All Notices" />}>
              <Route path="/management/all-notice" element={<ViewlAllNotice />} />
            </Route>
            {/* view notice */}
            <Route element={<Layout header="Notice" />}>
              <Route path="/management/notice/:noticeId" element={<ViewNotice />} />
            </Route>
            {/* send notice */}
            <Route element={<Layout header="Send Notice" />}>
              <Route path="/management/send-notice" element={<SendNotice />} />
            </Route>
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
            {/* add new student */}
            <Route element={<Layout header="Create New Student" />}>
              <Route path="/admin/add-student" element={<AddNewUser />} />
            </Route>
            {/* add new tpo */}
            <Route element={<Layout header="Create New TPO Admin" />}>
              <Route path="/admin/add-tpo-admin" element={<AddNewUser />} />
            </Route>
            {/* add new management */}
            <Route element={<Layout header="Create New Management Admin" />}>
              <Route path="/admin/add-management-admin" element={<AddNewUser />} />
            </Route>
            {/* all company */}
            <Route element={<Layout header="All Companys" />}>
              <Route path="/admin/companys" element={<AllCompany />} />
            </Route>
            {/* add company */}
            <Route element={<Layout header="Add Company Detail" />}>
              <Route path="/admin/add-company" element={<AddCompany />} />
            </Route>
            {/* update particular company */}
            <Route element={<Layout header="Edit Company Detail" />}>
              <Route path="/admin/add-company/:companyId" element={<AddCompany />} />
            </Route>
            {/* all jobs post */}
            <Route element={<Layout header="Placement Listings" />}>
              <Route path="/admin/job-listings" element={<AllJobPost />} />
            </Route>
            {/* view a job post */}
            <Route element={<Layout header="Job Listing" />}>
              <Route path="/admin/job/:jobId" element={<ViewJobPost />} />
            </Route>
            {/* post jobs */}
            <Route element={<Layout header="Post New Job" />}>
              <Route path="/admin/post-job" element={<PostJobTPO />} />
            </Route>
            {/* edit post jobs */}
            <Route element={<Layout header="Edit Job Detail" />}>
              <Route path="/admin/post-job/:jobId" element={<PostJobTPO />} />
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
