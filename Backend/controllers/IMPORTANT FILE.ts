import React, { useState } from "react";

const RegisterForm = () => {
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // what this line of code do is to prevent  the event from bubbling to the DOM when the form is submitted.
    const name = event.target.name.value;
    const phoneNumber = event.target.phoneNumber.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse({ success: true, message: data.message });
      } else {
        setResponse({ success: false, message: data.message });
      }
    } catch (error) {
      setResponse({ success: false, message: "An error occurred" });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {response && (
        <div>
          {response.success ? (
            <p>{response.message}</p>
          ) : (
            <p style={{ color: "red" }}>{response.message}</p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;