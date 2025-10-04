import axios, { type AxiosInstance } from "axios";

export function useApi() {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL_URL,
    withCredentials: true,
  });

  return api;
}
