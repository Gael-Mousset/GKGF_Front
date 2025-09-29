import axios, { type AxiosInstance } from "axios";

export function useApi() {
  const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  return api;
}
