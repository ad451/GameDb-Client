import { toast } from 'react-toastify';

import axios, { AxiosError } from 'axios';

export const handleGoogleLogin = async (token: string) => {
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
      window.localStorage.setItem('accessToken', response.data['token']);
      toast('Success!');
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
  }
};

export const handleEmailPasswordLogin = async (
  email: string,
  password: string
) => {
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
      window.localStorage.setItem('accessToken', response.data['token']);
      toast('Success!');
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
  }
};

export const handleEmailPasswordSignup = async (
  name: string,
  email: string,
  password: string
) => {
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
      window.localStorage.setItem('accessToken', response.data['token']);
      toast('Success!');
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast(e.response?.data.message);
    } else {
      console.error(e);
    }
  }
};