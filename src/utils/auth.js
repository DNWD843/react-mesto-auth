import * as PATH_TO_ from './endpoints';

const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}${PATH_TO_.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}${PATH_TO_.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        return data;
      } else { return; }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}${PATH_TO_.USER}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      //console.log(res.status, res);
      return res.json()
    })
    .catch((err) => console.log(err));
}
