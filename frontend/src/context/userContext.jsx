import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create a context for user authentication
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// User provider to wrap the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        // Example: Replace with your API URL
        const response = await axios.get("http://localhost:4518/user/detail", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming token is stored in localStorage
          }
        });

        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
        if (error.response.data) {
          if (error.response.data.msg) {
            localStorage.removeItem('token');
            navigate('../');
          }
        }
        setUser(null); // In case of an error, reset user to null
      } finally {
        setLoading(false); // Stop loading indicator once the data is fetched or an error occurs
      }
    };

    // Fetch user details on component mount
    fetchUserDetails();
  }, []);

  // Value to be passed to consuming components
  const value = { user, setUser, loading };

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center h-72 items-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl" />
          </div>
        ) : (
          <UserContext.Provider value={value}>
            {children}
          </UserContext.Provider>
        )
      }
    </>
  );

};
