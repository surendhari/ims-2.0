import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './InternRegistration.css';
import illustration from '../assets/registration/Intern-Illustration.png';
import verifiedIcon from '../assets/registration/Verified.png';
import trackingIcon from '../assets/registration/Tracking.png';
import avatar from '../assets/registration/Avatar.png';
import eyeOpen from '../assets/registration/Eye-open.png';
import chevron from '../assets/registration/dropdown.png';
import { Header } from '../reusable-components/Header';

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

export const InternRegistration = ()=> {
  const navigate = useNavigate();
  const saved = useLocation().state?.registration ?? {};
  const [role, setRole] = useState(saved.role ?? 'Intern');
  const [fullName, setFullName] = useState(saved.fullName ?? '');
  const [email, setEmail] = useState(saved.email ?? '');
  const [phone, setPhone] = useState(saved.phone ?? '');
  const [dob, setDob] = useState(saved.dob ?? '');
  const [college, setCollege] = useState(saved.college ?? '');
  const [fieldOfStudy, setFieldOfStudy] = useState(saved.fieldOfStudy ?? '');
  const [graduationYear, setGraduationYear] = useState(saved.graduationYear ?? '');
  const [resume, setResume] = useState(saved.resume ?? null);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState(saved.password ?? '');
  const [confirmPassword, setConfirmPassword] = useState(saved.confirmPassword ?? '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(Boolean(saved.agreed));
  const [emailVerified, setEmailVerified] = useState(Boolean(saved.emailVerified));
  const [phoneVerified, setPhoneVerified] = useState(Boolean(saved.phoneVerified));

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
    else if (!emailVerified) next.email = 'Please verify the Phone number or email';
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit phone number.';
    else if (!phoneVerified) next.phone = 'Please verify the Phone number or email';
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

  const registrationState = () => ({
    role,
    fullName,
    email,
    phone,
    dob,
    college,
    fieldOfStudy,
    graduationYear,
    resume,
    password,
    confirmPassword,
    agreed,
    emailVerified,
    phoneVerified,
  });

  const handleVerify = (field) => {
    if (field === 'email' && emailVerified) return;
    if (field === 'phone' && phoneVerified) return;
    if (field === 'email' && !emailPattern.test(email.trim())) {
      setErrors((current) => ({ ...current, email: 'Enter a valid email address.' }));
      return;
    }
    if (field === 'phone' && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setErrors((current) => ({ ...current, phone: 'Enter a valid 10-digit phone number.' }));
      return;
    }
    navigate('/RegistrationOTP', {
      state: {
        verifyField: field,
        registration: registrationState(),
      },
    });
  };

  return (
    <div className="ims-reg-page">
      <section className="ims-reg-left">
        <Header/>

        <div className="ims-reg-intro">
          <h1 className="ims-reg-title">
            Your gateway to professional
            <br className="ims-reg-break" />
            excellence starts here.
          </h1>
          <p className="ims-reg-lead">
            Join thousands of ambitious students securing world-class internships at
            <br className="ims-reg-break" />
            leading tech companies and creative agencies.
          </p>
        </div>

        <div className="ims-reg-art-wrap">
          <img className="ims-reg-art" src={illustration} alt="Intern with a laptop" />
        </div>

        <div className="ims-reg-features">
        <div className="ims-reg-feature">
          <img className="ims-reg-feature-icon" src={verifiedIcon} alt="" />
          <div className="ims-reg-feature-copy">
            <strong className="ims-reg-feature-title">Verified Employers</strong>
            <span className="ims-reg-feature-text">Connect with pre-vetted top-tier companies worldwide.</span>
          </div>
        </div>

        <div className="ims-reg-feature">
          <img className="ims-reg-feature-icon" src={trackingIcon} alt="" />
          <div className="ims-reg-feature-copy">
            <strong className="ims-reg-feature-title">Smart Tracking</strong>
            <span className="ims-reg-feature-text">Manage all your applications in one organized dashboard.</span>
          </div>
        </div>
        </div>

        <div className="ims-reg-quote">
          <p className="ims-reg-quote-text">“InternMS helped me land my dream internship at a Fortune 500<br className="ims-reg-break" />company within 3 weeks of joining.”</p>
          <div className="ims-reg-quote-by">
            <span className="ims-reg-avatar">
              <img className="ims-reg-avatar-img" src={avatar} alt="" />
            </span>
            <span className="ims-reg-quote-name">— Sarah J., Product Design Intern</span>
          </div>
        </div>
      </section>

      <form className="ims-reg-form" onSubmit={handleCreate} noValidate>
        <div className="ims-reg-head">
          <h2 className="ims-reg-heading">Create your account</h2>
          <p className="ims-reg-sub">Fill in the details below to create your professional account</p>
        </div>

        <div className={`ims-reg-role${errors.role ? ' ims-reg-invalid' : ''}`}>
        <label className="ims-reg-label ims-reg-kicker">
          Registering as <i className="ims-reg-required">*</i>
        </label>
        <div className="ims-reg-select ims-reg-select-wide">
          <select
            className="ims-reg-select-input"

            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              clearError('role');
            }}
            aria-label="Registering as"
            aria-invalid={Boolean(errors.role)}
          >
            <option className="ims-reg-option" value="">Select</option>
            <option className="ims-reg-option">Intern</option>
            <option className="ims-reg-option">Student</option>
            <option className="ims-reg-option">Employer</option>
          </select>
          <img className="ims-reg-chevron" src={chevron} alt="" />
        </div>
        {errors.role && <p className="ims-reg-error">{errors.role}</p>}
        </div>

        <div className="ims-reg-grid">
          <div className={`ims-reg-field${errors.fullName ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Full Name <i className="ims-reg-required">*</i></label>
            <input
              className="ims-reg-input"

              type="text"
              placeholder="Enter your full name"
              value={fullName}
              aria-invalid={Boolean(errors.fullName)}
              onChange={(e) => {
                setFullName(e.target.value);
                clearError('fullName');
              }}
            />
            {errors.fullName && <p className="ims-reg-error">{errors.fullName}</p>}
          </div>
          <div className={`ims-reg-field${errors.email ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Email Address <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-email">
              <input
                className="ims-reg-input"

                type="email"
                placeholder="Enter your email address"
                value={email}
                aria-invalid={Boolean(errors.email)}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailVerified(false);
                  clearError('email');
                }}
              />
              <button
                type="button"
                className={emailVerified ? 'ims-reg-verify ims-reg-verified' : 'ims-reg-verify'}

                onClick={() => handleVerify('email')}
              >
                {emailVerified ? 'Verified' : 'Verify'}
              </button>
            </div>
            {errors.email && <p className="ims-reg-error">{errors.email}</p>}
          </div>

          <div className={`ims-reg-field${errors.phone ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Phone Number <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-phone">
              <span className="ims-reg-phone-code">+91</span>
              <input
                className="ims-reg-input"

                type="tel"
                placeholder="Enter your number"
                value={phone}
                aria-invalid={Boolean(errors.phone)}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneVerified(false);
                  clearError('phone');
                }}
              />
              <button
                type="button"
                className={phoneVerified ? 'ims-reg-verify ims-reg-verified' : 'ims-reg-verify'}

                onClick={() => handleVerify('phone')}
              >
                {phoneVerified ? 'Verified' : 'Verify'}
              </button>
            </div>
            {errors.phone && <p className="ims-reg-error">{errors.phone}</p>}
          </div>
          <div className={`ims-reg-field${errors.dob ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Date of Birth <i className="ims-reg-required">*</i></label>
            <input
              className="ims-reg-input"

              type="text"
              placeholder="mm/dd/yyyy"
              value={dob}
              aria-invalid={Boolean(errors.dob)}
              onChange={(e) => {
                setDob(e.target.value);
                clearError('dob');
              }}
            />
            {errors.dob && <p className="ims-reg-error">{errors.dob}</p>}
          </div>

          <div className={`ims-reg-field${errors.college ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">College / University <i className="ims-reg-required">*</i></label>
            <input
              className="ims-reg-input"

              type="text"
              placeholder="Enter your university name"
              value={college}
              aria-invalid={Boolean(errors.college)}
              onChange={(e) => {
                setCollege(e.target.value);
                clearError('college');
              }}
            />
            {errors.college && <p className="ims-reg-error">{errors.college}</p>}
          </div>
          <div className={`ims-reg-field${errors.fieldOfStudy ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Field of Study <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-select">
              <select
                className="ims-reg-select-input"

                value={fieldOfStudy}
                onChange={(e) => {
                  setFieldOfStudy(e.target.value);
                  clearError('fieldOfStudy');
                }}
                aria-label="Field of Study"
                aria-invalid={Boolean(errors.fieldOfStudy)}
              >
                <option className="ims-reg-option" value="">Select your field of study</option>
                {fieldsOfStudy.map((field) => (
                  <option className="ims-reg-option" key={field}>{field}</option>
                ))}
              </select>
              <img className="ims-reg-chevron" src={chevron} alt="" />
            </div>
            {errors.fieldOfStudy && <p className="ims-reg-error">{errors.fieldOfStudy}</p>}
          </div>

          <div className={`ims-reg-field${errors.graduationYear ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Graduation Year <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-select">
              <select
                className="ims-reg-select-input"

                value={graduationYear}
                onChange={(e) => {
                  setGraduationYear(e.target.value);
                  clearError('graduationYear');
                }}
                aria-label="Graduation Year"
                aria-invalid={Boolean(errors.graduationYear)}
              >
                <option className="ims-reg-option" value="">Select your graduation year</option>
                {graduationYears.map((year) => (
                  <option className="ims-reg-option" key={year}>{year}</option>
                ))}
              </select>
              <img className="ims-reg-chevron" src={chevron} alt="" />
            </div>
            {errors.graduationYear && <p className="ims-reg-error">{errors.graduationYear}</p>}
          </div>
          <div className={`ims-reg-field${errors.resume ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Resume (optional) <i className="ims-reg-required">*</i></label>
            <label className="ims-reg-upload">
              <input
                className="ims-reg-input ims-reg-file"

                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                aria-invalid={Boolean(errors.resume)}
                onChange={(e) => {
                  setResume(e.target.files?.[0] || null);
                  clearError('resume');
                }}
              />
              <span className="ims-reg-upload-text">
                <span className="ims-reg-upload-icon">↑</span>
                {resume?.name || 'Upload PDF, DOCX (Max 5MB)'}
              </span>
            </label>
            {errors.resume && <p className="ims-reg-error">{errors.resume}</p>}
          </div>

          <div className={`ims-reg-field${errors.password ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Password <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-password">
              <input
                className="ims-reg-input"

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

                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <img className="ims-reg-eye-open" src={eyeOpen} alt="" />
                <span className="ims-reg-eye-shut" />
              </button>
            </div>
            {errors.password && <p className="ims-reg-error">{errors.password}</p>}
          </div>
          <div className={`ims-reg-field${errors.confirmPassword ? ' ims-reg-invalid' : ''}`}>
            <label className="ims-reg-label">Confirm Password <i className="ims-reg-required">*</i></label>
            <div className="ims-reg-password">
              <input
                className="ims-reg-input"

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

                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowConfirmPassword((visible) => !visible)}
              >
                <img className="ims-reg-eye-open" src={eyeOpen} alt="" />
                <span className="ims-reg-eye-shut" />
              </button>
            </div>
            {errors.confirmPassword && <p className="ims-reg-error">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="ims-reg-agree-wrap">
          <label className="ims-reg-agree">
            <input
              className="ims-reg-checkbox"

              type="checkbox"
              checked={agreed}
              aria-invalid={Boolean(errors.agreed)}
              onChange={(e) => {
                setAgreed(e.target.checked);
                clearError('agreed');
              }}
            />
            <span className="ims-reg-agree-text">
              I agree to the <a className="ims-reg-link" href="#">Terms of Service</a> and <a className="ims-reg-link" href="#">Privacy Policy</a>
            </span>
          </label>
          {errors.agreed && <p className="ims-reg-error">{errors.agreed}</p>}
        </div>

        <button type="submit" className="ims-reg-submit">Create Account</button>

        <div className="ims-reg-or">
          <span className="ims-reg-or-line" />
          <span className="ims-reg-or-text">OR</span>
          <span className="ims-reg-or-line" />
        </div>

        <p className="ims-reg-signin">
          Already have an account? <button type="button" className="ims-reg-signin-btn" onClick={() => navigate('/login')}>Sign in</button>
        </p>
      </form>
    </div>
  );
}