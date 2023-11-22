import axios from "axios";

// var token = sessionStorage.getItem("token") || localStorage.getItem("token");

const api = axios.create({
//   baseURL: 'https://api.cervet.com.br/api/',
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer 6bVks4c2hXDcvCNOTQj7usV1iEamIPPFdGRp0wqo535a35be`,
    Accept: 'application/json'
  },
});


export default api;
