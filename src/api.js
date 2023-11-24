import axios from "axios";

var token = '';

if (typeof window !== 'undefined') {
  token = sessionStorage.getItem('token');
}

const api = axios.create({
  baseURL: 'http://26.149.249.59:8000/api/',
  // baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  },
});


export default api;
