import axios from 'axios';
import { store } from '../Redux/Store';
import { clearToken } from '../Redux/features/authSlice';
import { toast } from 'sonner';

const https = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:IAuUhB5G",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


https.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(`[Request Error]`, error);
    return Promise.reject(error);
  }
);


https.interceptors.response.use(
  (response) => {
    console.log(`[Response]`, response);
    return response;
  },
  (error) => {
    if (error.status == 401) {
      toast.error('Token Expired, Please Login again!')
      store.dispatch(clearToken())
    }
    if (error.response) {
      console.error(`[Response Error]`, error.response);
    } else if (error.request) {
      console.error(`[No Response]`, error.request);
    } else {
      console.error(`[Error]`, error.message);
    }
    return Promise.reject(error);
  }
);

export default https;
