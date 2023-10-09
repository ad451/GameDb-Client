export const FETCH_GAMES = 'FETCH_GAMES';

export const fetchGamesAction = (payload: any[]) => ({
  type: FETCH_GAMES,
  payload: payload
});
