import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/students/Login";
import Signup from "./pages/students/Signup";
import StudentHome from './pages/students/Home.jsx';
import PageNotFound from "./pages/PageNotFound.jsx";
import Account from "./components/students/Account.jsx";
import Sidebar from './components/students/Sidebar';
import Navbar from './components/students/Navbar';
import BreadcrumbExp from "./components/Breadcrumb.jsx";
import './style/index.css';

function StudentLayout({ header }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
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

          {/* Connected with sidebar and navbar  */}
          <Route element={<StudentLayout header="Dashboard" />}>
            <Route path="/student/dashboard" element={<StudentHome />} />
          </Route>

          <Route element={<StudentLayout header="Account Details" />}>
            <Route path="/student/account" element={<Account />} />
          </Route>


          {/* 404 page not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
