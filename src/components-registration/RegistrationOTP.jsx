import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./RegistrationOTP.css";
import "../Components-Registration/RegistrationOTP.css";
import RegistrationOtp from "../assets/Registration/registartion-otp-illustartion.png";
import WhiteShiled from "../assets/Registration/white-shield.png";
import RightArrow from "../assets/Registration/right-arrow.png";
import BackToVerification from "../assets/Registration/back-to-verification.png";
import { Header } from "../reusable-components/Header";


export const RegistrationOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const location = useLocation();
  const type = location.state?.type || "email";

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");
    const newErrors = {};

    if (code.length !== 6) {
      newErrors.verificationCode =
        "Please enter the 6-digit verification code.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const draftKey = "hrRegistrationDraft";
    let draft = {};

    try {
      draft = JSON.parse(sessionStorage.getItem(draftKey)) || {};
    } catch {
      draft = {};
    }

    if (!draft.formData) {
      setErrors({
        verificationCode: "Registration details not found. Please try again.",
      });
      return;
    }

    const updatedDraft = {
      ...draft,
      emailVerified: type === "email" ? true : (draft.emailVerified ?? false),
      phoneVerified: type === "phone" ? true : (draft.phoneVerified ?? false),
    };

    sessionStorage.setItem(draftKey, JSON.stringify(updatedDraft));

    navigate("/components-registration/hr-registration");
  };
  return (
    <div className="ims-reg-otp-container ">
      <div className="ims-reg-otp-inner-container">
        <div className="ims-reg-otp-left-content">
          <Header/>

          <div className="ims-reg-otp-middle-content">
            <div className="ims-reg-otp-main-content">
              <h2>
                Verify your student email to
                <br />
                activate your account
              </h2>
              <p>
                Verify your institutional credentials to gain access to
                accredited corporate
                <br />
                internships, Dean-approved academic credits, and top-tier
                mentorship programs.
              </p>
            </div>
          </div>

          <div className="ims-otp-reg-image-container">
            <img
              src={RegistrationOtp}
              alt="Otp-forget-main-image"
              className="ims-reg-otp-image"
            />
            <div className="ims-reg-otp-bottom-card-container">
              <div className="ims-reg-otp-bottom-card">
                <div className="Ims-reg-otp-bottom-right-card">
                  <img
                    src={WhiteShiled}
                    alt="white-shield"
                    className="ims-reg-otp-whiteshield"
                  />
                </div>
                <div className="ims-reg-otp-bottom-content">
                  <strong>
                    “Institutional email verification secures university credit
                    transfer and immediate eligibility for Fortune 500
                    placements.”
                  </strong>
                  <p>
                    Academic Partnerships Office{" "}
                    <span>— Verified University Gateway</span>
                  </p>
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>

        <div className="ims-otp-reg-right">
          <div className="ims-otp-reg-form-wrapper">
            <div className="ims-otp-reg-form-heading">
              <h2 className="ims-otp-reg-form-title">
                Enter Verification Code
              </h2>

              <p className="ims-otp-reg-form-description">
                We've sent a 6-digit code to your registered Email and phone
                number. The code will expire in
                <span style={{ color: "#132A56" }}>09:59</span> minutes.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="ims-reg-otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={
                      errors.verificationCode
                        ? "ims-otp-inputs ims-input-error"
                        : "ims-otp-inputs"
                    }
                  />
                ))}
              </div>

              {errors.verificationCode && (
                <div className="ims-error-reg-otp">
                  {errors.verificationCode}
                </div>
              )}

              <button type="submit" className="ims-otp-verify-and-continue">
                Verify and Continue
                <img
                  src={RightArrow}
                  alt="right-arrow"
                  style={{ width: "12px", height: "12px" }}
                />
              </button>
              <div className="ims-otp-reg-resend">
                <span className="ims-otp-reg-resend-span">
                  Didn't receive the code?
                </span>
                <button type="button">Resend</button>
                <span>(in00:55)</span>
              </div>
            </form>
            <div className="back-to-verification-container">
              <img
                src={BackToVerification}
                alt="Back-To-Verification"
                className="back-to-verification-image"
              />
              <span className="back-to-verify-span">
                Back to verification options
              </span>
            </div>

            <div className="ims-reg-otp-link-container">
              {" "}
              <Link to="/contact-support" className="ims-reg-otp-link">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
