import React from 'react';
import { Link } from 'react-router-dom';
import "./passwordrecovery.css";

function PasswordRecovery() {
  return (
    <div className="passwordrecovery">
    <div className="container pass-contain">
      <h1 className="sign">Password Recovery</h1>
      <p className='pass'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <div className="form">
        <form className="pass-form">
          <div className="l-form">
            <label>
              <h4>Email/Mobile Number</h4>
              <input
                type="text"
                placeholder="Enter your email ID"
              />
            </label>
            <label className='fpass'>
              <Link to="/login">Login ?</Link>
            </label>
          </div>
          <button type="submit"><Link to="/otp" style={{color: 'white'}}>Submit</Link></button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default PasswordRecovery;
