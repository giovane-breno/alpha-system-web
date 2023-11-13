import axios from "axios";

// var token = sessionStorage.getItem("token") || localStorage.getItem("token");

const api = axios.create({
//   baseURL: 'https://api.cervet.com.br/api/',
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer qGSxng6ZWV2P94n82ytb18H9jeQAPWHSbZ3YZEre53f15b72`,
    Accept: 'application/json'
  },
});


export default api;
