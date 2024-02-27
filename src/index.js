import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data);
    console.log(err.config)
    if (err.response.data.message === "Token Expired") {
      // Token expired, send a request to refresh the token
      return axios
        .get("http://localhost:4000/refreshToken", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          // Once token is refreshed, you might want to retry the original request
          // You can do that by returning the original request
          return axios(err.config);
        })
        .catch((refreshErr) => {
          // Handle refresh token error
          return Promise.reject(refreshErr);
        });
    } else {
      // For other errors, just reject the promise
      return Promise.reject(err);
    }
  }
);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
