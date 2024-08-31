import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for user authentication
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// User provider to wrap the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );

};
