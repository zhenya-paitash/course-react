import axios from "axios";
import {
  AUTH_LOGOUT,
  AUTH_SUCCESS
} from "./actionTypes";


export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDam6nRfCh9RxpIcWjjDMU3OOSzpzolK0A';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDam6nRfCh9RxpIcWjjDMU3OOSzpzolK0A';
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('uerId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSeccess(data.idToken));

    dispatch(authLogout(data.expiresIn));

  };
}

export function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('uerId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
}

export function authSeccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
