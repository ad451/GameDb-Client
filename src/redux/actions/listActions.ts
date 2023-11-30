import { ListState } from "../reducer/listReducer";
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LISTS_ID = 'FETCH_LISTS_ID'

export const fetchListsAction = (payload: ListState) => ({
  type: FETCH_LISTS,
  payload: payload
});


export const fetchListGames = (payload: ListState) => ({
    type: FETCH_LISTS_ID,
    payload: payload
  });