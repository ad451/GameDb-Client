import { User } from '../../models/user';
import { SET_USER } from '../actions/userActions';

export interface UserState {
  user: User
  isLoggedIn: boolean;
  error: null | Error;
}

export interface IUserAction {
  type: string,
  payload: User
}

const userState: UserState = {
  user: {name: "", email: "", userName: ""},
  isLoggedIn: false,
  error: null
};

export const userReducer = (state: UserState = userState, action: IUserAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null
      };
    default:
      return state;
  }
};

