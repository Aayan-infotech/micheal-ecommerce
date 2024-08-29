import React from 'react';
import { Link } from 'react-router-dom';
import "./passwordreset.css";

function PasswordReset() {
  return (
    <div className="passwordreset">
    <div className="container pass-contain">
      <h1 className="sign">Password Reset</h1>
      <p className='pass'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <div className="form">
        <form className="pass-form">
          <div className="l-form">
            <label>
              <h4>New Password</h4>
              <input type="password" placeholder="***********"/>
            </label>
            <label>
                <h4>Confirm New Password</h4>
                <input type="password" placeholder="***********"/>
            </label>
          </div>
          <button type="submit"><Link to="/login" style={{color: 'white'}}>Update</Link></button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default PasswordReset;
