import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    // You can replace this with a loading spinner or component if desired
    return (
      <>
        <div className="flex justify-center h-72 items-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl" />
        </div>
      </>
    )
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user.role === 'tpo_admin') {
      return <Navigate to="/tpo/dashboard" replace />;
    } else if (user.role === 'management_admin') {
      return <Navigate to="/management/dashboard" replace />;
    } else {
      // Redirect to a default 404 or error page
      return <Navigate to="/404" replace />;
    }
  }

  // If user has the proper role, render the children routes
  return <Outlet />;
};

export default ProtectedRoute;
