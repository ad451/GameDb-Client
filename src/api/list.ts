import { fetchListsAction } from "../redux/actions/listActions";
import { ListState } from "../redux/reducer/listReducer";
import { AppDispatch } from "../redux/store";
import axios from "axios";
import { noListState } from "../redux/reducer/listReducer";
import { fetchGames } from "./game";
import { fetchGamesAction } from "../redux/actions/gameActions";
import { noGameState } from "../redux/reducer/gameReducer";

/**
 * 
 * @param dispatch the redux util that will dispatch the `FETCH_GAMES` action
 */
export const fetchLists = async (dispatch : AppDispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/list');
      const data = response.data;
      dispatch(
        fetchListsAction({ lists: data, error: null, loading: false })
      );
    } catch (error) {
      console.error('Error fetching games:', error);
      dispatch(fetchListsAction(noListState));
    }
}


  
  
  
  
  
  

