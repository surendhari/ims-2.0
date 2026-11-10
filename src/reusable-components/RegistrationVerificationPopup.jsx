
import React, { useRef, useState } from "react";
import "./RegistrationVerificationPopup.css";

const RegistrationVerificationPopup = ({
  type,
  value,
  onClose,
  onVerified,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  const DEMO_OTP = "123456";

  const handleChange = (index, inputValue) => {
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setMessage("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const updatedOtp = Array(6)
      .fill("")
      .map((_, index) => pastedOtp[index] || "");

    setOtp(updatedOtp);
    setMessage("");

    inputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setMessage("Please enter the 6-digit verification code");
      return;
    }

    if (enteredOtp === DEMO_OTP) {
      onVerified();
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setMessage("Demo OTP resent: 123456");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="verification-overlay">
      <div className="verification-popup">

        <button
          type="button"
          className="verification-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Verify</h2>

        <p className="verification-subtitle">
          Your code was sent to you via {type === "email" ? "email" : "SMS"}
        </p>

        <p className="verification-recipient">{value}</p>

        <div className="verification-otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              aria-label={`OTP digit ${index + 1} for ${value}`}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="verification-otp-input"
            />
          ))}
        </div>

        {message && (
          <p className="verification-message">{message}</p>
        )}

        <button
          type="button"
          className="verification-submit-btn"
          onClick={handleVerify}
        >
          Submit
        </button>

        <div className="verification-resend-container">
          Didn't receive code?{" "}
          <button
            type="button"
            className="verification-resend-btn"
            onClick={handleResend}
          >
            Request again
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegistrationVerificationPopup;
