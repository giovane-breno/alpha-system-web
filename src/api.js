import axios from "axios";

var token = '';

try {
  token = sessionStorage.getItem('token');
} catch (error) {
  console.log(token);
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  },
});


export default api;
