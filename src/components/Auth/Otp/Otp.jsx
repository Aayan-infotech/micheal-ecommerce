import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./otp.css";

function Otp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(`input:nth-of-type(${index + 2})`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    try {
      const response = await axios.post('http://44.196.192.232:3129/api/auth/verifyOTP', { otp: otpValue });
      if (response.data.success) {
        // Store the token and redirect or handle as needed
        localStorage.setItem('token', response.data.token);
        navigate('/passwordreset'); // Navigate to password reset page
      } else {
        setMessage('');
        setError(response.data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred while verifying OTP');
    }
  };

  return (
    <div className="Otp">
      <div className="container pass-contain">
        <h1 className="sign">OTP</h1>
        <p className='pass'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <div className="form">
          <form className="pass-form" onSubmit={handleSubmit}>
            <div className="o-form">
              <label>
                <h4>OTP</h4>
                <div className="otp-input">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
              </label>
              {error && <p className="error">{error}</p>}
              {message && <p className="message">{message}</p>}
              <label className='fpass'>
                <a href="##">Resend OTP</a>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;
