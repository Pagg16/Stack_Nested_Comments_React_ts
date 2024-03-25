import axios from "axios";

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export function makeRequest(url: string, options?: Record<string, unknown>) {
  return baseAxios(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data.message ?? "Error"));
}
