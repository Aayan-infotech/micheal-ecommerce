import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./contactus.css";
import validator from "validator";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrMobile: "",
    companyName: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formData) => {
    const newErrors = { ...errors };

    if ("fullName" in fieldValues)
      newErrors.fullName = fieldValues.fullName ? "" : "Please fill the name";

    if ("emailOrMobile" in fieldValues) {
      const value = fieldValues.emailOrMobile.trim();
      if (!value) {
        newErrors.emailOrMobile = "Please fill the email or mobile number";
      } else if (validator.isEmail(value)) {
        newErrors.emailOrMobile = "";
      } else if (/^\d{10}$/.test(value)) {
        newErrors.emailOrMobile = "";
      } else {
        newErrors.emailOrMobile = "Please enter a valid email or a 10-digit mobile number";
      }
    }
    if ("companyName" in fieldValues)
      newErrors.companyName = fieldValues.companyName ? "" : "Please fill the company name";

    if ("subject" in fieldValues)
      newErrors.subject = fieldValues.subject ? "" : "Please fill the subject";

    if ("message" in fieldValues)
      newErrors.message = fieldValues.message ? "" : "Please enter a message";

    setErrors(newErrors);
    return Object.values(newErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let dataToSubmit = {
          fullName: formData.fullName,
          companyName: formData.companyName,
          subject: formData.subject,
          message: formData.message,
        };
        if (validator.isEmail(formData.emailOrMobile)) {
          dataToSubmit.email = formData.emailOrMobile;
        } else {
          dataToSubmit.mobileNumber = formData.emailOrMobile;
        }
        const response = await axios.post(
          "http://3.111.163.2:3129/api/address/add",
          dataToSubmit
        );
        toast.success(response?.data?.message || "Message sent successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData({
          fullName: "",
          emailOrMobile: "",
          companyName: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data?.message || "An error occurred.";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("Network error or server is down. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Error sending message:", error);
        }
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
                  <label htmlFor="fullName">
                    <h4>Full Name *</h4>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="john doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <p className="error text-start">{errors.fullName}</p>}
                  </label>
                  <label htmlFor="emailOrMobile">
                    <h4>Your Email or Mobile *</h4>
                    <input
                      type="text"
                      id="emailOrMobile"
                      name="emailOrMobile"
                      placeholder="example@yourmail.com or 1234567890"
                      value={formData.emailOrMobile}
                      onChange={handleChange}
                      required
                    />
                    {errors.emailOrMobile && <p className="error">{errors.emailOrMobile}</p>}
                  </label>
                </div>
                <div className="second-inputs comm">
                  <label htmlFor="companyName">
                    <h4>On Behalf of *</h4>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="your company name here"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                    {errors.companyName && <p className="error">{errors.companyName}</p>}
                  </label>
                  <label htmlFor="subject">
                    <h4>Subject *</h4>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    {errors.subject && <p className="error">{errors.subject}</p>}
                  </label>
                </div>
                <div className="third-inputs comm">
                  <label htmlFor="message">
                    <h4>Message *</h4>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Hello there, I would like to talk about how to..."
                      rows="6"
                      cols="70"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {errors.message && <p className="error">{errors.message}</p>}
                  </label>
                </div>
                <div className="button-wrapper">
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
