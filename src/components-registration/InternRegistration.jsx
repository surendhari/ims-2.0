import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InternRegistration.css";
import illustration from "../assets/registration/Intern-Illustration.png";
import verifiedIcon from "../assets/registration/Verified.png";
import trackingIcon from "../assets/registration/Tracking.png";
import eye from "../assets/registration/eye.png";
import eyeclose from "../assets/registration/eyeclose.png";
import { Header } from "../reusable-components/Header";
import RegistrationVerificationPopup from "../reusable-components/RegistrationVerificationPopup";

export const InternRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registeringAs: "Intern",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    college: "",
    fieldOfStudy: "",
    graduationYear: "",
    resume: null,
    password: "",
    confirmPassword: "",
    agreed: false,
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [verificationValue, setVerificationValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fieldsOfStudy = [
    "Computer Science",
    "Information Technology",
    "Data Science",
    "Design",
    "Business Administration",
    "Mechanical Engineering",
  ];

  const graduationYears = [
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];

  const handleVerify = (field) => {
    setVerificationType(field);

    setVerificationValue(
      field === "email"
        ? formData.email.trim()
        : formData.phone.replace(/\D/g, ""),
    );

    setShowVerificationPopup(true);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Intern Registration Submitted", formData);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    } else if (!formData.isEmailVerified) {
      newErrors.email = "Please verify your email";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    } else if (!formData.isPhoneVerified) {
      newErrors.phone = "Please verify your phone number";
    }

    const dobMatch = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(
      formData.dob,
    );

    if (!dobMatch) {
      newErrors.dob = "Please enter a valid DOB (mm/dd/yyyy)";
    } else {
      const [month, day, year] = formData.dob.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date > new Date()
      ) {
        newErrors.dob = "Please enter a valid date of birth";
      }
    }

    if (!formData.college.trim()) {
      newErrors.college = "Please enter your college name";
    }

    if (!formData.fieldOfStudy) {
      newErrors.fieldOfStudy = "Please select your field of study";
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = "Please select graduation year";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[^A-Za-z0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and symbol";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreed) {
      newErrors.agreed = "Please agree to Terms and Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="ims-reg-page">
      <section className="ims-reg-left">
        <Header />

        <div className="ims-reg-intro">
          <h1 className="ims-reg-title">
            Your gateway to professional
            <br className="ims-reg-break" />
            excellence starts here.
          </h1>

          <p className="ims-reg-lead">
            Join thousands of ambitious students securing world-class
            internships at
            <br className="ims-reg-break" />
            leading tech companies and creative agencies.
          </p>
        </div>

        <div className="ims-reg-art-wrap">
          <img
            className="ims-reg-art"
            src={illustration}
            alt="Intern with a laptop"
          />
        </div>

        <div className="ims-reg-features">
          <div className="ims-reg-feature">
            <img className="ims-reg-feature-icon" src={verifiedIcon} alt="" />

            <div className="ims-reg-feature-copy">
              <strong className="ims-reg-feature-title">
                Verified Employers
              </strong>

              <span className="ims-reg-feature-text">
                Connect with pre-vetted top-tier companies worldwide.
              </span>
            </div>
          </div>

          <div className="ims-reg-feature">
            <img className="ims-reg-feature-icon" src={trackingIcon} alt="" />

            <div className="ims-reg-feature-copy">
              <strong className="ims-reg-feature-title">Smart Tracking</strong>

              <span className="ims-reg-feature-text">
                Manage all your applications in one organized dashboard.
              </span>
            </div>
          </div>
        </div>
      </section>

      <form className="ims-reg-form" onSubmit={handleSubmit}>
        <div className="ims-reg-head">
          <div className="ims-reg-backbtnalign">
            <div>
              <h2 className="ims-reg-heading">Create your account</h2>
              <p className="ims-reg-sub">
                Fill in the details below to create your professional account
              </p>
            </div>

            <button
              type="button"
              className="ims-company-backbtn"
              onClick={() => navigate("/welcome")}
            >
              Back to Selection
            </button>
          </div>
        </div>

        <div className="ims-reg-role">
          <label className="ims-reg-label ims-reg-kicker">
            Registering as <i className="ims-reg-required">*</i>
          </label>

          <div className="ims-reg-select ims-reg-select-wide">
            <select
              name="registeringAs"
              className="ims-company-registration-form-drop-down"
              value={formData.registeringAs}
              disabled
            >
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>

        <div className="ims-reg-grid">
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Full Name <i className="ims-reg-required">*</i>
            </label>

            <input
              className="ims-reg-input"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <small className="ims-reg-error">{errors.fullName}</small>
            )}
          </div>
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Email Address <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-email">
              <input
                className="ims-reg-input"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                    isEmailVerified: false,
                  }));
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />

              {formData.email.trim() && (
                <button
                  type="button"
                  className={
                    formData.isEmailVerified
                      ? "ims-reg-verify ims-reg-verified"
                      : "ims-reg-verify"
                  }
                  onClick={() => handleVerify("email")}
                  disabled={formData.isEmailVerified}
                >
                  {formData.isEmailVerified ? "Verified" : "Verify"}
                </button>
              )}
            </div>

            {errors.email && (
              <small className="ims-reg-error">{errors.email}</small>
            )}
          </div>

          {/* Phone */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Phone Number <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-phone">
              <span className="ims-reg-phone-code">+91</span>

              <input
                className="ims-reg-input"
                type="tel"
                name="phone"
                placeholder="Enter your number"
                value={formData.phone}
                maxLength={10}
                onChange={(e) => {
                  const phone = e.target.value.replace(/\D/g, "").slice(0, 10);

                  setFormData((prev) => ({
                    ...prev,
                    phone,
                    isPhoneVerified: false,
                  }));
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
              />

              {formData.phone.trim() && (
                <button
                  type="button"
                  className={
                    formData.isPhoneVerified
                      ? "ims-reg-verify ims-reg-verified"
                      : "ims-reg-verify"
                  }
                  onClick={() => handleVerify("phone")}
                  disabled={formData.isPhoneVerified}
                >
                  {formData.isPhoneVerified ? "Verified" : "Verify"}
                </button>
              )}
            </div>

            {errors.phone && (
              <small className="ims-reg-error">{errors.phone}</small>
            )}
          </div>

          {/* Date of Birth */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Date of Birth <i className="ims-reg-required">*</i>
            </label>

            <input
              className="ims-reg-input"
              type="text"
              name="dob"
              placeholder="mm/dd/yyyy"
              value={formData.dob}
              onChange={handleChange}
            />

            {errors.dob && (
              <small className="ims-reg-error">{errors.dob}</small>
            )}
          </div>

          {/* College */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              College / University <i className="ims-reg-required">*</i>
            </label>

            <input
              className="ims-reg-input"
              type="text"
              name="college"
              placeholder="Enter your university name"
              value={formData.college}
              onChange={handleChange}
            />

            {errors.college && (
              <small className="ims-reg-error">{errors.college}</small>
            )}
          </div>

          {/* Field of Study */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Field of Study <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-select">
              <select
                className="ims-reg-select-input"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
              >
                <option value="">Select your field of study</option>

                {fieldsOfStudy.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>

            {errors.fieldOfStudy && (
              <small className="ims-reg-error">{errors.fieldOfStudy}</small>
            )}
          </div>

          {/* Graduation Year */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Graduation Year <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-select">
              <select
                className="ims-reg-select-input"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
              >
                <option value="">Select your graduation year</option>

                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {errors.graduationYear && (
              <small className="ims-reg-error">{errors.graduationYear}</small>
            )}
          </div>

          {/* Resume - Optional */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">Resume (optional)</label>

            <label className="ims-reg-upload">
              <input
                className="ims-reg-input ims-reg-file"
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    resume: e.target.files?.[0] || null,
                  }));
                }}
              />

              <span className="ims-reg-upload-text">
                <span className="ims-reg-upload-icon">↑</span>
                {formData.resume?.name || "Upload PDF, DOCX (Max 5MB)"}
              </span>
            </label>
          </div>

          {/* Password */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Password <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-password">
              <input
                className="ims-reg-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className={`ims-reg-eye${showPassword ? " ims-reg-eye-closed" : ""}`}
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  className="ims-reg-eye-open"
                  src={showPassword ? eye : eyeclose}
                  alt=""
                />
                <span className="ims-reg-eye-shut" />
              </button>
            </div>

            {errors.password && (
              <small className="ims-reg-error">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="ims-reg-field">
            <label className="ims-reg-label">
              Confirm Password <i className="ims-reg-required">*</i>
            </label>

            <div className="ims-reg-password">
              <input
                className="ims-reg-input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className={`ims-reg-eye${showConfirmPassword ? " ims-reg-eye-closed" : ""}`}
                aria-label="Toggle confirm password visibility"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <img
                  className="ims-reg-eye-open"
                  src={showConfirmPassword ? eye : eyeclose}
                  alt=""
                />
                <span className="ims-reg-eye-shut" />
              </button>
            </div>

            {errors.confirmPassword && (
              <small className="ims-reg-error">{errors.confirmPassword}</small>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="ims-reg-agree-wrap">
          <label className="ims-reg-agree">
            <input
              className="ims-reg-checkbox"
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />

            <span className="ims-reg-agree-text">
              I agree to the{" "}
              <a className="ims-reg-link" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="ims-reg-link" href="#">
                Privacy Policy
              </a>
            </span>
          </label>

          {errors.agreed && (
            <small className="ims-reg-error">{errors.agreed}</small>
          )}
        </div>

        <button type="submit" className="ims-reg-submit">
          Create Account
        </button>

        <div className="ims-reg-or">
          <span className="ims-reg-or-line" />
          <span className="ims-reg-or-text">OR</span>
          <span className="ims-reg-or-line" />
        </div>

        <p className="ims-reg-signin">
          Already have an account?{" "}
          <button
            type="button"
            className="ims-reg-signin-btn"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </p>
      </form>

      {showVerificationPopup && (
        <RegistrationVerificationPopup
          type={verificationType}
          value={verificationValue}
          onClose={() => setShowVerificationPopup(false)}
          onVerified={handleVerifySuccess}
        />
      )}

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
