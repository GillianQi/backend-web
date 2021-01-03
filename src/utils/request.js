import axios from 'axios';
// import qs from 'qs'

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
      return response.data;
    } else {
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
  // axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
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
  axios.defaults.timeout = 6000;
  // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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

// export function httpPost(url, params) {
//   axios.defaults.timeout = 6000;
//   // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//   // axios.defaults.headers['Content-Type'] = 'applcation/json;charset=UTF-8';
//   const token = localStorage.getItem('token')
//   if (token) {
//     axios.defaults.headers['access_token'] = token
//   }
//   return new Promise((resolve, reject) => {
//     axios.post(url, qs.stringify(params))
//       .then(res => {
//         resolve(res)
//       }), error => {
//         reject(error)
//       }
//   })
// }