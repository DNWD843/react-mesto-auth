import { BASE_URL } from './constants';

export const register = (email, password) => {

  console.log(email, password);

  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {

      console.log(res);

      try {
        if(res.status === 200) {
          return res.json();
        }
      } catch (e) {
        return (e);
      }
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
