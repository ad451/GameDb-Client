import { User } from '../../models/user';
import { SET_USER } from '../actions/userActions';

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  error: null | Error;
}

export interface IUserAction {
  type: string;
  payload: UserState;
}

export const loggedOutUserState: UserState = {
  user: {
    name: window.localStorage.getItem('name') ?? '',
    email: '',
    userName: ''
  },
  isLoggedIn: window.localStorage.getItem('name') ? true : false,
  error: null
};

export const userReducer = (
  state: UserState = loggedOutUserState,
  action: IUserAction
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
        error: action.payload.error
      };
    default:
      return state;
  }
};
