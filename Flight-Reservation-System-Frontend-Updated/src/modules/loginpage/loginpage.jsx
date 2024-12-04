import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleServiceSingleton from "../../services/google-service-singleton";
import { useHistory } from "react-router-dom";
import { useUserInfoSession } from "../../components/header/user-context";
import './loginpage.css'; // Import the CSS file for styling

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUserInfoSession } = useUserInfoSession();
  const history = useHistory();

  // Google login function
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GoogleServiceSingleton.getUserInfo(tokenResponse.access_token).then(
        (userInfo) => {
            console.log("User Info from Google:", userInfo);
          updateUserInfoSession(userInfo);
          history.push("/"); // Navigate to the homepage after successful login
        }
      );
    },
  });

  // Handle sign up or login with username and password
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Validate username and password against the "users.json"
      fetch("./users.json") // path to the JSON file containing user data
        .then((response) => response.json())
        .then((users) => {
          // Find user from users array
          const user = users.find((user) => user.username === username);
          if (user && user.password === password) {
            // Store additional info such as given_name
            const userInfo = {
              admin: user.admin || 0, // Include admin flag (default to 0 if not present)
              email: user.email,
              family_name: user.family_name || "", // Add family name if present
              given_name: user.given_name || "", // Add given name if present
              id: user.userId, // Map userId to id
              name: `${user.given_name || ""} ${user.family_name || ""}`.trim(), // Concatenate name fields
              picture: user.picture || "", // Default to empty string if no picture
              userId: user.userId, // Keep userId as is
              verified_email: user.verified_email || false // Def
            };
            updateUserInfoSession(userInfo); // Save the session data
            setUsername(""); // Clear the username field
            setPassword(""); // Clear the password field
            history.push("/"); // Redirect to homepage after successful login/signup
          } else {
            setError("Invalid username or password.");
          }
        })
        .catch((error) => {
          console.error("Error loading users data:", error);
          setError("An error occurred while validating credentials.");
        });
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Skylink Airways</h2>
        <h3>Please Sign In or Sign Up</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              autoComplete="off"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              autoComplete="off"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Sign In / Sign Up
          </button>
        </form>
        <div className="divider">OR</div>
        <button className="google-btn" onClick={() => loginWithGoogle()}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;