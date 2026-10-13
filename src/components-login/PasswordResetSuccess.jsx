import React from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordResetSuccess.css";
import resetpasswoedsuccess from "../assets/loginpage/resetpasswoedsuccess.png";
import protect from "../assets/loginpage/protect.png";
import ims from "../assets/loginpage/ims.png";
import successTick from "../assets/loginpage/successTick.png";
import badgeIcon from "../assets/loginpage/badgeIcon.png";
import { Header } from "../reusable-components/Header";


export const PasswordResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="ims-resetpasswordsuccess-main">
      <div className="ims-resetpasswordsuccess-leftcontainer">
        <Header/>
        <div className="ims-resetpasswordsuccess-left-content">
          <h1>
            Account Secured & Access
            <br />
            Restored
          </h1>
          <p className="ims-resetpasswordsuccess-description">
            Quickly regain access to your verified internship credentials,
            university approvals,
            <br />
            and active corporate placements.
          </p>
          <div className="ims-resetpasswordsuccess-illustration-container">
            <img
              src={resetpasswoedsuccess}
              alt="resetpasswoedsuccess"
              className="ims-resetpasswordsuccess-illustration"
            />
          </div>
          <div className="ims-resetpasswordsuccess-audit-card">
            <div>
              <img
                src={protect}
                alt="protect"
                className="ims-resetpasswordsuccess-protect-img"
              />
            </div>
            <div className="ims-resetpasswordsuccess-audit-text">
              <p>
                “Credential change verified across university registrars, Dean
                approvals, and enterprise partner portals.”
              </p>
              <p>
                Enterprise IAM & Security Operations —
                <span>Zero Trust Protocol Active</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ims-resetpasswordsuccess-right">
        <div className="ims-resetpasswordsuccess-content">
          <div className="ims-resetpasswordsuccess-success-icon">
            <img src={successTick} alt="Success" />
          </div>
          <div className="ims-resetpasswordsuccess-security-badge">
            <img
              src={badgeIcon}
              alt="Security"
              className="ims-resetpasswordsuccess-badge-icon"
            />
            <span>RECOVERY COMPLETED &bull; 256-BIT ENCRYPTED</span>
          </div>
          <h1>Password Reset Successful!</h1>
          <p className="ims-resetpasswordsuccess-success-description">
            Your account credentials have been securely updated. All
            <br />
            active enterprise and university sessions have been
            <br />
            refreshed.
          </p>
          <button
            className="ims-resetpasswordsuccess-login-btn"
            onClick={() => navigate("/components-login/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
