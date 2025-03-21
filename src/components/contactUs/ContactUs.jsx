import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./contactus.css";
import validator from "validator";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    onBehalfOf: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formData) => {
    const newErrors = { ...errors };

    if ("name" in fieldValues)
      newErrors.name = fieldValues.name ? "" : "Please fill the name";

    if ("email" in fieldValues) {
      const value = fieldValues.email.trim();
      if (!value) {
        newErrors.email = "Please fill the email or mobile number";
      } else if (validator.isEmail(value)) {
        newErrors.email = "";
      } else if (/^\d{10}$/.test(value)) {
        newErrors.email = "";
      } else {
        newErrors.email = "Please enter a valid email or a 10-digit mobile number";
      }
    }
    if ("onBehalfOf" in fieldValues)
      newErrors.onBehalfOf = fieldValues.onBehalfOf ? "" : "Please fill the company name";

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
          name: formData.name,
          onBehalfOf: formData.onBehalfOf,
          subject: formData.subject,
          message: formData.message,
        };
        if (validator.isEmail(formData.email)) {
          dataToSubmit.email = formData.email;
        } else {
          dataToSubmit.mobileNumber = formData.email;
        }
        const response = await axios.post(
          "http://3.223.253.106:3129/api/contact/contactUs",
          dataToSubmit
        );
        toast.success(response?.data?.message || "Message sent successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData({
          name: "",
          email: "",
          onBehalfOf: "",
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
              <p>mike.export@yahoo.com</p>
              <p>+46 73 507 72 76</p>
            </div>
          </div>
          <div className="forms">
            <form className="contactus-form" onSubmit={handleSubmit}>
              <div className="con-form">
                <div className="first-inputs comm">
                  <label htmlFor="name">
                    <h4>Full Name *</h4>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="john doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <p className="error text-start">{errors.name}</p>}
                  </label>
                  <label htmlFor="email">
                    <h4>Your Email or Mobile *</h4>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="example@yourmail.com or 1234567890"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </label>
                </div>
                <div className="second-inputs comm">
                  <label htmlFor="onBehalfOf">
                    <h4>On Behalf of *</h4>
                    <input
                      type="text"
                      id="onBehalfOf"
                      name="onBehalfOf"
                      placeholder="your company name here"
                      value={formData.onBehalfOf}
                      onChange={handleChange}
                      required
                    />
                    {errors.onBehalfOf && <p className="error">{errors.onBehalfOf}</p>}
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
