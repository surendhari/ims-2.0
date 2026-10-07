import React from 'react';
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/components-login/login')}>
        Login
      </button>
    </div>
  );
};