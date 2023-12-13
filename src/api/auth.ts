import { toast } from 'react-toastify';

import axios from 'axios';

import { setUserAction } from '../redux/actions/userActions';
import { AppDispatch } from '../redux/store';

/**
 * A helper function that dispatches the `SET_USER` action which
 * updates the user state of the redux store after the user is logged in
 * @param name of the user
 * @param email of the user
 * @param userName of the user
 * @param dispatch the redux util that will dispatch the `SET_USER` action
 */
const setUserState = (
  name: string,
  email: string,
  userName: string,
  dispatch: AppDispatch
) => {
  dispatch(
    setUserAction({
      user: {
        name,
        email,
        userName
      },
      isLoggedIn: true,
      error: null
    })
  );
};

/**
 * Handles API call for logging in users who have registered/logged in via Google OAuth.
 * @param token generated by the oAuth client
 * @param dispatch the redux util that will dispatch the `SET_USER` action
 * @returns `true` if user is logged in successfully and `false` otherwise
 */
export const handleGoogleLogin = async (
  token: string,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login/google`,
      {
        credential: token
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      const data = response.data;
      window.localStorage.setItem('accessToken', data['token']);
      window.localStorage.setItem('name', data['name']);
      window.localStorage.setItem('userName', data['userName']);
      setUserState(data['name'], data['email'], data['userName'], dispatch);
      toast('Success!');
    }
    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
    return false;
  }
};

/**
 * Handles the API call for logging in users via email and password; updates the redux store
 * if a user is logged in sucessfully.
 * @param email of the user
 * @param password of the user
 * @param dispatch the redux util that will dispatch the `SET_USER` action
 * @returns `true` if user is logged in successfully and `false` otherwise
 */
export const handleEmailPasswordLogin = async (
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login/`,
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      const data = response.data;
      window.localStorage.setItem('accessToken', data['token']);
      window.localStorage.setItem('name', data['name']);
      window.localStorage.setItem('userName', data['userName']);
      setUserState(data['name'], data['email'], data['userName'], dispatch);
      toast('Success!');
    }

    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
    return false;
  }
};

/**
 * Handles the API call for signing up users via email and password; updates the redux store
 * if a user is signed up sucessfully.
 * @param name of the user
 * @param email of the user
 * @param password of the user
 * @param dispatch the redux util that will dispatch the `SET_USER` action
 * @returns `true` if user is signed up successfully and `false` otherwise
 */
export const handleEmailPasswordSignup = async (
  name: string,
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/`,
      {
        name,
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      const data = response.data;
      window.localStorage.setItem('accessToken', data['token']);
      window.localStorage.setItem('name', data['name']);
      window.localStorage.setItem('userName', data['userName']);
      setUserState(data['name'], data['email'], data['userName'], dispatch);
      toast('Success!');
    }
    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
    return false;
  }
};
