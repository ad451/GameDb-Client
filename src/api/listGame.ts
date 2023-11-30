import axios from 'axios';

import { fetchGamesAction } from '../redux/actions/listgameActions';
import { nolistGameState } from '../redux/reducer/listgameReducer';
import { AppDispatch } from '../redux/store';

export const fetchListGames = async (
  token: string,
  dispatch: AppDispatch,
  ListId: string,
  gameIds: Array<string>
) => {
  try {
    const gamePromises = await axios.get(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/api/v1/list/${ListId}/items?gameIds=${gameIds.join(',')}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    const allGames = gamePromises.data.data;
    return allGames;
  } catch (error) {
    console.error('Error fetching list games:', error);
  }
};
