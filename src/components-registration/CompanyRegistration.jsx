import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompanyRegistration.css"
import Illustration from "../assets/registration/Illustration-Image.png";
import Buttomframeone from "../assets/registration/Hiring-icon.png";
import verifiedIcon from "../assets/registration/Verified-icon.png";
import DropDownarrowLarge from "../assets/registration/Drop-Down-arrow-large.png"; 
import DropDownarrowSmall from "../assets/registration/Drop-down-arrow-small.png"
import EyeOpenIcon from "../assets/registration/Eye-open-icon.png"
import EyeCloseIcon from "../assets/registration/Eye-close-icon.png"
import { Header } from "../reusable-components/Header";

const FORM_CACHE_KEY = "ims_company_registration_cache";

export const CompanyRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cachedData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(FORM_CACHE_KEY);
      sessionStorage.removeItem(FORM_CACHE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const justVerified = location.state?.verified;
  const verifiedType = location.state?.type;

  const [companyName, setCompanyName] = useState(cachedData.companyName || '');
  const [companyNameError, setCompanyNameError] = useState('');

  const [companyWebsite, setCompanyWebsite] = useState(cachedData.companyWebsite || '');
  const [companyWebsiteError, setCompanyWebsiteError] = useState('');

  const [workEmail, setWorkEmail] = useState(cachedData.workEmail || '');
  const [workEmailError, setWorkEmailError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState(cachedData.phoneNumber || '');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(
    Boolean(
      (cachedData.workEmail || workEmail) &&
      (cachedData.isEmailVerified || (justVerified && verifiedType === 'email'))
    )
  );
  const [isPhoneVerified, setIsPhoneVerified] = useState(
    Boolean(
      (cachedData.phoneNumber || phoneNumber) &&
      (cachedData.isPhoneVerified || (justVerified && verifiedType === 'phone'))
    )
  );

  
  useEffect(() => {
    if (location.state?.verified) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const [industry, setIndustry] = useState(cachedData.industry || '');
  const [industryError, setIndustryError] = useState('');

  const [companySize, setCompanySize] = useState(cachedData.companySize || '');
  const [companySizeError, setCompanySizeError] = useState('');

  const [registrationNumber, setRegistrationNumber] = useState(cachedData.registrationNumber || '');
  const [registrationNumberError, setRegistrationNumberError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(cachedData.agreedToTerms || false);
  const [termsError, setTermsError] = useState('');


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

  const saveFormCache = () => {
    try {
      sessionStorage.setItem(
        FORM_CACHE_KEY,
        JSON.stringify({
          companyName,
          companyWebsite,
          workEmail,
          phoneNumber,
          industry,
          companySize,
          registrationNumber,
          agreedToTerms,
          isEmailVerified,
          isPhoneVerified,
        })
      );
    } catch {

    }
  };

  const handleVerifyEmail = (e) => {
    e?.preventDefault();
    if (isEmailVerified) return;
    if (!workEmail.trim()) {
      setWorkEmailError('Please enter your work email');
      return;
    }
    if (!emailRegex.test(workEmail.trim())) {
      setWorkEmailError('Please enter a valid work email address');
      return;
    }
    setWorkEmailError('');
    saveFormCache();
    navigate("/RegistrationOTP", {
      state: { type: "email", value: workEmail.trim() }
    });
  };

  const handleVerifyPhone = (e) => {
    e?.preventDefault();
    if (isPhoneVerified) return;
    const cleanedPhone = phoneNumber.trim().replace(/[\s-]/g, '');
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter your phone number');
      return;
    }
    if (!/^\d{10}$/.test(cleanedPhone)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number');
      return;
    }
    setPhoneNumberError('');
    saveFormCache();
    navigate("/components-registration/RegistrationOTP", {
      state: { type: "phone", value: cleanedPhone }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!companyName.trim()) {
      setCompanyNameError('Please enter your company name');
      hasError = true;
    }

    if (!companyWebsite.trim()) {
      setCompanyWebsiteError('Please enter your company website');
      hasError = true;
    } else if (!urlRegex.test(companyWebsite.trim())) {
      setCompanyWebsiteError('Please enter a valid website URL');
      hasError = true;
    }

    if (!workEmail.trim()) {
      setWorkEmailError('Please enter your work email');
      hasError = true;
    } else if (!emailRegex.test(workEmail.trim())) {
      setWorkEmailError('Please enter a valid work email address');
      hasError = true;
    } else if (!isEmailVerified) {
      setWorkEmailError('Please verify your work email');
      hasError = true;
    }

    const cleanedPhone = phoneNumber.trim().replace(/[\s-]/g, '');
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter your phone number');
      hasError = true;
    } else if (!/^\d{10}$/.test(cleanedPhone)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number');
      hasError = true;
    } else if (!isPhoneVerified) {
      setPhoneNumberError('Please verify your phone number');
      hasError = true;
    }

    if (!industry) {
      setIndustryError('Please select an industry');
      hasError = true;
    }

    if (!companySize) {
      setCompanySizeError('Please select company size');
      hasError = true;
    }

    if (!registrationNumber.trim()) {
      setRegistrationNumberError('Please enter your registration number');
      hasError = true;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!password) {
      setPasswordError('Please enter a password');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    } else if (!hasUpperCase) {
      setPasswordError('Password must contain at least one uppercase letter (A-Z)');
      hasError = true;
    } else if (!hasLowerCase) {
      setPasswordError('Password must contain at least one lowercase letter (a-z)');
      hasError = true;
    } else if (!hasNumber) {
      setPasswordError('Password must contain at least one number (0-9)');
      hasError = true;
    } else if (!hasSymbol) {
      setPasswordError('Password must contain at least one symbol (e.g. !@#$%^&*)');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (!agreedToTerms) {
      setTermsError('You must agree to the Terms of Service and Privacy Policy');
      hasError = true;
    }

    if (hasError) return;

    sessionStorage.removeItem(FORM_CACHE_KEY);
  };
  return (
    <>
    <div className="ims-company-registration-page">

      <div className="ims-company-registration-container">

        <div className="ims-company-registration-left">
         <Header/>
           <div className="ims-company-registration-content">
                Partner with InternMS to scale  your team.
            </div>

            <div className="ims-company-registration-description">
                Connect with over 100,000+ top-tier students and graduates ready to<br/> bring innovation to your company.
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
                     Every student profile is verified for education and skill credentials.
                    </div>
                    </div>  
                </div>
            </div>
        </div>

        <div className="ims-company-registration-right">
          <div className="ims-company-registration-form">
                <div className="ims-company-registration-form-header">
                    <div className="ims-company-registration-form-title">
                        Create your account
                    </div>
                    <div className="ims-company-registration-form-subtitle">
                        Fill in the details to register your organization and start hiring.
                    </div>
                </div>
                <form className="ims-company-registration-form-body" onSubmit={handleSubmit}>

                  <div className="ims-company-registration-form-group">
                      <label htmlFor="ims-company-registration-registering-as" className="ims-company-registration-form-label">
                        Registering As <span className="ims-form-required">*</span>
                      </label>

                      <div className="ims-company-registration-form-select-container">
                        <select 
                          id="ims-company-registration-registering-as"
                          name="registeringAs"
                          className="ims-company-registration-form-drop-down" 
                          defaultValue="Company"
                        >
                          <option value="Company">Company</option>
                        </select>
                     
                       <img src={DropDownarrowLarge} alt="Down Arrow" className="ims-company-registration-form-select-arrow" />
                       
                      </div>
                      <span className="ims-company-registration-error"></span>
                  </div>
                      <div className="ims-company-registration-form-row">
                        <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-company-name" className="ims-company-registration-form-label">
                                  Company Name<span className="ims-form-required">*</span>
                             </label>

                            <input 
                              type="text" 
                              id="ims-company-registration-company-name"
                              name="companyName"
                              className={`ims-company-registration-form-input ${companyNameError ? "ims-input-error" : ""}`} 
                              placeholder="e.g. Acme Corp" 
                              value={companyName} 
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                                if (companyNameError) setCompanyNameError('');
                              }} 
                            />
                            <span className="ims-company-registration-error">{companyNameError}</span>
                          </div>

                          <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-company-website" className="ims-company-registration-form-label">
                                  Company Website <span className="ims-form-required">*</span>
                             </label>

                            <input 
                              type="text" 
                              id="ims-company-registration-company-website"
                              name="companyWebsite"
                              className={`ims-company-registration-form-input ${companyWebsiteError ? "ims-input-error" : ""}`} 
                              placeholder="https://" 
                              value={companyWebsite} 
                              onChange={(e) => {
                                setCompanyWebsite(e.target.value);
                                if (companyWebsiteError) setCompanyWebsiteError('');
                              }} 
                            />
                            <span className="ims-company-registration-error">{companyWebsiteError}</span>
                          </div>

                      </div>
                      <div className="ims-company-registration-form-row">
                        <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-email" className="ims-company-registration-form-label">
                                  Work Email<span className="ims-form-required">*</span>
                             </label>

                            <div className="ims-company-registration-verify-container">
                              <input 
                                type="email" 
                                id="ims-company-registration-email"
                                name="workEmail"
                                autoComplete="email"
                                className={`ims-company-registration-form-input ims-company-registration-input-with-verify ${workEmailError ? "ims-input-error" : ""}`} 
                                placeholder="name@company.com" 
                                value={workEmail} 
                                onChange={(e) => { 
                                  setWorkEmail(e.target.value); 
                                  if (isEmailVerified) setIsEmailVerified(false);
                                  if (workEmailError) setWorkEmailError(''); 
                                }} 
                              />
                              <button 
                                type="button" 
                                className={`ims-company-registration-verify-btn ${isEmailVerified ? "ims-verified" : ""}`}
                                onClick={handleVerifyEmail}
                                disabled={isEmailVerified}
                              >
                                {isEmailVerified ? "Verified" : "Verify"}
                              </button>
                            </div>
                            <span className="ims-company-registration-error">{workEmailError}</span>
                          </div>

                          <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-phone" className="ims-company-registration-form-label">
                                  Phone Number<span className="ims-form-required">*</span>
                             </label>
                             <div className="ims-company-registration-form-phoneNumber">
                                <input 
                                  type="text" 
                                  id="ims-company-registration-country-code"
                                  name="countryCode"
                                  aria-label="Country Code"
                                  className="ims-company-registration-form-input-phoneNumber" 
                                  defaultValue="+91" 
                                  readOnly  
                                />
                                <div className="ims-company-registration-verify-container ims-phone-number-field-container">
                                  <input 
                                    type="tel" 
                                    id="ims-company-registration-phone"
                                    name="phoneNumber"
                                    autoComplete="tel"
                                    className={`ims-company-registration-form-input ims-phone-number-field ims-company-registration-input-with-verify ${phoneNumberError ? "ims-input-error" : ""}`} 
                                    placeholder="Enter your number" 
                                    value={phoneNumber}
                                    onChange={(e) => {
                                      setPhoneNumber(e.target.value);
                                      if (isPhoneVerified) setIsPhoneVerified(false);
                                      if (phoneNumberError) setPhoneNumberError('');
                                    }}
                                  />
                                  <button 
                                    type="button" 
                                    className={`ims-company-registration-verify-btn ${isPhoneVerified ? "ims-verified" : ""}`}
                                    onClick={handleVerifyPhone}
                                    disabled={isPhoneVerified}
                                  >
                                    {isPhoneVerified ? "Verified" : "Verify"}
                                  </button>
                                </div>
                            </div>
                            <span className="ims-company-registration-error">{phoneNumberError}</span>
                          </div>
                      </div>
                       <div className="ims-company-registration-form-row">
                        <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-industry" className="ims-company-registration-form-label">
                                  Industry <span className="ims-form-required">*</span>
                             </label>

                        <div className="ims-company-registration-form-select-container">
                        <select 
                          id="ims-company-registration-industry"
                          name="industry"
                          className={`ims-company-registration-form-drop-down ${industryError ? "ims-input-error" : ""}`}
                          value={industry}
                          onChange={(e) => {
                            setIndustry(e.target.value);
                            if (industryError) setIndustryError('');
                          }}
                        >
                          <option value="">Select industry</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Finance & Banking">Finance & Banking</option>
                        </select>
                       
                        <img src={DropDownarrowSmall} alt="Drop Down" className="ims-company-registration-form-select-arrow ims-company-registration-dropDown" />
                       
                      </div>
                      <span className="ims-company-registration-error">{industryError}</span>
                          </div>

                          <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-company-size" className="ims-company-registration-form-label">
                                 Company Size <span className="ims-form-required">*</span>
                             </label>

                        <div className="ims-company-registration-form-select-container">
                        <select 
                          id="ims-company-registration-company-size"
                          name="companySize"
                          className={`ims-company-registration-form-drop-down ${companySizeError ? "ims-input-error" : ""}`}
                          value={companySize}
                          onChange={(e) => {
                            setCompanySize(e.target.value);
                            if (companySizeError) setCompanySizeError('');
                          }}
                        >
                          <option value="">Select size</option>
                          <option value="1-50 Employees">1-50 Employees</option>
                          <option value="50-200 Employees">50-200 Employees</option>
                        </select>
                       
                        <img src={DropDownarrowSmall} alt="Drop Down for select" className="ims-company-registration-form-select-arrow ims-company-registration-dropDown" />
                      
                      </div>
                      <span className="ims-company-registration-error">{companySizeError}</span>
                          </div>

                      </div>
                      <div className="ims-company-registration-form-group">
                          <label htmlFor="ims-company-registration-registration-number" className="ims-company-registration-form-label">
                            Registration Number <span className="ims-form-required">*</span>
                          </label>  
                           <input 
                             type="text" 
                             id="ims-company-registration-registration-number"
                             name="registrationNumber"
                             className={`ims-company-registration-form-input ${registrationNumberError ? "ims-input-error" : ""}`} 
                             placeholder="Business ID or Tax ID" 
                             value={registrationNumber}
                             onChange={(e) => {
                               setRegistrationNumber(e.target.value);
                               if (registrationNumberError) setRegistrationNumberError('');
                             }}
                           />
                           <span className="ims-company-registration-error">{registrationNumberError}</span>
                      </div>

                       <div className="ims-company-registration-form-row">
                        <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-password" className="ims-company-registration-form-label">
                                  Password   <span className="ims-form-required">*</span>
                             </label>
                            <div className="ims-company-registration-password-container">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              id="ims-company-registration-password"
                              name="password"
                              autoComplete="new-password"
                              className={`ims-company-registration-form-input ${passwordError ? "ims-input-error" : ""}`} 
                              placeholder="Create a strong password" 
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (passwordError) setPasswordError('');
                              }}
                            />
                           
                             <button
                                type="button"
                                className="ims-company-registration-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                                >

                                <img src={showPassword ? EyeOpenIcon : EyeCloseIcon} alt="Eye Icon" />
                              </button>
                           </div>
                           <span className="ims-company-registration-error">{passwordError}</span>
                          </div>

                          <div className="ims-company-registration-form-group">
                            <label htmlFor="ims-company-registration-confirm-password" className="ims-company-registration-form-label">
                                 Confirm Password  <span className="ims-form-required">*</span>
                             </label>

                            <div className="ims-company-registration-password-container">
                            <input 
                              type={showConfirm ? "text" : "password"} 
                              id="ims-company-registration-confirm-password"
                              name="confirmPassword"
                              autoComplete="new-password"
                              className={`ims-company-registration-form-input ${confirmPasswordError ? "ims-input-error" : ""}`} 
                              placeholder="Confirm your password" 
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (confirmPasswordError) setConfirmPasswordError('');
                              }}
                            />
                           
                             <button
                                type="button"
                                className="ims-company-registration-password-toggle"
                                onClick={() => setShowConfirm(!showConfirm)}
                                aria-label="Toggle confirm password visibility"
                                >

                                <img src={showConfirm ? EyeOpenIcon : EyeCloseIcon} alt="Eye Icon" />
                              </button>
                           </div>
                           <span className="ims-company-registration-error">{confirmPasswordError}</span>
                          </div>

                      </div>

                      <div className="ims-company-registration-terms-container">
                        <div className="ims-company-registration-terms-group">
                            <input 
                              type="checkbox" 
                              id="ims-company-registration-terms" 
                              name="agreedToTerms"
                              className="ims-company-registration-checkbox" 
                              checked={agreedToTerms}
                              onChange={(e) => {
                                setAgreedToTerms(e.target.checked);
                                if (termsError) setTermsError('');
                              }}
                            />
                            <label htmlFor="ims-company-registration-terms" className="ims-company-registration-terms-label">
                              I agree to the <a href="#terms" className="ims-terms-link">Terms of Service</a> and <a href="#privacy" className="ims-terms-link">Privacy Policy</a>
                            </label>
                        </div>
                        <span className="ims-company-registration-error">{termsError}</span>
                      </div>

                        <button type="submit" className="ims-company-registration-form-button">
                              Create Account
                        </button>

                        <div className="ims-company-registration-divider">
                            <span className="ims-company-registration-divider-line" />
                            <span className="ims-company-registration-divider-text">OR</span>
                            <span className="ims-company-registration-divider-line" />
                        </div>

                        <div className="ims-company-registration-signin">
                            Already have an account?{" "}
                            <a href="#" className="ims-company-registration-signin-link">
                              Sign in
                            </a>
                          </div>
               </form>
        </div>
        </div>
      </div>

    </div>
    </>
  )
}