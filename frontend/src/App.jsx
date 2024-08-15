import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/students/Login";
import Signup from "./pages/students/Signup";
import StudentHome from './pages/students/Home.jsx' ;

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route  */}
          <Route index element={<LandingPage />}></Route>

          {/* Student Login, Sign Up  */}
          <Route path="/student/login" element={<Login />}></Route>
          <Route path="/student/signup" element={<Signup />}></Route>
          <Route path="/student/home" element={<StudentHome />}></Route>




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
