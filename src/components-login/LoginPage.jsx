import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import ims from "../assets/loginpage/ims.png";
import mail from "../assets/loginpage/mail.png";
import lock from "../assets/loginpage/lock.png";
import eye from "../assets/loginpage/eye.png";
import eyeClose from "../assets/loginpage/eyeclose.png";
import google from "../assets/loginpage/google.png";
import arrow from "../assets/loginpage/arrow.png";
import yoy from "../assets/loginpage/yoy.png";
import deans from "../assets/loginpage/deans.png";
import login from "../assets/loginpage/login.png";
import protect from "../assets/loginpage/protect.png";
import { Header } from "../reusable-components/Header";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login Successful");
      console.log({
        email,
        password,
      });
    }
  };
  return (
    <div className="ims-login-main">
      <div className="ims-login-leftcontainer">
       <Header/>
        <div className="ims-login-left-content">
          <h1>
            Connecting academic talent with
            <br />
            career-defining corporate internships
          </h1>
          <p className="ims-login-description">
            The verified enterprise portal synchronizing university dean
            approvals, experiential learning hours, and Fortune 500 mentorship
            agreements.
          </p>
          <div className="ims-login-stats">
            <div className="ims-login-stat-card">
              <h2>14,200+</h2>
              <p>ACTIVE INTERNS</p>
              <span>
                <img src={yoy} alt="yoy" className="ims-login-yoy" /> 24% YoY
              </span>
            </div>
            <div className="ims-login-stat-card">
              <h2>98.4%</h2>
              <p>CREDIT VERIFIED</p>
              <span style={{ color: "#176789" }}>
                {" "}
                <img src={deans} alt="deans" className="ims-login-yoy" /> Deans
                Approved
              </span>
            </div>
            <div className="ims-login-stat-card">
              <h2>14,200+</h2>
              <p>ACTIVE INTERNS</p>
              <span>
                <img src={yoy} alt="yoy" className="ims-login-yoy" /> 24% YoY
              </span>
            </div>
          </div>
          <div className="ims-login-illustration-container">
            <img
              src={login}
              alt="Internship management illustration"
              className="ims-login-illustration"
            />
          </div>
          <div className="ims-login-audit-card">
            <div>
              <img
                src={protect}
                alt="protect"
                className="ims-login-protect-img"
              />
            </div>
            <div className="ims-login-audit-text">
              <p>
                “Automated audit trails cut academic credit clearance time from
                14 days to under 48 hours.”
                <span>
                  Dr. Elena Vance — Dean of Experiential Education, Northeastern
                  Consortium
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ims-login-rightcontainer">
        <form className="ims-login-box" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="ims-login-subtitle">Manage your career journey</p>
          <div className="ims-login-field">
            <label>Email Address</label>
            <div className="ims-login-input-box">
              <img src={mail} alt="Email" className="ims-login-input-icon" />
              <input
                type="email"
                placeholder="Enter Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="ims-login-error">{errors.email}</p>}
          </div>
          <div className="ims-login-password-row">
            <label>Password</label>
            <p
              className="ims-login-forgot-link"
              onClick={() => navigate("/components-login/forgotpassword")}
            >
              Forgot Password?
            </p>
          </div>
          <div className="ims-login-input-box">
            <img src={lock} alt="Password" className="ims-login-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eyeClose : eye}
              alt="Show password"
              className="ims-login-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password && (
            <p className="ims-login-error">{errors.password}</p>
          )}
          <div className="ims-login-remember">
            <input type="checkbox" id="keepSignedIn" />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <button className="ims-login-signin-btn" type="submit">
            Sign In
            <img src={arrow} alt="Arrow" />
          </button>
          <div className="ims-login-divider">
            <span></span>
            <p>OR CONTINUE WITH</p>
            <span></span>
          </div>
          <div className="ims-login-google-align">
            <button type="button" className="ims-login-google-btn">
              <img src={google} alt="Google" />
              Google
            </button>
            <p className="ims-login-create">
              Don't have an account?{" "}
              <span
                className="ims-login-create-link"
                onClick={() => navigate("/components-registration/welcome")}
              >
                Create Account
              </span>
            </p>
          </div>
          <div className="ims-login-footer-links">
            <a href="#help">Help</a>
            <span className="ims-login-footer-links-dot"></span>
            <a href="#privacy">Privacy</a>
            <span className="ims-login-footer-links-dot"></span>
            <a href="#terms">Terms</a>
          </div>
        </form>
      </div>
    </div>
  );
};