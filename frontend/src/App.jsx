import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// Landing Page 
import LandingPage from "./pages/LandingPage";
// Student Pages 
import Login from "./pages/Students/Login.jsx";
import Signup from "./pages/students/Signup";
import StudentHome from './pages/students/Home.jsx';
import Account from "./components/students/Account.jsx";
import SidebarStudent from './components/students/Sidebar';
import Navbar from './components/students/Navbar';
import CompleteProfile from "./components/completeProfile.jsx";
// TPO pages
import SidebarTPO from './components/tpo/Sidebar';
import LoginTPO from "./pages/TPO/Login.jsx";
import AccountTPO from "./components/TPO/Account.jsx";
import StudentsTPO from "./components/TPO/Students.jsx";
// Management pages
import SidebarManagement from "./components/Management/Sidebar.jsx";
import LoginManagement from "./pages/Management/Login.jsx";
import AccountManagement from "./components/Management/Account.jsx";
import AddTPO from "./components/Management/AddTPO.jsx";
// Page not found 
import PageNotFound from "./pages/PageNotFound.jsx";
// breadcrumb
import BreadcrumbExp from "./components/Breadcrumb.jsx";
// css
import './style/index.css';

import { UserProvider } from "./context/userContext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";


function StudentLayout({ header }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SidebarStudent />
        <div className="content flex-grow p-4">
          <BreadcrumbExp header={header} />
          <Outlet />
        </div>
      </div>
    </>
  )
}

function ManagementLayout({ header }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SidebarManagement />
        <div className="content flex-grow p-4">
          <BreadcrumbExp header={header} />
          <Outlet />
        </div>
      </div>
    </>
  )
}

function TPOLayout({ header }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SidebarTPO />
        <div className="content flex-grow p-4">
          <BreadcrumbExp header={header} />
          <Outlet />
        </div>
      </div>
    </>
  )
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route  */}
          <Route index element={<LandingPage />} />
          {/* Student Login, Sign Up  */}
          <Route path="/student/login" element={<Login />} />
          <Route path="/student/signup" element={<Signup />} />
          {/* TPO Login  */}
          <Route path="/tpo/login" element={<LoginTPO />} />
          {/* Management Login  */}
          <Route path="/management/login" element={<LoginManagement />} />
          {/* 404 page not found route */}
          <Route path="*" element={<PageNotFound />} />


          {/* All student routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['student']} /></UserProvider>}>
            <Route element={<StudentLayout header="Dashboard" />}>
              <Route path="/student/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<StudentLayout header="Account Details" />}>
              <Route path="/student/account" element={<Account />} />
            </Route>
            <Route path="/student/complete-profile" element={<CompleteProfile />} />
          </Route>


          {/* All tpo routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['tpo_admin']} /></UserProvider>}>
            <Route element={<TPOLayout header="Dashboard" />}>
              <Route path="/tpo/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<TPOLayout header="Account Details" />}>
              <Route path="/tpo/account" element={<AccountTPO />} />
            </Route>
            <Route element={<TPOLayout header="Students" />}>
              <Route path="/tpo/students" element={<StudentsTPO />} />
            </Route>
            <Route path="/tpo/complete-profile" element={<CompleteProfile />} />
          </Route>


          {/* All management routes  */}
          <Route element={<UserProvider><ProtectedRoute allowedRoles={['management_admin']} /></UserProvider>}>
            <Route element={<ManagementLayout header="Dashboard" />}>
              <Route path="/management/dashboard" element={<StudentHome />} />
            </Route>
            <Route element={<ManagementLayout header="Account Details" />}>
              <Route path="/management/account" element={<AccountManagement />} />
            </Route>
            <Route element={<ManagementLayout header="TPO Admins" />}>
              <Route path="/management/tpoadmin" element={<AddTPO />} />
            </Route>
            <Route path="/management/complete-profile" element={<CompleteProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
