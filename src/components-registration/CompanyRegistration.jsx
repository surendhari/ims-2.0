import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompanyRegistration.css";
import Illustration from "../assets/registration/Illustration-Image.png";
import Buttomframeone from "../assets/registration/Hiring-icon.png";
import verifiedIcon from "../assets/registration/Verified-icon.png";
import formdropdown from "../assets/registration/formdropdown.png";
import eye from "../assets/registration/eye.png";
import eyeclose from "../assets/registration/eyeclose.png";
import { Header } from "../reusable-components/Header";
import RegistrationVerificationPopup from "../reusable-components/RegistrationVerificationPopup";

export const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [verificationValue, setVerificationValue] = useState("");

  const [formData, setFormData] = useState({
    registeringAs: "Company",
    companyName: "",
    companyWebsite: "",
    workEmail: "",
    phoneNumber: "",
    countryCode: "+91",
    industry: "",
    companySize: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (location.state?.verified) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const urlRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

  const handleVerifyEmail = () => {
    if (formData.isEmailVerified) return;

    if (!formData.workEmail.trim()) {
      setErrors((prev) => ({
        ...prev,
        workEmail: "Please enter your work email",
      }));
      return;
    }

    if (!emailRegex.test(formData.workEmail.trim())) {
      setErrors((prev) => ({
        ...prev,
        workEmail: "Please enter a valid work email address",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      workEmail: "",
    }));

    setVerificationType("email");
    setVerificationValue(formData.workEmail.trim());
    setShowVerificationPopup(true);
  };

  const handleVerifyPhone = () => {
    if (formData.isPhoneVerified) return;

    const cleanedPhone = formData.phoneNumber.trim().replace(/[\s-]/g, "");

    if (!formData.phoneNumber.trim()) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Please enter your phone number",
      }));
      return;
    }

    if (!/^\d{10}$/.test(cleanedPhone)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Please enter a valid 10-digit phone number",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      phoneNumber: "",
    }));

    setVerificationType("phone");
    setVerificationValue(cleanedPhone);
    setShowVerificationPopup(true);
  };

  // OTP VERIFICATION SUCCESS
  const handleVerifySuccess = () => {
    setFormData((prev) => ({
      ...prev,
      ...(verificationType === "email" && {
        isEmailVerified: true,
      }),
      ...(verificationType === "phone" && {
        isPhoneVerified: true,
      }),
    }));

    setShowVerificationPopup(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Please enter your company name";
    }

    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = "Please enter your company website";
    } else if (!urlRegex.test(formData.companyWebsite.trim())) {
      newErrors.companyWebsite = "Please enter a valid website URL";
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Please enter your work email";
    } else if (!emailRegex.test(formData.workEmail.trim())) {
      newErrors.workEmail = "Please enter a valid work email address";
    } else if (!formData.isEmailVerified) {
      newErrors.workEmail = "Please verify your work email";
    }

    const cleanedPhone = formData.phoneNumber.trim().replace(/[\s-]/g, "");

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(cleanedPhone)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    } else if (!formData.isPhoneVerified) {
      newErrors.phoneNumber = "Please verify your phone number";
    }

    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }

    if (!formData.companySize) {
      newErrors.companySize = "Please select company size";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Please enter your registration number";
    }

    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSymbol = /[^A-Za-z0-9]/.test(formData.password);

    if (!formData.password) {
      newErrors.password = "Please enter a password";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!hasUpperCase) {
      newErrors.password =
        "Password must contain at least one uppercase letter (A-Z)";
    } else if (!hasLowerCase) {
      newErrors.password =
        "Password must contain at least one lowercase letter (a-z)";
    } else if (!hasNumber) {
      newErrors.password = "Password must contain at least one number (0-9)";
    } else if (!hasSymbol) {
      newErrors.password =
        "Password must contain at least one symbol (e.g. !@#$%^&*)";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms =
        "You must agree to the Terms of Service and Privacy Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Company Registration Submitted", {
      ...formData,
      password: "[hidden]",
      confirmPassword: "[hidden]",
    });
  };

  return (
    <div className="ims-company-registration-page">
      <div className="ims-company-registration-container">
        <div className="ims-company-registration-left">
          <Header />

          <div className="ims-company-registration-content">
            Partner with InternMS to scale your team.
          </div>

          <div className="ims-company-registration-description">
            Connect with over 100,000+ top-tier students and graduates ready to
            <br />
            bring innovation to your company.
          </div>

          <div className="ims-company-registration-illustration">
            <img src={Illustration} alt="Illustration" />
          </div>

          <div className="ims-company-registration-footer">
            <div className="ims-company-registration-footer-content">
              <div className="ims-company-registration-footer-icon">
                <img src={Buttomframeone} alt="Button Frame One" />
              </div>

              <div className="ims-company-registration-footer-content-text">
                <div className="ims-company-registration-footer-content-title">
                  Effortless Hiring
                </div>

                <div className="ims-company-registration-footer-content-subtitle">
                  Post jobs and manage applicants in one centralized dashboard.
                </div>
              </div>
            </div>

            <div className="ims-company-registration-footer-content">
              <div className="ims-company-registration-footer-icon">
                <img src={verifiedIcon} alt="Button Frame Two" />
              </div>

              <div className="ims-company-registration-footer-content-text">
                <div className="ims-company-registration-footer-content-title">
                  Verified Talent
                </div>

                <div className="ims-company-registration-footer-content-subtitle">
                  Every student profile is verified for education and skill
                  credentials.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ims-company-registration-right">
          <div className="ims-company-backbtn-align">
            <div className="ims-company-registration-form-header">
              <div className="ims-company-registration-form-title">
                Create your account
              </div>

              <div className="ims-company-registration-form-subtitle">
                Fill in the details to register your organization and start
                hiring.
              </div>
            </div>

            <button
              type="button"
              className="ims-company-backbtn"
              onClick={() => navigate("/welcome")}
            >
              Back to Selection
            </button>
          </div>
          <div className="ims-company-registration-form">
            <form
              className="ims-company-registration-form-body"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="ims-company-registration-form-group">
                <label
                  htmlFor="ims-company-registration-registering-as"
                  className="ims-company-registration-form-label"
                >
                  Registering As <span className="ims-form-required">*</span>
                </label>

                <div className="ims-company-registration-form-select-container">
                  <select
                    id="ims-company-registration-registering-as"
                    name="registeringAs"
                    className="ims-company-registration-form-drop-down"
                    value={formData.registeringAs}
                    disabled
                  >
                    <option value="Company">Company</option>
                  </select>
                </div>

                <span className="ims-company-registration-error"></span>
              </div>

              <div className="ims-company-registration-form-row">
                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-company-name"
                    className="ims-company-registration-form-label"
                  >
                    Company Name<span className="ims-form-required">*</span>
                  </label>

                  <input
                    type="text"
                    id="ims-company-registration-company-name"
                    name="companyName"
                    className={`ims-company-registration-form-input ${
                      errors.companyName ? "ims-input-error" : ""
                    }`}
                    placeholder="e.g. Acme Corp"
                    value={formData.companyName}
                    onChange={handleChange}
                  />

                  <span className="ims-company-registration-error">
                    {errors.companyName}
                  </span>
                </div>

                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-company-website"
                    className="ims-company-registration-form-label"
                  >
                    Company Website <span className="ims-form-required">*</span>
                  </label>

                  <input
                    type="text"
                    id="ims-company-registration-company-website"
                    name="companyWebsite"
                    className={`ims-company-registration-form-input ${
                      errors.companyWebsite ? "ims-input-error" : ""
                    }`}
                    placeholder="https://"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                  />

                  <span className="ims-company-registration-error">
                    {errors.companyWebsite}
                  </span>
                </div>
              </div>

              <div className="ims-company-registration-form-row">
                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-email"
                    className="ims-company-registration-form-label"
                  >
                    Work Email<span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-verify-container">
                    <input
                      type="email"
                      id="ims-company-registration-email"
                      name="workEmail"
                      autoComplete="email"
                      className={`ims-company-registration-form-input ims-company-registration-input-with-verify ${
                        errors.workEmail ? "ims-input-error" : ""
                      }`}
                      placeholder="name@company.com"
                      value={formData.workEmail}
                      onChange={handleChange}
                    />

                    {formData.workEmail.trim() && (
                      <button
                        type="button"
                        className={`ims-company-registration-verify-btn ${
                          formData.isEmailVerified ? "ims-verified" : ""
                        }`}
                        onClick={handleVerifyEmail}
                        disabled={formData.isEmailVerified}
                      >
                        {formData.isEmailVerified ? "Verified" : "Verify"}
                      </button>
                    )}
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.workEmail}
                  </span>
                </div>

                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-phone"
                    className="ims-company-registration-form-label"
                  >
                    Phone Number<span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-form-phoneNumber">
                    <input
                      type="text"
                      id="ims-company-registration-country-code"
                      name="countryCode"
                      aria-label="Country Code"
                      className="ims-company-registration-form-input-phoneNumber"
                      value={formData.countryCode}
                      readOnly
                    />

                    <div className="ims-company-registration-verify-container ims-phone-number-field-container">
                      <input
                        type="tel"
                        id="ims-company-registration-phone"
                        name="phoneNumber"
                        maxLength={10}
                        minLength={10}
                        autoComplete="tel"
                        className={`ims-company-registration-form-input ims-phone-number-field ims-company-registration-input-with-verify ${
                          errors.phoneNumber ? "ims-input-error" : ""
                        }`}
                        placeholder="Enter your number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />

                      {formData.phoneNumber.trim() && (
                        <button
                          type="button"
                          className={`ims-company-registration-verify-btn ${
                            formData.isPhoneVerified ? "ims-verified" : ""
                          }`}
                          onClick={handleVerifyPhone}
                          disabled={formData.isPhoneVerified}
                        >
                          {formData.isPhoneVerified ? "Verified" : "Verify"}
                        </button>
                      )}
                    </div>
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="ims-company-registration-form-row">
                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-industry"
                    className="ims-company-registration-form-label"
                  >
                    Industry <span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-form-select-container">
                    <select
                      id="ims-company-registration-industry"
                      name="industry"
                      className={`ims-company-registration-form-drop-down ${
                        errors.industry ? "ims-input-error" : ""
                      }`}
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select industry</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Finance & Banking">
                        Finance & Banking
                      </option>
                    </select>

                    <img
                      src={formdropdown}
                      alt="Drop Down"
                      className="ims-company-registration-form-select-arrow ims-company-registration-dropDown"
                    />
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.industry}
                  </span>
                </div>

                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-company-size"
                    className="ims-company-registration-form-label"
                  >
                    Company Size <span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-form-select-container">
                    <select
                      id="ims-company-registration-company-size"
                      name="companySize"
                      className={`ims-company-registration-form-drop-down ${
                        errors.companySize ? "ims-input-error" : ""
                      }`}
                      value={formData.companySize}
                      onChange={handleChange}
                    >
                      <option value="">Select size</option>
                      <option value="1-50 Employees">1-50 Employees</option>
                      <option value="50-200 Employees">50-200 Employees</option>
                    </select>

                    <img
                      src={formdropdown}
                      alt="Drop Down for select"
                      className="ims-company-registration-form-select-arrow ims-company-registration-dropDown"
                    />
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.companySize}
                  </span>
                </div>
              </div>
              <div className="ims-company-registration-form-group">
                <label
                  htmlFor="ims-company-registration-registration-number"
                  className="ims-company-registration-form-label"
                >
                  Registration Number{" "}
                  <span className="ims-form-required">*</span>
                </label>

                <input
                  type="text"
                  id="ims-company-registration-registration-number"
                  name="registrationNumber"
                  className={`ims-company-registration-form-input ${
                    errors.registrationNumber ? "ims-input-error" : ""
                  }`}
                  placeholder="Business ID or Tax ID"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />

                <span className="ims-company-registration-error">
                  {errors.registrationNumber}
                </span>
              </div>

              <div className="ims-company-registration-form-row">
                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-password"
                    className="ims-company-registration-form-label"
                  >
                    Password <span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="ims-company-registration-password"
                      name="password"
                      autoComplete="new-password"
                      className={`ims-company-registration-form-input ${
                        errors.password ? "ims-input-error" : ""
                      }`}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="ims-company-registration-password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label="Toggle password visibility"
                    >
                      <img src={showPassword ? eye : eyeclose} alt="Eye Icon" />
                    </button>
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.password}
                  </span>
                </div>

                <div className="ims-company-registration-form-group">
                  <label
                    htmlFor="ims-company-registration-confirm-password"
                    className="ims-company-registration-form-label"
                  >
                    Confirm Password{" "}
                    <span className="ims-form-required">*</span>
                  </label>

                  <div className="ims-company-registration-password-container">
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="ims-company-registration-confirm-password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      className={`ims-company-registration-form-input ${
                        errors.confirmPassword ? "ims-input-error" : ""
                      }`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="ims-company-registration-password-toggle"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      aria-label="Toggle confirm password visibility"
                    >
                      <img src={showConfirm ? eye : eyeclose} alt="Eye Icon" />
                    </button>
                  </div>

                  <span className="ims-company-registration-error">
                    {errors.confirmPassword}
                  </span>
                </div>
              </div>

              <div className="ims-company-registration-terms-container">
                <div className="ims-company-registration-terms-group">
                  <input
                    type="checkbox"
                    id="ims-company-registration-terms"
                    name="agreedToTerms"
                    className="ims-company-registration-checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                  />

                  <label
                    htmlFor="ims-company-registration-terms"
                    className="ims-company-registration-terms-label"
                  >
                    I agree to the{" "}
                    <a href="#terms" className="ims-terms-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="ims-terms-link">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <span className="ims-company-registration-error">
                  {errors.agreedToTerms}
                </span>
              </div>

              <button
                type="submit"
                className="ims-company-registration-form-button"
              >
                Create Account
              </button>

              <div className="ims-company-registration-divider">
                <span className="ims-company-registration-divider-line" />
                <span className="ims-company-registration-divider-text">
                  OR
                </span>
                <span className="ims-company-registration-divider-line" />
              </div>

              <div className="ims-company-registration-signin">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="ims-company-registration-signin-link"
                >
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showVerificationPopup && (
        <RegistrationVerificationPopup
          type={verificationType}
          value={verificationValue}
          onClose={() => setShowVerificationPopup(false)}
          onVerified={handleVerifySuccess}
        />
      )}
    </div>
  );
};
