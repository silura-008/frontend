
// import axios from 'axios';

// const baseURL = 'http://localhost:8000';

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     accept: 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('access_token');
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refresh_token');
//         const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
//           refresh: refreshToken
//         });

//         const { access } = response.data;
//         localStorage.setItem('access_token', access);

//         // Retry the original request with the new token
//         originalRequest.headers['Authorization'] = `Bearer ${access}`;
//         return axios(originalRequest);
//       } catch (error) {
//         // If refresh token fails, logout user
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;






// // import axios from "axios";
// // import jwt_decode from "jwt-decode"

// // const baseURL = 'http://127.0.0.1:8000/api'

// // let authtokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null ;

// // const axiosInstance = axios.create({
// //     baseURL,
// //     headers:{Authorization: `Bearer ${authtokens?.access}`}
// // })

// // export default axiosInstance   

