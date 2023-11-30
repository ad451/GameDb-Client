import { IGame } from '../../models/game';
import { FETCH_GAMES } from '../actions/listgameActions';

export interface listGameState {
  games: Array<IGame>;
  loading: boolean;
  error: null | Error;
}

export interface IlistGameAction {
  type: string;
  payload: listGameState;
}

export const initialListGameState: listGameState = {
  games: [],
  loading: true,
  error: null
};
export const nolistGameState: listGameState = {
    games: JSON.parse(window.localStorage.getItem('listgames') || "[]") || [],
    loading: true,
    error: null
  };

export const listgameReducer = (
  state: listGameState = initialListGameState,
  action: IlistGameAction
) => {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        games: action.payload.games,
        loading: action.payload.loading,
        error: action.payload.error
      };
    default:
      return state;
  }
};
