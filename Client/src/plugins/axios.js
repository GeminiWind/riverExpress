import { SERVER_URL } from '../config/app'

import axios from 'axios'

export default {
  install: function (Vue, baseURL = SERVER_URL) {
    window.axios = axios.create({
      baseURL: baseURL,
      timeout: 20000,
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    window.axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      // Noti error here
      window.swal.error('Whoops', 'Our Server Error... ');
      return Promise.reject(error);
    });
    Object.defineProperty(Vue.prototype, '$http', { value: window.axios })
  }
}
