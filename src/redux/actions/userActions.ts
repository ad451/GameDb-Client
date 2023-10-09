import { User } from "../../models/user";

export const SET_USER = "SET_USER";


export const setUserAction = (payload : User) => ({
    type: SET_USER,
    payload : payload
  });