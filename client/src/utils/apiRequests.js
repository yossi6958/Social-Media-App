import axios from "axios";

export const apiGetWithToken = async (endpoint, token) => {
  const URL = import.meta.env.VITE_URL;
  const { data } = await axios.get(`${URL}/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const apiPostWithToken = async (
  endpoint,
  token,
  body,
  customHeaders = {}
) => {
  const URL = import.meta.env.VITE_URL;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const headers = { ...defaultHeaders, ...customHeaders };

  const { data } = await axios.post(`${URL}/${endpoint}`, body, { headers });
  return data;
};

export const apiPost = async (endpoint, body, customHeaders = {}) => {
  const URL = import.meta.env.VITE_URL;
  const defaultHeaders = { "Content-Type": "application/json" };
  const headers = { ...defaultHeaders, ...customHeaders };

  const { data } = await axios.post(`${URL}/${endpoint}`, body, { headers });
  return data;
};

export const apiPatchWithToken = async (
  endpoint,
  token,
  customHeaders = {}
) => {
  const URL = import.meta.env.VITE_URL;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const headers = { ...defaultHeaders, ...customHeaders };

  const { data } = await axios.patch(`${URL}/${endpoint}`, null, { headers });
  return data;
};
