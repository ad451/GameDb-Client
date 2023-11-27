import { IGame } from '../../models/game';
import { FETCH_GAMES } from '../actions/gameActions';

export interface GameState {
  games: Array<IGame>;
  loading: boolean;
  error: null | Error;
}

export const noGameState: GameState = {
  games: JSON.parse(window.localStorage.getItem('games') || "[]") || [],
  loading: true,
  error: null
};

export interface IGameAction {
  type: string;
  payload: GameState;
}


export const gameReducer = (state: GameState = noGameState, action: IGameAction) => {
  switch (action.type) {
    case FETCH_GAMES:
      window.localStorage.setItem('games', JSON.stringify(action.payload.games))
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
