import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import resetpasswordpasswordmain from "../assets/loginpage/resetpasswordmain.png";
import protect from "../assets/loginpage/protect.png";
import ims from "../assets/loginpage/ims.png";
import lock from "../assets/loginpage/lock.png";
import forgot from "../assets/loginpage/forgot.png";
import protectcode from "../assets/loginpage/protect1.png";
import arrow from "../assets/loginpage/arrow.png";
export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#!^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    navigate("/components-login/resetpasswordsuccess");
  };
  return (
    <div className="ims-resetpassword-main">
      <div className="ims-resetpassword-leftcontainer">
        <div className="ims-resetpassword-navbar">
          <div className="ims-resetpassword-logo">
            <img
              src={ims}
              alt="Internims"
              className="ims-resetpassword-ims-image"
            />
            <div className="ims-resetpassword-logo-text">
              <h3>Internship Management System</h3>
              <p className="ims-resetpassword-tagline">
                <span>Learn</span>
                <i></i>
                <span>Grow</span>
                <i></i>
                <span>Build Your Future</span>
              </p>
            </div>
          </div>
        </div>
        <div className="ims-resetpassword-left-content">
          <h1>Set a Strong Master Password</h1>
          <p className="ims-resetpassword-description">
            Protect your internship credentials, academic clearance records, and
            enterprise <br />
            communication channels.
          </p>
          <div className="ims-resetpassword-illustration-container">
            <img
              src={resetpasswordpasswordmain}
              alt="resetpasswordpasswordmain"
              className="ims-resetpassword-illustration"
            />
          </div>
          <div className="ims-resetpassword-audit-card">
            <div>
              <img
                src={protect}
                alt="protect"
                className="ims-resetpassword-protect-img"
              />
            </div>
            <div className="ims-resetpassword-audit-text">
              <p>
                “Automated credential audit enforces strict NIST 800-63B
                password guidelines and institutional SSO policies.”
              </p>
              <p>
                Dr. Elena Vance — Dean of Experiential Education & IAM Security
                Lead
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ims-resetpassword-rightcontainer">
        <div className="ims-reset-password-card">
          <div className="ims-reset-password-icon">
            <img src={forgot} alt="forgot" />
          </div>
          <h1 className="ims-reset-password-title">Set New Password</h1>
          <p className="ims-reset-password-text">
            Your new password must be different from previous passwords.
          </p>
          <div className="ims-reset-password-field">
            <label>New Password</label>
            <div
              className={`ims-reset-password-input-box ${
                newPassword
                  ? newPassword.length >= 8
                    ? "valid-field"
                    : "invalid-field"
                  : ""
              }`}
            >
              <img src={lock} alt="" className="left-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="ims-reset-password-field">
            <label>Confirm New Password</label>
            <div
              className={`ims-reset-password-input-box ${
                confirmPassword
                  ? confirmPassword === newPassword
                    ? "valid-field"
                    : "invalid-field"
                  : ""
              }`}
            >
              <img src={protectcode} alt="" className="left-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="ims-reset-password-error">{error}</p>}
          <div className="ims-reset-password-rules">
            <div
              className={`ims-reset-rule-item ${
                newPassword.length >= 8 ? "rule-valid" : "rule-invalid"
              }`}
            >
              <span className="ims-reset-rule-circle">
                {newPassword.length >= 8 && "✓"}
              </span>
              <p>At least 8 characters</p>
            </div>
            <div
              className={`ims-reset-rule-item ${
                confirmPassword && confirmPassword === newPassword
                  ? "rule-valid"
                  : "rule-invalid"
              }`}
            >
              <span className="ims-reset-rule-circle">
                {confirmPassword && confirmPassword === newPassword && "✓"}
              </span>
              <p>Passwords match</p>
            </div>
          </div>
          <button
            className="ims-reset-password-btn"
            onClick={handleUpdatePassword}
          >
            Update Password
            <img src={arrow} alt="" />
          </button>
          <div className="ims-reset-login-link">
            <Link to="/components-login/login" className="ims-back-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
