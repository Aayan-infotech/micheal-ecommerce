import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./contactus.css";

function ContactUs() {

  const handleSubmit = (event) =>{
    event.preventDefault();
    toast.success('Thank you! Your form submission has been received.');
    event.target.reset();

  }
  return (
    <div className="contactus">
      <div className="contactus-container">
        <div className="contactus-banner">
          <h1>Get in Touch</h1>
          <div className="contactus-doc">
            <p>contact@technologycal</p>
            <p>(011) 6543 8974 210</p>
          </div>
        </div>
        <div className="forms">
          <form className="contactus-form" onSubmit={handleSubmit}>
            <div className="con-form">
              <div className="first-inputs comm">
                <label>
                  <h4>Full Name *</h4>
                  <input type="text" placeholder="john doe" required/>
                </label>
                <label>
                  <h4>Your Email *</h4>
                  <input type="text" placeholder="example@yourmail.com" required/>
                </label>
              </div>
              <div className="second-inputs comm">
                <label>
                  <h4>On Behalf of *</h4>
                  <input type="text" placeholder="your company name here" required/>
                </label>
                <label>
                  <h4>Subject *</h4>
                  <input type="text" placeholder="How can we help?" required/>
                </label>
              </div>
              <div className="third-inputs comm">
                <label>
                  <h4>Message *</h4>
                  <textarea
                    name=""
                    id=""
                    placeholder="Hello there, I would like to talk about how to..."
                    rows="6"
                    cols="70"
                    required
                  ></textarea>
                </label>
              </div>
              <div className="button-wrapper">
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;
