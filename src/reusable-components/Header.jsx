import React from 'react'
import "./Header.css";
import ims from "../assets/loginpage/ims.png";

export const Header=()=> {
  return (
     <div className="ims-login-register-navbar">
          <div className="ims-login-register-logo">
            <img src={ims} alt="Internims" className="ims-login-register-ims-image" />
            <div className="ims-login-register-logo-text">
              <h3>Internship Management System</h3>
              <p className="ims-login-register-tagline">
                <span  className="ims-login-register-tagline">Learn</span>
                <i></i>
                <span  className="ims-login-register-tagline">Grow</span>
                <i></i>
                <span  className="ims-login-register-tagline">Build</span>
              </p>
            </div>
          </div>
        </div>
  )
}
