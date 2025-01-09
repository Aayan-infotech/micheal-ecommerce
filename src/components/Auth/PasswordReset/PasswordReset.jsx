import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./passwordreset.css";

function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();
  // const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://www.millysshop.se/api/auth/reset-password', { token, newPassword });
      if (response.data.success) {
        setMessage('Password reset successfully! You can now log in.');
        setError('');
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        setMessage('');
        setError(response.data.message || 'Failed to reset password');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div className="passwordreset">
      <div className="container pass-contain">
        <h1 className="sign">Password Reset</h1>
        <p className='pass'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <div className="form">
          <form className="pass-form" onSubmit={handleSubmit}>
            <div className="l-form">
              <label>
                <h4>New Password</h4>
                <input
                  type="password"
                  placeholder="***********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label>
                <h4>Confirm New Password</h4>
                <input
                  type="password"
                  placeholder="***********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
