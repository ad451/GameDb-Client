import { listGameState } from "../reducer/listgameReducer";

export const FETCH_GAMES = 'FETCH_GAMES';

export const fetchGamesAction = (payload: listGameState) => ({
  type: FETCH_GAMES,
  payload: payload
});


