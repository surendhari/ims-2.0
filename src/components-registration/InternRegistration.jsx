import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InternRegistration.css';
import { Header } from "../reusable-components/Header";
import illustration from '../assets/registration/Intern-Illustration.png';
import verifiedIcon from '../assets/registration/Verified.png';
import trackingIcon from '../assets/registration/Tracking.png';
import avatar from '../assets/registration/Avatar.png';
import eyeOpen from  "../assets/loginpage/eye.png";
import chevron from '../assets/registration/Intern-Dropdown.png';

const fieldsOfStudy = [
  'Computer Science',
  'Information Technology',
  'Data Science',
  'Design',
  'Business Administration',
  'Mechanical Engineering',
];

const graduationYears = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateDob(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return 'Enter date of birth as mm/dd/yyyy.';
  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return 'Enter a valid date of birth.';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return 'Date of birth cannot be in the future.';
  let age = today.getFullYear() - year;
  const monthDelta = today.getMonth() - (month - 1);
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < day)) age -= 1;
  if (age < 16 || age > 100) return 'Enter a valid date of birth.';
  return '';
}

function validateResume(file) {
  if (!file) return 'Upload your resume.';
  const name = file.name.toLowerCase();
  const extensionOk = name.endsWith('.pdf') || name.endsWith('.doc') || name.endsWith('.docx');
  if (!extensionOk) return 'Upload a PDF or DOCX file.';
  if (file.size > 5 * 1024 * 1024) return 'Resume must be 5MB or smaller.';
  return '';
}

function validatePassword(value) {
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumberOrSymbol = /[0-9]/.test(value) || /[^A-Za-z0-9]/.test(value);
  if (!value || value.length < 8 || !hasUpper || !hasLower || !hasNumberOrSymbol) {
    return 'Use at least 8 characters with uppercase, lowercase, and a number or symbol.';
  }
  return '';
}

export function InternRegistration() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Intern');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [college, setCollege] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const clearError = (key) => {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const next = {};
    if (!role) next.role = 'Select how you are registering.';
    if (fullName.trim().length < 2) next.fullName = 'Enter your full name.';
    if (!emailPattern.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit phone number.';
    const dobError = validateDob(dob);
    if (dobError) next.dob = dobError;
    if (college.trim().length < 2) next.college = 'Enter your college or university.';
    if (!fieldOfStudy) next.fieldOfStudy = 'Select your field of study.';
    if (!graduationYear) next.graduationYear = 'Select your graduation year.';
    const resumeError = validateResume(resume);
    if (resumeError) next.resume = resumeError;
    const passwordError = validatePassword(password);
    if (passwordError) next.password = passwordError;
    if (!confirmPassword) next.confirmPassword = 'Confirm your password.';
    else if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match.';
    if (!agreed) next.agreed = 'Agree to the Terms of Service and Privacy Policy.';
    setErrors(next);
  };

  return (
    <div className="ims-reg-page" id="ims-reg-page">
      <section className="ims-reg-left" id="ims-reg-left">
        <Header/>

        <div className="ims-reg-intro" id="ims-reg-intro">
          <h1 className="ims-reg-title" id="ims-reg-title">
            Your gateway to professional
            <br className="ims-reg-break" id="ims-reg-title-break" />
            excellence starts here.
          </h1>
          <p className="ims-reg-lead" id="ims-reg-lead">
            Join thousands of ambitious students securing world-class internships at
            <br className="ims-reg-break" id="ims-reg-lead-break" />
            leading tech companies and creative agencies.
          </p>
        </div>

        <div className="ims-reg-art-wrap" id="ims-reg-art-wrap">
          <img className="ims-reg-art" id="ims-reg-art" src={illustration} alt="Intern with a laptop" />
        </div>

        <div className="ims-reg-features" id="ims-reg-features">
        <div className="ims-reg-feature" id="ims-reg-feature-verified">
          <img className="ims-reg-feature-icon" id="ims-reg-feature-icon-verified" src={verifiedIcon} alt="" />
          <div className="ims-reg-feature-copy" id="ims-reg-feature-copy-verified">
            <strong className="ims-reg-feature-title" id="ims-reg-feature-title-verified">Verified Employers</strong>
            <span className="ims-reg-feature-text" id="ims-reg-feature-text-verified">Connect with pre-vetted top-tier companies worldwide.</span>
          </div>
        </div>

        <div className="ims-reg-feature" id="ims-reg-feature-tracking">
          <img className="ims-reg-feature-icon" id="ims-reg-feature-icon-tracking" src={trackingIcon} alt="" />
          <div className="ims-reg-feature-copy" id="ims-reg-feature-copy-tracking">
            <strong className="ims-reg-feature-title" id="ims-reg-feature-title-tracking">Smart Tracking</strong>
            <span className="ims-reg-feature-text" id="ims-reg-feature-text-tracking">Manage all your applications in one organized dashboard.</span>
          </div>
        </div>
        </div>

        <div className="ims-reg-quote" id="ims-reg-quote">
          <p className="ims-reg-quote-text" id="ims-reg-quote-text">“InternMS helped me land my dream internship at a Fortune 500<br className="ims-reg-break" id="ims-reg-quote-break" />company within 3 weeks of joining.”</p>
          <div className="ims-reg-quote-by" id="ims-reg-quote-by">
            <span className="ims-reg-avatar" id="ims-reg-avatar">
              <img className="ims-reg-avatar-img" id="ims-reg-avatar-img" src={avatar} alt="" />
            </span>
            <span className="ims-reg-quote-name" id="ims-reg-quote-name">— Sarah J., Product Design Intern</span>
          </div>
        </div>
      </section>

      <form className="ims-reg-form" id="ims-reg-form" onSubmit={handleCreate} noValidate>
        <div className="ims-reg-head" id="ims-reg-head">
          <h2 className="ims-reg-heading" id="ims-reg-heading">Create your account</h2>
          <p className="ims-reg-sub" id="ims-reg-sub">Fill in the details below to create your professional account</p>
        </div>

        <div className={`ims-reg-role${errors.role ? ' ims-reg-invalid' : ''}`} id="ims-reg-role">
        <label className="ims-reg-label ims-reg-kicker" id="ims-reg-role-label">
          Registering as <i className="ims-reg-required" id="ims-reg-role-required">*</i>
        </label>
        <div className="ims-reg-select ims-reg-select-wide" id="ims-reg-role-select">
          <select
            className="ims-reg-select-input"
            id="ims-reg-role-input"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              clearError('role');
            }}
            aria-label="Registering as"
            aria-invalid={Boolean(errors.role)}
          >
            <option className="ims-reg-option" id="ims-reg-role-option-empty" value="">Select</option>
            <option className="ims-reg-option" id="ims-reg-role-option-intern">Intern</option>
            <option className="ims-reg-option" id="ims-reg-role-option-student">Student</option>
            <option className="ims-reg-option" id="ims-reg-role-option-employer">Employer</option>
          </select>
          <img className="ims-reg-chevron" id="ims-reg-role-chevron" src={chevron} alt="" />
        </div>
        {errors.role && <p className="ims-reg-error" id="ims-reg-role-error">{errors.role}</p>}
        </div>

        <div className="ims-reg-grid" id="ims-reg-grid">
          <div className={`ims-reg-field${errors.fullName ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-name">
            <label className="ims-reg-label" id="ims-reg-label-name">Full Name <i className="ims-reg-required" id="ims-reg-required-name">*</i></label>
            <input
              className="ims-reg-input"
              id="ims-reg-input-name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              aria-invalid={Boolean(errors.fullName)}
              onChange={(e) => {
                setFullName(e.target.value);
                clearError('fullName');
              }}
            />
            {errors.fullName && <p className="ims-reg-error" id="ims-reg-error-name">{errors.fullName}</p>}
          </div>
          <div className={`ims-reg-field${errors.email ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-email">
            <label className="ims-reg-label" id="ims-reg-label-email">Email Address <i className="ims-reg-required" id="ims-reg-required-email">*</i></label>
            <input
              className="ims-reg-input"
              id="ims-reg-input-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              aria-invalid={Boolean(errors.email)}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError('email');
              }}
            />
            {errors.email && <p className="ims-reg-error" id="ims-reg-error-email">{errors.email}</p>}
          </div>

          <div className={`ims-reg-field${errors.phone ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-phone">
            <label className="ims-reg-label" id="ims-reg-label-phone">Phone Number <i className="ims-reg-required" id="ims-reg-required-phone">*</i></label>
            <div className="ims-reg-phone" id="ims-reg-phone">
              <span className="ims-reg-phone-code" id="ims-reg-phone-code">+91</span>
              <input
                className="ims-reg-input"
                id="ims-reg-input-phone"
                type="tel"
                placeholder="Enter your number"
                value={phone}
                aria-invalid={Boolean(errors.phone)}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearError('phone');
                }}
              />
            </div>
            {errors.phone && <p className="ims-reg-error" id="ims-reg-error-phone">{errors.phone}</p>}
          </div>
          <div className={`ims-reg-field${errors.dob ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-dob">
            <label className="ims-reg-label" id="ims-reg-label-dob">Date of Birth <i className="ims-reg-required" id="ims-reg-required-dob">*</i></label>
            <input
              className="ims-reg-input"
              id="ims-reg-input-dob"
              type="text"
              placeholder="mm/dd/yyyy"
              value={dob}
              aria-invalid={Boolean(errors.dob)}
              onChange={(e) => {
                setDob(e.target.value);
                clearError('dob');
              }}
            />
            {errors.dob && <p className="ims-reg-error" id="ims-reg-error-dob">{errors.dob}</p>}
          </div>

          <div className={`ims-reg-field${errors.college ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-college">
            <label className="ims-reg-label" id="ims-reg-label-college">College / University <i className="ims-reg-required" id="ims-reg-required-college">*</i></label>
            <input
              className="ims-reg-input"
              id="ims-reg-input-college"
              type="text"
              placeholder="Enter your university name"
              value={college}
              aria-invalid={Boolean(errors.college)}
              onChange={(e) => {
                setCollege(e.target.value);
                clearError('college');
              }}
            />
            {errors.college && <p className="ims-reg-error" id="ims-reg-error-college">{errors.college}</p>}
          </div>
          <div className={`ims-reg-field${errors.fieldOfStudy ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-study">
            <label className="ims-reg-label" id="ims-reg-label-study">Field of Study <i className="ims-reg-required" id="ims-reg-required-study">*</i></label>
            <div className="ims-reg-select" id="ims-reg-select-study">
              <select
                className="ims-reg-select-input"
                id="ims-reg-input-study"
                value={fieldOfStudy}
                onChange={(e) => {
                  setFieldOfStudy(e.target.value);
                  clearError('fieldOfStudy');
                }}
                aria-label="Field of Study"
                aria-invalid={Boolean(errors.fieldOfStudy)}
              >
                <option className="ims-reg-option" id="ims-reg-study-option-empty" value="">Select your field of study</option>
                {fieldsOfStudy.map((field) => (
                  <option className="ims-reg-option" id={`ims-reg-study-option-${field.replace(/\s+/g, '-').toLowerCase()}`} key={field}>{field}</option>
                ))}
              </select>
              <img className="ims-reg-chevron" id="ims-reg-study-chevron" src={chevron} alt="" />
            </div>
            {errors.fieldOfStudy && <p className="ims-reg-error" id="ims-reg-error-study">{errors.fieldOfStudy}</p>}
          </div>

          <div className={`ims-reg-field${errors.graduationYear ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-year">
            <label className="ims-reg-label" id="ims-reg-label-year">Graduation Year <i className="ims-reg-required" id="ims-reg-required-year">*</i></label>
            <div className="ims-reg-select" id="ims-reg-select-year">
              <select
                className="ims-reg-select-input"
                id="ims-reg-input-year"
                value={graduationYear}
                onChange={(e) => {
                  setGraduationYear(e.target.value);
                  clearError('graduationYear');
                }}
                aria-label="Graduation Year"
                aria-invalid={Boolean(errors.graduationYear)}
              >
                <option className="ims-reg-option" id="ims-reg-year-option-empty" value="">Select your graduation year</option>
                {graduationYears.map((year) => (
                  <option className="ims-reg-option" id={`ims-reg-year-option-${year}`} key={year}>{year}</option>
                ))}
              </select>
              <img className="ims-reg-chevron" id="ims-reg-year-chevron" src={chevron} alt="" />
            </div>
            {errors.graduationYear && <p className="ims-reg-error" id="ims-reg-error-year">{errors.graduationYear}</p>}
          </div>
          <div className={`ims-reg-field${errors.resume ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-resume">
            <label className="ims-reg-label" id="ims-reg-label-resume">Resume (optional) <i className="ims-reg-required" id="ims-reg-required-resume">*</i></label>
            <label className="ims-reg-upload" id="ims-reg-upload">
              <input
                className="ims-reg-input ims-reg-file"
                id="ims-reg-input-resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                aria-invalid={Boolean(errors.resume)}
                onChange={(e) => {
                  setResume(e.target.files?.[0] || null);
                  clearError('resume');
                }}
              />
              <span className="ims-reg-upload-text" id="ims-reg-upload-text">{resume?.name || 'Upload PDF, DOCX (Max 5MB)'}</span>
            </label>
            {errors.resume && <p className="ims-reg-error" id="ims-reg-error-resume">{errors.resume}</p>}
          </div>

          <div className={`ims-reg-field${errors.password ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-password">
            <label className="ims-reg-label" id="ims-reg-label-password">Password <i className="ims-reg-required" id="ims-reg-required-password">*</i></label>
            <div className="ims-reg-password" id="ims-reg-password">
              <input
                className="ims-reg-input"
                id="ims-reg-input-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                aria-invalid={Boolean(errors.password)}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError('password');
                }}
              />
              <button
                type="button"
                className={`ims-reg-eye${showPassword ? ' ims-reg-eye-closed' : ''}`}
                id="ims-reg-eye-password"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <img className="ims-reg-eye-open" id="ims-reg-eye-open-password" src={eyeOpen} alt="" />
                <span className="ims-reg-eye-shut" id="ims-reg-eye-shut-password" />
              </button>
            </div>
            {errors.password && <p className="ims-reg-error" id="ims-reg-error-password">{errors.password}</p>}
          </div>
          <div className={`ims-reg-field${errors.confirmPassword ? ' ims-reg-invalid' : ''}`} id="ims-reg-field-confirm">
            <label className="ims-reg-label" id="ims-reg-label-confirm">Confirm Password <i className="ims-reg-required" id="ims-reg-required-confirm">*</i></label>
            <div className="ims-reg-password" id="ims-reg-confirm">
              <input
                className="ims-reg-input"
                id="ims-reg-input-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                aria-invalid={Boolean(errors.confirmPassword)}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError('confirmPassword');
                }}
              />
              <button
                type="button"
                className={`ims-reg-eye${showConfirmPassword ? ' ims-reg-eye-closed' : ''}`}
                id="ims-reg-eye-confirm"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowConfirmPassword((visible) => !visible)}
              >
                <img className="ims-reg-eye-open" id="ims-reg-eye-open-confirm" src={eyeOpen} alt="" />
                <span className="ims-reg-eye-shut" id="ims-reg-eye-shut-confirm" />
              </button>
            </div>
            {errors.confirmPassword && <p className="ims-reg-error" id="ims-reg-error-confirm">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="ims-reg-agree-wrap" id="ims-reg-agree-wrap">
          <label className="ims-reg-agree" id="ims-reg-agree">
            <input
              className="ims-reg-checkbox"
              id="ims-reg-checkbox"
              type="checkbox"
              checked={agreed}
              aria-invalid={Boolean(errors.agreed)}
              onChange={(e) => {
                setAgreed(e.target.checked);
                clearError('agreed');
              }}
            />
            <span className="ims-reg-agree-text" id="ims-reg-agree-text">
              I agree to the <a className="ims-reg-link" id="ims-reg-terms" href="#">Terms of Service</a> and <a className="ims-reg-link" id="ims-reg-privacy" href="#">Privacy Policy</a>
            </span>
          </label>
          {errors.agreed && <p className="ims-reg-error" id="ims-reg-error-agreed">{errors.agreed}</p>}
        </div>

        <button type="submit" className="ims-reg-submit" id="ims-reg-submit">Create Account</button>

        <div className="ims-reg-or" id="ims-reg-or"><span className="ims-reg-or-text" id="ims-reg-or-text">OR</span></div>

        <p className="ims-reg-signin" id="ims-reg-signin">
          Already have an account? <button type="button" className="ims-reg-signin-btn" id="ims-reg-signin-btn" onClick={() => navigate('/components-login/login')}>Sign in</button>
        </p>
      </form>
    </div>
  );
}
