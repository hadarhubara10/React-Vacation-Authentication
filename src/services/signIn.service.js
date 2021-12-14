import axios from 'axios';
export const signInGetToken = (email, password) => {
  const URL = `http://localhost:3002/user/signin`;
  return axios.post(URL, { email, password });
};
export const checkToken = (token) => {
  const URL = `http://localhost:3002/user/checkToken`;
  return axios.post(URL, null, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const signupService = (firstName, lastName, email, password) => {
  const URL = `http://localhost:3002/user`;
  return axios.post(URL, { firstName, lastName, email, password });
};

export const checkGoogleToken = (token) => {
  return axios.get('http://localhost:3002/user/verifyTokenGoogle', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
