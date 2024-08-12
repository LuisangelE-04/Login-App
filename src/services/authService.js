import axios from 'axios';

const API_URL = 'http://localhost:5000';

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, {username, password});
};

export default {
  login,
};