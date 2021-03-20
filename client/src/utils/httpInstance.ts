import axios, { AxiosError, AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 30000,
});

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response?.data?.error);
});

export default instance;
