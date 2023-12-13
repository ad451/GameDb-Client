import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../redux/store';
import GameCard from '../home/GameCard';
import { fetchListGames } from '../../api/listGame';
import { IGame } from '../../models/game';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
const ListScreen = () => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const [games, setGame] = useState<Array<IGame>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Assuming you have a Redux state to store game data
  const token = window.localStorage.getItem('accessToken');
  // Assuming list.items is an array of game IDs
  const gameIds = useSelector(
    (state: AppState) =>
      state.listState.lists.find((el) => el._id === listId)?.items || []
  );

  useEffect(() => {
    // Define an action creator like fetchListGames(dispatch, gameIds)
    const fetchListGamesAction = async () => {
      console.log(gameIds)
      if (!listId || !token) return;
      try {
        setLoading(true)
        if(gameIds.length>0) {
          const games = await fetchListGames(token, dispatch, listId, gameIds);
          setGame(games);
          console.log(games)
        } else setGame([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchListGamesAction();
  }, [listId, gameIds]);
  return loading ? <>Loading...</> : (
    <div className="homescreen">
      <div className="homescreen__content">
        <h1 className="homescreen__title">Game List</h1>
        <div className="homescreen__games">
          <div className='d-flex flex-column'>
            {games.length > 0 ? games.map((game: IGame) =>
              <Card sx={{ display: 'flex' }} className="mt-2">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {game.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {game.genres.map(el => <Chip label={el.name}></Chip>)}
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={game.background_image}
                  alt="Live from space album cover"
                />
              </Card>
            ): <Typography>Empty List</Typography>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListScreen;
