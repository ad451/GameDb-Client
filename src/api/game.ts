import { fetchGamesAction } from "../redux/actions/gameActions";
import { noGameState } from "../redux/reducer/gameReducer";
import { AppDispatch } from "../redux/store";
import axios from "axios";

/**
 * 
 * @param dispatch the redux util that will dispatch the `FETCH_GAMES` action
 */

export const fetchGames = async (dispatch : AppDispatch ,  pageNumber : number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/game?pageNumber=${pageNumber}`);

      const data = response.data;
      dispatch(
        fetchGamesAction({ games: data.games, n_pages: data.pages, error: null, loading: false })
      );
    } catch (error) {
      console.error('Error fetching games:', error);
      dispatch(fetchGamesAction(noGameState));
    }
}

export const fetchGamesById = async ( gameId : string | undefined) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/game/${gameId}`);

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    
  }
}