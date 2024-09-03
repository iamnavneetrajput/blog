import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If no token is found, redirect to login
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Dashboard;
