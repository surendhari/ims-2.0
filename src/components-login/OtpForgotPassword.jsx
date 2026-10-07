import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OtpForgotPassword.css";
import otpforgotpasswordmain from "../assets/loginpage/otpforgotpasswordmain.png";
import protect from "../assets/loginpage/protect.png";
import ims from "../assets/loginpage/ims.png";
import lock from "../assets/loginpage/lock.png";
import arrow from "../assets/loginpage/arrow.png";
import protectcode from "../assets/loginpage/protect1.png";

export const OtpForgotPassword = () => {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
    setError("");
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    navigate("/components-login/resetpassword");
  };
  return (
    <div className="ims-otpforgotpassword-main">
      <div className="ims-otpforgotpassword-leftcontainer">
        <div className="ims-otpforgotpassword-navbar">
          <div className="ims-otpforgotpassword-logo">
            <img
              src={ims}
              alt="Internims"
              className="ims-otpforgotpassword-ims-image"
            />
            <div className="ims-otpforgotpassword-logo-text">
              <h3>Internship Management System</h3>
              <p className="ims-otpforgotpassword-tagline">
                <span>Learn</span>
                <i></i>
                <span>Grow</span>
                <i></i>
                <span>Build Your Future</span>
              </p>
            </div>
          </div>
        </div>
        <div className="ims-otpforgotpassword-left-content">
          <h1>
            Verify Identity & Enter
            <br />
            Security Code
          </h1>
          <p className="ims-otpforgotpassword-description">
            A 6-digit one-time password has been transmitted to your registered{" "}
            <br />
            institutional credentials.
          </p>
          <div className="ims-otpforgotpassword-illustration-container">
            <img
              src={otpforgotpasswordmain}
              alt="Internship management illustration"
              className="ims-otpforgotpassword-illustration"
            />
          </div>
          <div className="ims-otpforgotpassword-audit-card">
            <div>
              <img
                src={protect}
                alt="protect"
                className="ims-otpforgotpassword-protect-img"
              />
            </div>
            <div className="ims-otpforgotpassword-audit-text">
              <p>
                “Credential change verified across university registrars, Dean
                approvals, and enterprise partner portals.”
              </p>
              <p>
                Enterprise IAM & Security Operations
                <span>— Zero Trust Protocol Active</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ims-otpforgotpassword-rightcontainer">
        <div className="ims-otp-box">
          <h1>Enter Verification Code</h1>
          <p className="ims-otp-text">
            We've sent a 6-digit code to your registered Email and phone number.
            The code will expire in 09:59 minutes.
          </p>
          <div className={`ims-otp-inputs ${error ? "otp-invalid" : ""}`}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-invalid={!!error}
              />
            ))}
          </div>
          {error && <p className="ims-otp-error">{error}</p>}
          <button className="ims-verify-btn" onClick={handleVerify}>
            Verify and Continue
            <img src={arrow} alt="" />
          </button>
          <p className="ims-resend">
            Didn't receive the code?
            <span> Resend (in 00:55)</span>
          </p>
          <hr />
          <div className="ims-security">
            <div>
              <img src={lock} alt="lock" />
              <span>END-TO-END ENCRYPTED</span>
            </div>
            <div>
              <img src={protectcode} alt="" />
              <span>SECURE HANDSHAKE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
