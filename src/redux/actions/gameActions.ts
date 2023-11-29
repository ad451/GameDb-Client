import { GameState } from "../reducer/gameReducer";

export const FETCH_GAMES = 'FETCH_GAMES';

export const fetchGamesAction = (payload: GameState) => ({
  type: FETCH_GAMES,
  payload: payload
});


