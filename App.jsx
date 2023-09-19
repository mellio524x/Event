import React, { useState } from "react";
import "./App.css";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function App() {
  const [values, setValues] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const validateAndSubmitForm = (e) => {
    e.preventDefault();

    const errors = {};

    if (!isEmail(values.email)) {
      errors.email = "Invalid email";
      setErrors(errors);
    } else {
      // Send the email to the server for verification
      fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      })
        .then((response) => {
          if (response.ok) {
            // Email sent successfully
            alert("Verification email sent! Check your inbox.");
          } else {
            // Email sending failed
            alert("Failed to send verification email. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while sending the email.");
        });
    }
  };

  const setEmail = (e) => {
    setValues((values) => ({ ...values, email: e.target.value }));
  };

  return (
    <form onSubmit={validateAndSubmitForm}>
      <h2>Register for the event App</h2>
      <span>Enter Email: </span>
      <input type="text" id="userEmail" value={values.email} onChange={setEmail} />{" "}
      <input type="submit" />
      <br />
      {errors.email && (
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {errors.email}
        </span>
      )}
    </form>
  );
}

// Path: event-app/src/App.test.js  