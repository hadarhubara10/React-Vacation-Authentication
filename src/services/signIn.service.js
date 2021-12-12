import axios from 'axios';
export const signInGetToken = (email, password) => {
  const URL = `http://localhost:3002/signin`;
  return axios.post(URL, { email, password });
};
export const checkToken = (id, token) => {
  console.log(id);
  const URL = `http://localhost:3002/600/users/${id}`;
  return axios.get(URL, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const signupService = (firstName, lastName, email, password) => {
  const URL = `http://localhost:3002/signup`;
  return axios.post(URL, { firstName, lastName, email, password });
};
