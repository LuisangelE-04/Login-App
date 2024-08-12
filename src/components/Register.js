import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://10.0.0.149:5000/register', {username, password})
      console.log(response.data);
      setMessage(response.data.msg);
    }
    catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
      else {
        setMessage('An error occured. Try Again');
        console.error('Error making new account');
      }
    }
  };

  const toggleForm = () => {
    setIsUser(!isUser);
  };

  return (
    <div>
      {isUser ? (
        <Login />
      ) : (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>

          {message && <p>{ message }</p>}

          <p>
            Already have an account? <button onClick={toggleForm}>Login here!</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;