import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../Services/auth'; // Import the verifyToken function
import { getToken } from '../Services/auth'; // Import the getToken function
import './Page.css';

const Dashboard = () => {
  // const navigate = useNavigate();
  // const intervalRef = useRef(null); // Ref to store interval ID
  // const [isChecking, setIsChecking] = useState(false); // Track token check status
  // const [hasNavigated, setHasNavigated] = useState(false); // Track if navigation has occurred

  // const checkTokenValidity = useCallback(async () => {
  //   setIsChecking(true); // Set checking status to true
  //   const token = getToken(); // Retrieve the token

  //   if (token) {
  //     const isValid = await verifyToken(token);
  //     if (!isValid && !hasNavigated) {
  //       setHasNavigated(true); // Prevent multiple navigations
  //       navigate('/login'); // Redirect to login if token is invalid
  //     }
  //   } else if (!hasNavigated) {
  //     setHasNavigated(true); // Prevent multiple navigations
  //     navigate('/login'); // Redirect if no token found
  //   }
    
  //   setIsChecking(false); // Reset checking status
  // }, [hasNavigated, navigate]); // Add hasNavigated and navigate as dependencies

  // useEffect(() => {
  //   // Check token validity immediately when component mounts
  //   checkTokenValidity();

  //   // Set an interval to check token validity every 5 minutes
  //   intervalRef.current = setInterval(() => {
  //     if (!isChecking) {
  //       checkTokenValidity(); // Call check only if not currently checking
  //     }
  //   }, 5 * 60 * 1000);

  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalRef.current);
  // }, [checkTokenValidity, isChecking]); // Add checkTokenValidity and isChecking as dependencies
  
  return (
    <div className="DashboardPage">
      <div className="dashboard-card">
        <h2>Welcome to the Dashboard of Furniture Mecca</h2>
        <p>Here you can view and manage all your data efficiently.</p>
      </div>
    </div>
  );
};

export default Dashboard;