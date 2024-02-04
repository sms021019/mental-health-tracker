import React, { useState } from "react";
import "./contactform.css";
import emailjs from "emailjs-com";
const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: email,
      from_email: email,
      to_name: "HACK2024",
      message: message,
    };
    emailjs
      .send(
        "service_adjpacn",
        "template_le0vbdc",
        templateParams,
        "RMvkj8c_0s5u5BX45"
      )
      .then(
        (result) => {
          alert("message successfully sent");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="contact-form">
      <span className="contact_title">Have Any Questions?</span>
      <div className="contact_subtitle">
        Just enter your email and we will get back with you soon!
      </div>
      <form onSubmit={handleSendEmail}>
        <input
          type="email"
          id="email"
          value={email}
          name="email"
          required={true}
          placeholder="Enter your email, so that we can get back to you!"
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          id="message"
          name="message"
          value={message}
          required={true}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        ></textarea>
        <button className="contact_button">
          <span className="text">Send</span>
          <i className="arrow bi bi-send"></i>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
