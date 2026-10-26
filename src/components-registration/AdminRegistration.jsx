import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components-Registration/AdminRegistration.css";
import { Header } from "../reusable-components/Header";
import AdminIcon from "../assets/Registration/admin-icon.png";
import ShowPassword from "../assets/Registration/eye-open.png";
import HidePassword from "../assets/Registration/eye-close.png";
import DropdownArrow from "../assets/Registration/drop-down-arrow.png";
import AdminIllustartion from "../assets/registration/admin-vector-illustration.png";
import WhiteShield from "../assets/registration/shield.png";

export const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organisation: "",
    designation: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.organisation.trim()) {
      newErrors.organisation = "Organisation / Institution Name is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Job Title / Designation is required";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Use 8+ characters with uppercase, lowercase, number and special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "Please accept the Terms & Privacy Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(formData);
      navigate("/");
    }
  };

  return (
    <div className="ims-admin-container">
      <div className="ims-admin-inner-container">
        <div className="ims-admin-left-section">
          <div className="ims-admin-left-container">
            <Header />
            <h1 className="ims-admin-header">
              Regain access to your professional future.
            </h1>
            <p className="ims-admin-sub-header">
              Join thousands of companies and educational institutions managing
              the next generation of global talent through our secure,
              integrated ecosystem.
            </p>
          </div>
          <div className="ims-admin-image-container">
            <img
              src={AdminIllustartion}
              alt="admin-vector-illustration"
              className="ims-admin-illustartion"
            />
          </div>
          <div className="ims-admin-bottom-cards-container">
            <div className="ims-admin-bottom-card">
              <div className="ims-admin-bottom-card-image-container">
                {" "}
                <img
                  src={WhiteShield}
                  alt="shield-icon"
                  className="ims-admin-sheild-icon"
                />
              </div>
              <div className="ims-mentor-card-info-container">
                <h1 className="ims-admin-card-header">Role-based access</h1>
                <p className="ims-admin-card-description">
                  Secure and personalized experience for every user.
                </p>
              </div>
            </div>
            <div className="ims-admin-bottom-card">
              <div className="ims-admin-bottom-card-image-container">
                {" "}
                <img
                  src={WhiteShield}
                  alt="shield-icon"
                  className="ims-admin-sheild-icon"
                />
              </div>

              <div className="ims-mentor-card-info-container">
                <h1 className="ims-admin-card-header">Trusted & Secure</h1>
                <p className="ims-admin-card-description">
                  Your data is protected with industry-standard security.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ims-admin-right-section">
          <div className="ims-admin-registration-form-container">
            <h2 className="ims-admin-registration-form-title">
              Admin Registration
            </h2>

            <p className="ims-admin-registration-form-description">
              Fill in the details below to create your account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="ims-admin-registration-form-group">
                <label className="ims-admin-registration-form-label">
                  REGISTERING AS{" "}
                  <span className="ims-admin-registration-required">*</span>
                </label>

                <div className="ims-admin-registration-role-card">
                  <img src={AdminIcon} alt="Admin" />
                  <span>Admin</span>
                </div>
              </div>

              <div className="ims-admin-registration-form-row">
                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Full Name{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`ims-admin-registration-form-input ${errors.fullName ? "ims-admin-registration-error-border" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="ims-admin-registration-error">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Email Address{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`ims-admin-registration-form-input ${errors.email ? "ims-admin-registration-error-border" : ""}`}
                  />
                  {errors.email && (
                    <p className="ims-admin-registration-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="ims-admin-registration-form-row">
                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Phone Number{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <div className="ims-admin-registration-phone-input">
                    <span className="ims-admin-registration-country-code">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={`ims-admin-registration-form-input ${errors.phone ? "ims-admin-registration-error-border" : ""}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="ims-admin-registration-error">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Organisation / Institution Name{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Enter organisation name"
                    className={`ims-admin-registration-form-input ${errors.organisation ? "ims-admin-registration-error-border" : ""}`}
                  />
                  {errors.organisation && (
                    <p className="ims-admin-registration-error">
                      {errors.organisation}
                    </p>
                  )}
                </div>
              </div>

              <div className="ims-admin-registration-form-row">
                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Job Title / Designation{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter your designation"
                    className={`ims-admin-registration-form-input ${errors.designation ? "ims-admin-registration-error-border" : ""}`}
                  />
                  {errors.designation && (
                    <p className="ims-admin-registration-error">
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Country{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <div className="ims-admin-registration-select-wrapper">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`ims-admin-registration-form-select ${errors.country ? "ims-admin-registration-error-border" : ""}`}
                    >
                      <option value="">Select your country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>

                    <img
                      src={DropdownArrow}
                      alt="DropdownArrow"
                      className="ims-admin-registration-dropdown-arrow"
                    />
                  </div>
                  {errors.country && (
                    <p className="ims-admin-registration-error">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="ims-admin-registration-form-row">
                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Password{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <div className="ims-admin-registration-password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className={`ims-admin-registration-form-input ${errors.password ? "ims-admin-registration-error-border" : ""}`}
                    />
                    <img
                      src={showPassword ? HidePassword : ShowPassword}
                      className="ims-admin-registration-password-icon"
                      alt="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {errors.password && (
                    <p className="ims-admin-registration-error">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="ims-admin-registration-form-group">
                  <label className="ims-admin-registration-form-label">
                    Confirm Password{" "}
                    <span className="ims-admin-registration-required">*</span>
                  </label>
                  <div className="ims-admin-registration-password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`ims-admin-registration-form-input ${errors.confirmPassword ? "ims-admin-registration-error-border" : ""}`}
                    />
                    <img
                      src={showConfirmPassword ? HidePassword : ShowPassword}
                      className="ims-admin-registration-password-icon"
                      alt="Toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="ims-admin-registration-error">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="ims-admin-registration-terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="ims-admin-registration-terms-checkbox"
                />
                <p className="ims-admin-registration-terms-text">
                  I agree to the{" "}
                  <span className="ims-admin-registration-terms-link">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="ims-admin-registration-terms-link">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {errors.terms && (
                <p className="ims-admin-registration-error">{errors.terms}</p>
              )}

              <button
                type="submit"
                className="ims-admin-registration-create-button"
              >
                Create Account
              </button>

              <div className="ims-admin-registration-signin">
                <p className="ims-admin-registration-signin-text">
                  Already have an account?{" "}
                  <Link to="/components-login/login" className="ims-admin-registration-signin-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
