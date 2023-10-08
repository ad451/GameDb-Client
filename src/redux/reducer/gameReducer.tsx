import { FETCH_GAMES } from "../actions/gameActions";
interface GameState {
    games: any[]; 
    loading: boolean;
    error: null | Error;
  }
  
  const gameState: GameState = {
    games: [],
    loading: true,
    error: null,
  };
  
  const gamereducer = (state: GameState = gameState, action: any) => {
    switch (action.type) {
      case FETCH_GAMES:
        return {
          ...state,
          games: action.payload,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  

  export {gamereducer, gameState};