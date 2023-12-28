import { FunctionComponent, useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Chip, Grid, Rating, Typography } from '@mui/material';

import { fetchReviewsByGameId } from '../../api/review';
import NotFound from '../../components/NotFound/NotFound';
import { fetchReviewAction } from '../../redux/actions/reviewActions';
import { AppState } from '../../redux/store';
import './GameScreen.scss';
import ReviewContainer from './review/ReviewContainer';
import { fetchGamesById } from '../../api/game';
import { IGame } from '../../models/game';
import LoadingSpinner from '../../components/loading/loading';
interface GameScreenProps {}

const GameScreen: FunctionComponent<GameScreenProps> = () => {
  let { gameId } = useParams();
  const [loading,setloading] = useState<boolean>(false);
  let game : IGame = useSelector(
    (state: AppState) =>
    state.gamesState.games.filter((el) => el._id == gameId)[0]
    );
  const [currentGame,setCurrentGame] = useState<IGame | undefined>(game)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log(gameId,currentGame)

      if (currentGame !== undefined && gameId==currentGame._id) {
        const success = await fetchReviewsByGameId(currentGame._id, dispatch);
      }
      else{
        setloading(true);
        const currentGameres = await fetchGamesById(gameId);
        console.log(currentGameres);
        setCurrentGame(currentGameres)
        setloading(false);
      }
      return () =>
        dispatch(
          fetchReviewAction({ reviews: [], loading: true, error: null })
        );
    })();
  }, [gameId]);
  if (currentGame === undefined || gameId === undefined ) return (<LoadingSpinner/>);
  return (loading ? (<LoadingSpinner/>):(
    <div
      style={{
      //   backgroundImage: `url("${game.background_image}")`,
      //   backgroundSize: 'stretch',
        width: '100%'
      }}
      className="p-4"
    >
      <Container
        fluid
        className="bg-dark p-5 mb-2"
        style={{ borderRadius: '10px' }}
      >
        <Grid container>
          <Grid item sm={6}>
            <Image fluid width={500} src={currentGame.background_image}></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h3" color={'white'}>
              {currentGame.name}
            </Typography>
            {currentGame.genres.map((el) => (
              <Chip
                sx={{ color: 'white' }}
                variant="outlined"
                label={el.name}
              />
            ))}
            <Typography color={'white'}>
              Time to beat: {currentGame.playtime} hrs
            </Typography>
            <div>
              <Typography color={'white'}>Rating:</Typography>
              <Rating
                value={currentGame.rating}
                precision={0.01}
                readOnly
                emptyIcon={
                  <StarBorderIcon fontSize="inherit" sx={{ color: 'white' }} />
                }
              />
              <Typography color={'white'}>Rating:</Typography>
            </div>
            <Typography color={'white'}>
              Release date: {currentGame.released}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <ReviewContainer contentId={currentGame._id}/>
    </div>
  )
  );
};

export default GameScreen;
