import axios from "axios";

const API = process.env.REACT_APP_API || "";

export const getProducts = async () => axios.get(`${API}/products`);
