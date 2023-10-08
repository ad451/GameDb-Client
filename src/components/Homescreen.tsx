import React, { useEffect, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/HomeScreen.css";
import { fetchGamesAction } from "../redux/actions/gameActions";
import Game from "./Game";
const HomeScreen: FunctionComponent = () => {
  const game_state = useSelector((state : any) => state.gamereducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/game");
        const data = await response.json();
        dispatch(fetchGamesAction(data.games));
      } catch (error) {
        console.error("Error fetching games:", error);
        dispatch(fetchGamesAction([]));
      }
    };
    if (game_state.loading) {
        fetchGames();
      }
    }, [dispatch, game_state.loading, game_state.games]);

  return (
    <div className="homescreen">
      <h1 className="homescreen__title">All Games</h1>
      {game_state.loading ? (
        <p>Loading...</p>
      ) : game_state.error ? (
        <p>Error: {game_state.error.message}</p>
      ) : (
        <div className="homescreen__games">  
          {game_state.games.map((game : any) => (
            <Game
            key={game._id}
            gameId={game._id}
            name={game.name}
            release={game.released}
            image={game.background_image}
            ratings={game.ratings}
            rating={game.rating}
            parent={game.parent_platforms}
            genres={game.genres}
            metacritic={game.metacritic}
            playtime={game.playtime}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
