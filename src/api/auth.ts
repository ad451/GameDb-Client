import axios from 'axios';

export const handleGoogleLogin = async (token: string) => {
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
    alert('Success!');
  }
};

export const handleEmailPasswordLogin = async (
  email: string,
  password: string
) => {
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
    alert('Success!');
  }
};
