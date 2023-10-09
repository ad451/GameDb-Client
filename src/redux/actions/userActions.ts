import { UserState } from '../reducer/userReducer';

export const SET_USER = 'SET_USER';

export const setUserAction = (payload: UserState) => ({
  type: SET_USER,
  payload: payload
});
