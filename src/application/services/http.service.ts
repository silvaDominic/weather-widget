import axios from 'axios';

const BASE_URL = "http://localhost:5173"; // Consider using environmental.const file for this

export const HttpService = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 25000,
});
