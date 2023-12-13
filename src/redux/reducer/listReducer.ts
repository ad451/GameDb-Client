import { IList } from '../../models/list';
import { FETCH_LISTS } from '../actions/listActions';

export interface ListState {
  lists: Array<IList>;
  loading: boolean;
  error: null | Error;
}

export const noListState: ListState = {
  lists:  [],
  loading: true,
  error: null
};

export interface ListAction {
  type: string;
  payload: ListState;
}


export const listReducer = (state: ListState = noListState, action: ListAction) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        lists: action.payload.lists,
        loading: action.payload.loading,
        error: action.payload.error
      };
   
    default:
      return state;
  }
};
