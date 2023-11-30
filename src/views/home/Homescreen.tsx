import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { fetchGames } from '../../api/game';
import { fetchGamesAction } from '../../redux/actions/gameActions';
import { noGameState } from '../../redux/reducer/gameReducer';
import { AppState } from '../../redux/store';
import GameCard from './GameCard';
import './HomeScreen.scss';

const HomeScreen: FunctionComponent = () => {
  const game_state = useSelector((state: AppState) => state.gamesState);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGames(dispatch)
    
  }, []);

  return (
    <div className="homescreen">
      <h1 className="homescreen__title">All Games</h1>
      {game_state.loading ? (
        <p>Loading...</p>
      ) : game_state.error ? (
        <p>Error: {game_state.error.message}</p>
      ) : (
        <div className="homescreen__games">
          {game_state.games.map((game: any) => (
            <GameCard
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
