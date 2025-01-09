import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./passwordrecovery.css";

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.millysshop.se/api/auth/send-email', { email });
      if (response.data.success) {
        setMessage('OTP sent successfully! Check your email.');
        setError('');
        setTimeout(() => navigate('/otp'), 2000); // Redirect to login after 2 seconds
      } else {
        setMessage('');
        setError(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred while sending OTP');
    }
  };

  return (
    <div className="passwordrecovery">
      <div className="container pass-contain">
        <h1 className="sign">Password Recovery</h1>
        <p className='pass'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <div className="form">
          <form className="pass-form" onSubmit={handleSubmit}>
            <div className="l-form">
              <label>
                <h4>Email/Mobile Number</h4>
                <input
                  type="text"
                  placeholder="Enter your email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {error && <p className="error">{error}</p>}
              {message && <p className="message">{message}</p>}
              <label className='fpass'>
                <Link to="/login">Login ?</Link>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
