
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosAuthInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer`,
    accept: 'application/json',
  },
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers ['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    //handling refresh
    const refreshToken = localStorage.getItem('refresh_token');
    const originalRequest = error.config;
    if (error.response.status === 401 && refreshToken &&!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${baseURL}/api/auth/jwt/refresh/`, {
          refresh: refreshToken
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Retry the original request with the new token

        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
