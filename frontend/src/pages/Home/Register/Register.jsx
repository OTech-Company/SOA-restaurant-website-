import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './register.module.css';  

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simulate an API request to register user
    try {
      // You can add your registration logic here
      if (name && email && password && location && gender) {
        history.push("/dashboard");
      } else {
        setError("Please fill in all fields.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img 
          src="file:///C:/Users/lenovo/Downloads/restoran-1.0.0/restoran-1.0.0/img/video.jpg" 
          alt="Restaurant" 
          className="register-image"
        />
      </div>
      <div className="register-right">
        <div className="register-content">
          <h2>Register</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleRegister}>
            <div>
              <label>Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Your Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Gender:</label>
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  /> 
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  /> 
                  Female
                </label>
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
