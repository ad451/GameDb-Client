import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../redux/store';
import GameCard from '../home/GameCard';
import { fetchListGames } from '../../api/listGame';
import ListGrid from './listGrid';
import { IGame } from '../../models/game';
import { Box, Card, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from '@mui/material';


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
        if (gameIds.length > 0) {
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
    <Grid container rowSpacing={0} style={{ height: "100px", position: "relative" }}>
      <Typography style={{ height: "60px", marginTop: '10px', marginLeft: "10px", fontWeight: "bold" }} variant='h5' color={"white"}>Game List</Typography>
      {gameIds.length > 0 ? <ListGrid games={games} /> : <Typography>Empty List</Typography>}

    </Grid>
  );
};

export default ListScreen;
