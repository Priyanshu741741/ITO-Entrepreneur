// src/services/api.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { supabase } from '../utils/supabaseClient';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Get session from Supabase
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    // If session exists, add token to headers
    if (session) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      const { status } = error.response;

      // Handle authentication errors
      if (status === 401 || status === 403) {
        console.error('Authentication error:', error);
        // You could trigger a logout or redirect to login here
      }

      // Handle server errors
      if (status >= 500) {
        console.error('Server error:', error);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error);
    } else {
      // Something else happened while setting up the request
      console.error('Request error:', error);
    }

    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(`GET request to ${url} failed:`, axiosError);
    throw axiosError;
  }
};

// Generic POST request
export const post = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(`POST request to ${url} failed:`, axiosError);
    throw axiosError;
  }
};

// Generic PUT request
export const put = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(`PUT request to ${url} failed:`, axiosError);
    throw axiosError;
  }
};

// Generic DELETE request
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(`DELETE request to ${url} failed:`, axiosError);
    throw axiosError;
  }
};

// Export the axios instance for more complex use cases
export default api;