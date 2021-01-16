import axios from 'axios';
import qs from 'qs'
import router from '../router'
import { Message } from 'element-ui';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      switch (response.data.code) {
        case -3: case 401:case 1005:
          localStorage.clear()
          router.push('/')
          Message.warning({message: response.data.message})
          break
        default:
          return response.data;
      }
    } else {
      Message.warning({message: '服务器内部错误'})
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export function httpGet(url, params) {
  // axios.defaults.timeout = 6000;
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers['access_token'] = token
  }
  return new Promise((resolve, reject) => {
    axios.get(url, {params})
      .then(res => {
        resolve(res)
      }), error => {
        reject(error)
      }
  })
}

export function httpPost(url, params) {
  // axios.defaults.timeout = 6000;
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  // axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers['access_token'] = token
  }
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(res => {
        resolve(res)
      }), error => {
        reject(error)
      }
  })
}

export function httpPostJSON(url, params) {
  axios.defaults.timeout = 6000;
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers['access_token'] = token
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      }), error => {
        reject(error)
      }
  })
}

export function httpUpload(url, params) {
  axios.defaults.timeout = 6000;
  axios.defaults.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers['access_token'] = token
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      }), error => {
        reject(error)
      }
  })
}