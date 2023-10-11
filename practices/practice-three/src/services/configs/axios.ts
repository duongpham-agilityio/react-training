import axios, { AxiosError } from 'axios';

export type IAxiosError = unknown & AxiosError;

// Create new axios with baseURL
export const apiRequest = axios.create({
  baseURL: process.env.VITE_API,
});
