import axios from "axios";

const API = process.env.REACT_APP_API || "";

export const register = async (user) =>
  await axios.post(`${API}/auth/register`, user);

export const login = async (user) =>
  await axios.post(`${API}/auth/login`, user);

export const profile = async (token) =>
  await axios.get(`${API}/auth/profile`, {
    headers: {
      Authorization: token,
    },
  });
