import { BASE_URL } from './constants';
import { setToken } from './token';

export const register = (password, email) => {

  console.log(email, password);

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        setToken(data.token);
        return data;
      } else { return; }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
