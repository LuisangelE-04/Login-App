import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Register from './Register';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.0.0.149:5000/login', {username, password})
      console.log(response.data);
      setMessage('Login successful!');
      navigate('/welcome', { state: { username } });
    }
    catch (error) {
      if(error.response) {
        setMessage(error.response.data.msg);
      }
      else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      {isRegister ? (
        <Register />
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
            <input
              type='password'
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
              placeholder='Password'
              required
            />

            <button type='submit'>Login</button>
          </form>

          {message && <p>{ message }</p>}

          <p>
            New User? <button onClick={toggleForm}>Register here!</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;