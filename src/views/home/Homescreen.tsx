import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicPagination from '../../components/Pagination/Pagination';
import axios from 'axios';

import { fetchGames } from '../../api/game';
import PaginationRanges from '../../components/Pagination/Pagination';
import { fetchGamesAction } from '../../redux/actions/gameActions';
import { noGameState } from '../../redux/reducer/gameReducer';
import { AppState } from '../../redux/store';
import GameCard from './GameCard';
import './HomeScreen.scss';
const HomeScreen: FunctionComponent = () => {
  const game_state = useSelector((state: AppState) => state.gamesState);
  const dispatch = useDispatch();
  const [pageNumber, setpageNUmber] = useState<number>(1);

  const handlePaginationChange = (pageNumber: number) => {
    setpageNUmber(pageNumber);
  };
  useEffect(() => {
    fetchGames(dispatch, pageNumber);
  }, [pageNumber]);

  return (
    <div className="homescreen">
      {game_state.loading ? (
        <p>Loading...</p>
      ) : game_state.error ? (
        <p>Error: {game_state.error.message}</p>
      ) : (
        <>
          <div className="homescreen__games">
            {game_state.games.map((game: any) => (
              <GameCard
                key={game._id}
                gameId={game._id}
                name={game.name}
                image={game.background_image}
                parent={game.parent_platforms}
                genres={game.genres}
                metacritic={game.metacritic}
              />
            ))}
          </div>
          <BasicPagination handlepagination={handlePaginationChange} count={game_state.n_pages ?? 100} />
        </>
      )}
      <BasicPagination handlepagination={handlePaginationChange}/>
    </div>
  );
};

export default HomeScreen;
