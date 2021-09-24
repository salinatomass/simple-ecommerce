import axios from "axios";

const API = process.env.REACT_APP_API || "";

const axiosInstance = axios.create({ baseURL: `${API}` });
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

export const getProducts = async () => await axios.get(`${API}/products`);

export const getProduct = async (id) =>
  await axios.get(`${API}/products/${id}`);

export const saveProduct = async (newProduct) =>
  await axiosInstance.post(`/products`, newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = async (id) =>
  await axiosInstance.delete(`/products/${id}`);

export const updateProduct = async (id, product) =>
  await axiosInstance.put(`/products/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
