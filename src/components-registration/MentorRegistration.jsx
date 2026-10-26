import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MentorRegistration.css";
import MentorRegistermainimage from "../assets/registration/mentor-register-illustartion-image.png";
import MentorRegisterWhiteShield from "../assets/registration/mentor-register-shield.png";
import MentorRegisterconnections from "../assets/registration/mentor-register-connections.png";
import MentorRegisterstars from "../assets/registration/mentor-register-stars.png";
import EyeOpenIcon from "../assets/registration/eye-open.png";
import EyeCloseIcon from "../assets/registration/eye-close.png";
import { Header } from "../reusable-components/Header";

export const MentorRegistration = () => {
  const initialValues = {
    fullName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    professionalTitle: "",
    skills: "",
    YearOfExperience: "",
    bio: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  };

  const navigate = useNavigate();

  const [selectRole, setSelectRole] = useState(
    location.state?.RoleSelector || "mentor",
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+61", country: "Australia" },
    { code: "+971", country: "UAE" },
    { code: "+43", country: "Austria" },
    { code: "+55", country: "Brazil" },
    { code: "+86", country: "China" },
  ];

  const experienceOptions = [
    "0-1 year",
    "1-3 years",
    "3-5 years",
    "5-8 years",
    "8-12 years",
    "12-15 years",
    "15+ years",
  ];

  const handleToggle = (type) => {
    if (type === "password") {
      setPasswordShow((prev) => !prev);
    } else if (type === "confirmPassword") {
      setConfirmPasswordShow((prev) => !prev);
    } else if (type === "termsAccepted") {
      setTermsAccepted((prev) => !prev);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "bio") {
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          bio: "Bio / About You is required",
        }));
      } else if (value.trim().length < 10) {
        setErrors((prev) => ({
          ...prev,
          bio: "Bio must contain at least 10 characters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          bio: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let newErrors = {};

    // fullName
    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Your full name is required*";
    }

    // email
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required*";
    } else if (
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(formValues.email.trim())
    ) {
      newErrors.email = "Enter a valid email*";
    }
    // phoneNumber
    if (!formValues.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required*";
    }
    // skills
    if (!formValues.skills.trim()) {
      newErrors.skills = "Skills / Expertise is required*";
    }

    // professional Title
    if (!formValues.professionalTitle.trim()) {
      newErrors.professionalTitle = "Professional title is required*";
    }

    // Year Of Experience
    if (!formValues.YearOfExperience) {
      newErrors.YearOfExperience = "Please select your experience*";
    }

    // Bio
    if (!formValues.bio.trim()) {
      newErrors.bio = "Bio / About You is required";
    } else if (formValues.bio.trim().length < 10) {
      newErrors.bio = "Bio must contain at least 10 characters";
    } else if (formValues.bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters";
    }

    // termsAccepted
    if (!termsAccepted) {
      newErrors.termsAccepted =
        "Please accept the Terms of Service and Privacy Policy*";
    }
    // password
    if (!formValues.password.trim()) {
      newErrors.password = "Password is required*";
    } else if (!passwordRegex.test(formValues.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).";
    }

    // confirmPassword
    if (!formValues.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required*";
    } else if (!formValues.password.trim()) {
      newErrors.confirmPassword = "Please enter password first*";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords do not match*";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("handleSubmit ran", formValues);
      setFormValues(initialValues);
      setTermsAccepted(false);
      navigate("/");
    }
  };

  return (
    <div className="ims-mentor-conatiner">
      <div className="ims-mentor-inner-container">
        <div className="ims-mentor-left-section">
          <Header />
          <div className="Ims-MentorRegister-middle-content">
            <div className="Ims-MentorRegister-main-content">
              <h2>Empower the next generation of talent.</h2>
              <p>
                Join a community of experts dedicated to guiding students
                through their career
                <br /> journey. Share yourwisdom, foster growth, and shape the
                industry's future.
              </p>
            </div>
          </div>

          <div className="Ims-MentorRegister-image-content">
            <img
              src={MentorRegistermainimage}
              alt="MentorRegister mainimage"
              className="Ims-MentorRegister-vector-stock"
            />

            <div className="ims-mentor-bottom-card-container">
              {/* Bottom card one */}
              <div className="Ims-MentorRegister-bottomcard-container">
                <div className="Ims-MentorRegister-bottomcard">
                  <div className="Ims-MentorRegister-bottomrightcard">
                    <img
                      src={MentorRegisterWhiteShield}
                      alt="Mentor-white-shield"
                      className="Ims-MentorRegister-whiteshield"
                    />
                  </div>
                  <div className="Ims-MentorRegister-bottomcontent">
                    <strong>Industry Impact</strong>
                    <p>
                      Bridge the gap between academic learning and real-world
                      excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom card two */}
              <div className="Ims-MentorRegister-bottomcardtwo-container">
                <div className="Ims-MentorRegister-bottomcard">
                  <div className="Ims-MentorRegister-bottomrightcard">
                    <img
                      src={MentorRegisterconnections}
                      alt="Mentor-connections"
                      style={{
                        color: "#FFFFFF",
                        width: "16px",
                        height: "9px",
                      }}
                    />
                  </div>
                  <div className="Ims-MentorRegister-bottomcontent">
                    <strong>Meaningful Connections</strong>
                    <p>
                      Build lasting professional relationships with ambitious
                      young minds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom card three */}
              <div className="Ims-MentorRegister-bottomcardthree-container">
                <div className="Ims-MentorRegister-bottomcard">
                  <div className="Ims-MentorRegister-bottomrightcard">
                    <img
                      src={MentorRegisterstars}
                      alt="Mentor-Stars-image"
                      style={{
                        color: "#FFFFFF",
                        width: "16px",
                        height: "15px",
                      }}
                    />
                  </div>
                  <div className="Ims-MentorRegister-bottomcontent">
                    <strong>Personal Growth</strong>
                    <p>
                      Enhance your leadership and communication skills through
                      mentorship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ims-mentor-right-section">
          <div className="ims-mentor-header-conatiner">
            <header className="ims-mentor-header">
              <h1>Create your account</h1>
              <p>Complete your profile to start connecting with students.</p>
            </header>

           
          </div>
          <form onSubmit={handleSubmit} className="ims-mentor-reg-form">
            <div className="ims-mentor-form-row-container">
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="fullName">
                    Full Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formValues.fullName}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullName && (
                  <p className="ims-mentor-error-message">{errors.fullName}</p>
                )}
              </div>

              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="email">
                    Email Address<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="ims-mentor-error-message">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="ims-mentor-form-row-container">
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="phoneNumber">
                    Phone Number<span>*</span>
                  </label>
                  <div className="ims-mentor-phoneNumber-conatiner">
                    <select
                      name="countryCode"
                      id="countryCode"
                      value={formValues.countryCode}
                      onChange={handleChange}
                      className="ims-mentor-selector"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      inputMode="numeric"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="tel"
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your number"
                      value={formValues.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {errors.phoneNumber && (
                  <p className="ims-mentor-error-message">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="professionalTitle">
                    Professional Title<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="professionalTitle"
                    name="professionalTitle"
                    value={formValues.professionalTitle}
                    placeholder="e.g., Senior Software Engineer"
                    onChange={handleChange}
                  />
                </div>
                {errors.professionalTitle && (
                  <p className="ims-mentor-error-message">
                    {errors.professionalTitle}
                  </p>
                )}
              </div>
            </div>
            <div className="ims-mentor-form-row-container">
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="skills">
                    Skills / Expertise<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    placeholder="e.g., UI/UX, React, Mentoring"
                    value={formValues.skills}
                    onChange={handleChange}
                  />
                  {!errors.skills && (
                    <p>Separate multiple skills with commas</p>
                  )}
                </div>{" "}
                {errors.skills && (
                  <p className="ims-mentor-skill-error-message">
                    {errors.skills}
                  </p>
                )}
              </div>
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="YearOfExperience">
                    Year of Experience<span>*</span>
                  </label>

                  <div className="ims-mentor-Experience">
                    <select
                      name="YearOfExperience"
                      id="YearOfExperience"
                      value={formValues.YearOfExperience}
                      onChange={handleChange}
                      className="ims-mentor-selector"
                    >
                      <option value="">Select the experience level</option>

                      {experienceOptions.map((experience) => (
                        <option key={experience} value={experience}>
                          {experience}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.YearOfExperience && (
                  <p className="ims-mentor-skill-error-message">
                    {errors.YearOfExperience}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-mentor-input-outer-container">
              <div className="mentor-input-conatiner">
                <div className="ims-mentor-label-and-para-container">
                  <label htmlFor="bio">
                    Bio / About You<span>*</span>
                  </label>
                  <p className="ims-mentor-character-count">
                    {formValues.bio.length}/500
                  </p>
                </div>

                <textarea
                  name="bio"
                  id="bio"
                  value={formValues.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                />
              </div>
              {errors.bio && (
                <p className="ims-mentor-error-message">{errors.bio}</p>
              )}
            </div>

            <div className="ims-mentor-form-row-container">
              <div className="ims-mentor-input-outer-container">
                {" "}
                <div className="mentor-input-conatiner">
                  <label htmlFor="password">
                    Password<span>*</span>
                  </label>
                  <div className="ims-mentor-input-inner-container">
                    <input
                      type={passwordShow ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={formValues.password}
                      onChange={handleChange}
                      className="ims-mentor-password"
                    />
                    <span
                      onClick={() => {
                        handleToggle("password");
                      }}
                    >
                      <img
                        src={passwordShow ? EyeOpenIcon : EyeCloseIcon}
                        className={
                          passwordShow
                            ? "ims-mentor-password-eye-open"
                            : "ims-mentor-password-eye-close"
                        }
                        alt="passwordIcon"
                      />
                    </span>
                  </div>
                </div>
                {errors.password && (
                  <p className="ims-mentor-error-message">{errors.password}</p>
                )}
              </div>
              <div className="ims-mentor-input-outer-container">
                <div className="mentor-input-conatiner">
                  <label htmlFor="confirmPassword">
                    Confirm Password<span>*</span>
                  </label>

                  <div className="ims-mentor-input-inner-container">
                    <input
                      type={confirmPasswordShow ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                      className="ims-mentor-confirm-password"
                    />

                    <span onClick={() => handleToggle("confirmPassword")}>
                      <img
                        src={confirmPasswordShow ? EyeOpenIcon : EyeCloseIcon}
                        className={
                          confirmPasswordShow
                            ? "ims-mentor-password-eye-open"
                            : "ims-mentor-password-eye-close"
                        }
                        alt={
                          confirmPasswordShow
                            ? "Hide password"
                            : "Show password"
                        }
                      />
                    </span>
                  </div>
                </div>

                {errors.confirmPassword && (
                  <p className="ims-mentor-error-message">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-mentor-checkbox-container">
              <div className="ims-mentor-checkbox-inner-container">
                <input
                  name="checkbox"
                  type="checkbox"
                  id="termsAccepted"
                  checked={termsAccepted}
                  onChange={() => {
                    handleToggle("termsAccepted");
                  }}
                  className="ims-mentor-checkbox"
                />{" "}
                <label
                  htmlFor="termsAccepted"
                  className="ims-mentor-checkbox-label"
                >
                  I agree to the{" "}
                  <span className="ims-mentor-checkbox-span">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="ims-mentor-checkbox-span">
                    Privacy Policy
                  </span>
                </label>
              </div>
              <div className="ims-mentor-checkbox-error-conatiner">
                {errors.termsAccepted && (
                  <p className="ims-mentor-error-message">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="ims-mentor-submit-btn">
              Create Account
            </button>
          </form>

          <div className="ims-mentor-divider-container">
            <hr className="ims-mentor-divider" />
            <span className="ims-mentor-or">OR</span>
            <hr className="ims-mentor-divider" />
          </div>

          <div className="ims-mentor-signin-container">
            <p className="ims-mentor-signin-text">
              Already have an account?{" "}
              <Link to="/components-login/login" className="ims-mentor-signin-link">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
