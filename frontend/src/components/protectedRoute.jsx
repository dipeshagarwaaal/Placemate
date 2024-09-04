import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = () => {

      if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }

      if (user.isProfileCompleted === 'false') {
        if (user.role === 'student') navigate("/student/complete-profile");
        if (user.role === 'tpo_admin') navigate("/tpo/complete-profile");
        if (user.role === 'management_admin') navigate(`/management/complete-profile/${user.id}`);
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        if (user.role === 'student') {
          return <Navigate to="/student/dashboard" replace />;
        } else if (user.role === 'tpo_admin') {
          return <Navigate to="/tpo/dashboard" replace />;
        } else if (user.role === 'management_admin') {
          return <Navigate to="/management/dashboard" replace />;
        } else if (user.role === 'superuser') {
          return <Navigate to="/admin/dashboard" replace />;
        } else {
          return <Navigate to="/404" replace />;
        }
      }
    }

    redirectUser();
  }, [loading, navigate, user, allowedRoles])


  // If user has the proper role, render the children routes
  return (
    <>
      {
        loading ? (
          <div className="flex justify-center h-72 items-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl" />
          </div>
        ) : (
          <Outlet />
        )
      }
    </>
  )
};

export default ProtectedRoute;
