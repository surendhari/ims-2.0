import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import forgotpasswordmain from "../assets/loginpage/forgotpasswordmain.png";
import protect from "../assets/loginpage/protect.png";
import ims from "../assets/loginpage/ims.png";
import forgot from "../assets/loginpage/forgot.png";
import arrow from "../assets/loginpage/arrow.png";
import forgotmail from "../assets/loginpage/forgotmail.png";
import sms from "../assets/loginpage/sms.png";
import backarrow from "../assets/loginpage/backarrow.png";


export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email");
  return (
    <div className="ims-forgotpassword-main">
      <div className="ims-forgotpassword-leftcontainer">
        <div className="ims-forgotpassword-navbar">
          <div className="ims-forgotpassword-logo">
            <img
              src={ims}
              alt="Internims"
              className="ims-forgotpassword-ims-image"
            />
            <div className="ims-forgotpassword-logo-text">
              <h3>Internship Management System</h3>
              <p className="ims-forgotpassword-tagline">
                <span>Learn</span>
                <i></i>
                <span>Grow</span>
                <i></i>
                <span>Build Your Future</span>
              </p>
            </div>
          </div>
        </div>
        <div className="ims-forgotpassword-left-content">
          <h1>
            Secure Account Recovery &
            <br />
            Identity Protection
          </h1>
          <p className="ims-forgotpassword-description">
            Quickly regain access to your verified internship credentials,
            university approvals, <br />
            and active corporate placements.
          </p>
          <div className="ims-forgotpassword-illustration-container">
            <img
              src={forgotpasswordmain}
              alt="Internship management illustration"
              className="ims-forgotpassword-illustration"
            />
          </div>
          <div className="ims-forgotpassword-audit-card">
            <div>
              <img
                src={protect}
                alt="protect"
                className="ims-forgotpassword-protect-img"
              />
            </div>
            <div className="ims-forgotpassword-audit-text">
              <p>
                All password reset requests are cryptographically signed and
                logged according to institutional FERPA & SOC-2 compliance
                standards.
              </p>
              <span>Campus Identity & Access Management (IAM) Protocol</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ims-forgotpassword-rightcontainer">
        <div className="ims-forgotpassword-box">
          <div className="ims-forgotpassword-icon">
            <img src={forgot} alt="Forgot password" />
          </div>
          <h1 className="ims-forgotpassword-title">Forgot Password?</h1>
          <p className="ims-forgotpassword-subtitle">
            Choose your preferred method to receive a one-time
            <br />
            verification code.
          </p>
          <h4 className="ims-forgotpassword-method-title">
            Verification Method
          </h4>
          <div
            className={`ims-forgotpassword-verify-option ${
              method === "email" ? "active" : ""
            }`}
            onClick={() => setMethod("email")}
          >
            <div className="ims-forgotpassword-option-icon">
              <img src={forgotmail} alt="Email" />
            </div>
            <div className="ims-forgotpassword-option-content">
              <h4>Email Address</h4>
              <p>j**n@g***l.com</p>
            </div>
            <input
              type="radio"
              name="verification"
              checked={method === "email"}
              onChange={() => setMethod("email")}
            />
          </div>
          <div
            className={`ims-forgotpassword-verify-option ${
              method === "sms" ? "active" : ""
            }`}
            onClick={() => setMethod("sms")}
          >
            <div className="ims-forgotpassword-option-icon">
              <img src={sms} alt="SMS" />
            </div>
            <div className="ims-forgotpassword-option-content">
              <h4>SMS / Text Message</h4>
              <p>Send code to +91 9***-5678</p>
            </div>
            <input
              type="radio"
              name="verification"
              checked={method === "sms"}
              onChange={() => setMethod("sms")}
            />
          </div>
          <button
            className="ims-forgotpassword-verify-btn"
            onClick={() => navigate("/components-login/otpforgotpassword")}
          >
            Send Verification Code
            <img src={arrow} alt="" />
          </button>
          <div className="ims-forgotpassword-back-login">
            <Link
              to="/components-login/login"
              className="ims-forgotpassword-back-link"
            >
              <img
                className="ims-forgotpassword-arrow"
                src={backarrow}
                alt="backarrow"
              />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
