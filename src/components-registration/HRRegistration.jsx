import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HRRegistration.css";
import HRIllustration from "../assets/Registration/HRRegistrationIllustration.png";
import RegisterUsers from "../assets/Registration/RegisterUsers.png";
import CompanyIcon from "../assets/Registration/Company-icon.png";
import ShowPassword from "../assets/Registration/ShowPassword.png";
import HidePassword from "../assets/Registration/HidePassword.png";
import DropdownArrow from "../assets/Registration/DropdownArrow.png";
import { Header } from "../reusable-components/Header";

export const HrRegistration = () => {
  const [formData, setFormData] = useState({
    registeringAs: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    company: "",
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

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.registeringAs) {
      newErrors.registeringAs = "Please select a role";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Work Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company Name is required";
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
    <div className="ims-hr-registration-page">
      <div className="ims-hr-registration-left-section">
        <Header />

        <div className="ims-hr-registration-heading-section">
          <h4 className="ims-hr-registration-heading">
            Empower your team with
            <br />
            top-tier talent.
          </h4>

          <p className="ims-hr-registration-heading-text">
            Streamline your recruitment process, manage internships with
            ease,and <br />
            connect with the next generation of industry leaders.
          </p>
        </div>

        <div className="ims-hr-registration-illustration">
          <img
            src={HRIllustration}
            className="ims-hr-registration-illustration-image"
            alt="internshipImage"
          />
        </div>

        <div className="ims-hr-registration-talent-card">
          <div className="ims-hr-registration-talent-header">
            <img
              src={RegisterUsers}
              className="ims-hr-registration-talent-icon"
              alt="Users-icon"
            />

            <div className="ims-hr-registration-talent-text">
              <h3 className="ims-hr-registration-talent-heading">
                Unified Talent Dashboard
              </h3>
              <p className="ims-hr-registration-talent-description">
                Monitor all applications in real-time.
              </p>
            </div>
          </div>

          <div className="ims-hr-registration-progress-bar">
            <div className="ims-hr-registration-progress-fill"></div>
          </div>

          <div className="ims-hr-registration-talent-footer">
            <span>75% Efficiency Boost</span>
            <span>120+ Placements</span>
          </div>
        </div>

        <div className="ims-hr-registration-stats">
          <div className="ims-hr-registration-stat-item">
            <h3 className="ims-hr-registration-stat-value">500+</h3>
            <p className="ims-hr-registration-stat-label">COMPANIES</p>
          </div>

          <div className="ims-hr-registration-stat-item">
            <h3 className="ims-hr-registration-stat-value">10K+</h3>
            <p className="ims-hr-registration-stat-label">STUDENTS</p>
          </div>
        </div>
      </div>

      <div className="ims-hr-registration-right-section">
        <div className="ims-hr-registration-form-container">
          <h2 className="ims-hr-registration-form-title">
            Create your account
          </h2>

          <p className="ims-hr-registration-form-description">
            Join our ecosystem of professional employers.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="ims-hr-registration-form-group">
              <label className="ims-hr-registration-form-label">
                REGISTERING AS{" "}
                <span className="ims-hr-registration-required">*</span>
              </label>

              <div className="ims-hr-registration-select-wrapper">
                <select
                  name="registeringAs"
                  value={formData.registeringAs}
                  onChange={handleChange}
                  className={`ims-hr-registration-form-select ${errors.registeringAs ? "ims-hr-registration-error-border" : ""}`}
                >
                  <option value="">Select Role</option>
                  <option value="Intern">Intern</option>
                  <option value="Mentor">Mentor</option>
                  <option value="HR">HR</option>
                  <option value="Company">Company</option>
                </select>

                <img
                  src={DropdownArrow}
                  alt="DropdownArrow"
                  className="ims-hr-registration-dropdown-arrow-role"
                />
              </div>
              {errors.registeringAs && (
                <p className="ims-hr-registration-error">
                  {errors.registeringAs}
                </p>
              )}
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Full Name{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`ims-hr-registration-form-input ${errors.fullName ? "ims-hr-registration-error-border" : ""}`}
                />
                {errors.fullName && (
                  <p className="ims-hr-registration-error">
                    {errors.fullName || ""}
                  </p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Work Email Address{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@company.com"
                  className={`ims-hr-registration-form-input ${errors.email ? "ims-hr-registration-error-border" : ""}`}
                />
                {errors.email && (
                  <p className="ims-hr-registration-error">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Phone Number{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-phone-input">
                  <span className="ims-hr-registration-country-code">+91</span>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className={`ims-hr-registration-form-input ${errors.phone ? "ims-hr-registration-error-border" : ""}`}
                  />
                </div>
                {errors.phone && (
                  <p className="ims-hr-registration-error">{errors.phone}</p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Department{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-select-wrapper">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`ims-hr-registration-form-select ${errors.department ? "ims-hr-registration-error-border" : ""}`}
                  >
                    <option value=""> Select department </option>
                    <option value="Intern">Intern</option>
                    <option value="Mentor">Mentor</option>
                    <option value="HR">HR</option>
                    <option value="Company">Company</option>
                  </select>

                  <img
                    src={DropdownArrow}
                    alt="DropdownArrow"
                    className="ims-hr-registration-dropdown-arrow"
                  />
                </div>
                {errors.department && (
                  <p className="ims-hr-registration-error">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-form-group">
              <label className="ims-hr-registration-form-label">
                Company Name{" "}
                <span className="ims-hr-registration-required">*</span>
              </label>
              <div className="ims-hr-registration-company-input">
                <img
                  src={CompanyIcon}
                  className="ims-hr-registration-company-icon"
                  alt="Company-icon"
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="InternHub Inc."
                  className={`ims-hr-registration-form-input ${errors.company ? "ims-hr-registration-error-border" : ""}`}
                />
              </div>
              {errors.company && (
                <p className="ims-hr-registration-error">{errors.company}</p>
              )}
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Password{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`ims-hr-registration-form-input ${errors.password ? "ims-hr-registration-error-border" : ""}`}
                  />

                  <img
                    src={showPassword ? HidePassword : ShowPassword}
                    className="ims-hr-registration-password-icon"
                    alt="Eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {errors.password && (
                  <p className="ims-hr-registration-error">{errors.password}</p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Confirm Password{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`ims-hr-registration-form-input ${errors.confirmPassword ? "ims-hr-registration-error-border" : ""}`}
                  />

                  <img
                    src={showConfirmPassword ? HidePassword : ShowPassword}
                    className="ims-hr-registration-password-icon"
                    alt="Eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="ims-hr-registration-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-terms">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="ims-hr-registration-terms-checkbox"
              />

              <p className="ims-hr-registration-terms-text">
                I agree to the{" "}
                <span className="ims-hr-registration-terms-link">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="ims-hr-registration-terms-link">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.terms && (
              <p className="ims-hr-registration-error">{errors.terms}</p>
            )}
            <button type="submit" className="ims-hr-registration-create-button">
              Create Account
            </button>

            <div className="ims-hr-registration-divider">
              <hr className="ims-hr-registration-divider-line" />

              <p className="ims-hr-registration-divider-text">OR</p>

              <hr className="ims-hr-registration-divider-line" />
            </div>

            <div className="ims-hr-registration-signin">
              <p className="ims-hr-registration-signin-text">
                Already have an account?{" "}
                <Link to="/components-login/login"
                 className="ims-hr-registration-signin-link">
                  {" "}
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
