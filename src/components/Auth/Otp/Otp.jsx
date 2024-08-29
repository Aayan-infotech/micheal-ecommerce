import React from 'react';
import { Link } from 'react-router-dom';
import "./otp.css";

function Otp() {
  return (
    <div className="Otp">
    <div className="container pass-contain">
      <h1 className="sign">OTP</h1>
      <p className='pass'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <div className="form">
        <form className="pass-form">
          <div className="o-form">
            <label>
              <h4>OTP</h4>
              <div className="otp-input">
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </div>
            </label>
            <label className='fpass'>
              <a href="##">Resend OTP</a>
            </label>
          </div>
          <button type="submit"><Link to="/passwordreset" style={{color: 'white'}}>Submit</Link></button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Otp;
