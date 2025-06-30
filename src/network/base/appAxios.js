import axios from 'axios';

const environmentUrl = import.meta.env.VITE_APP_BASE_URL;

const getToken = () => {
  return localStorage.Authorization;
};

export const appAxios = axios.create({
  baseURL: environmentUrl,
  timeout: 300000,
  headers: { Authorization: 'Bearer ' + getToken() },
});
