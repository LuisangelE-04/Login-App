import React from "react";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const { username } = location.state || { username: '' };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>
        You have successfully logged in.
      </p>
    </div>
  );
};

export default Welcome;