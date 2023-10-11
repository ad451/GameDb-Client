import { FunctionComponent } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Chip, Grid, Rating, Typography } from '@mui/material';

import { AppState } from '../../redux/store';
import ReviewContainer from './review/ReviewContainer';
import "./GameScreen.scss"

interface GameScreenProps {}

const GameScreen: FunctionComponent<GameScreenProps> = () => {
  let { gameId } = useParams();
  const game = useSelector(
    (state: AppState) =>
      state.gamesState.games.filter((el) => el._id == gameId)[0]
  );
  console.log(game.rating);
  return (
    <div
      // style={{
      //   backgroundImage: `url("${game.background_image}")`,
      //   backgroundSize: 'stretch',
      //   width: '100%'
      // }}
      className="p-4"
    >
      <Container
        fluid
        className="bg-dark p-5 mb-2"
        style={{ borderRadius: '10px' }}
      >
        <Grid container>
          <Grid item sm={6}>
            <Image fluid width={500} src={game.background_image}></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h3" color={'white'}>
              {game.name}
            </Typography>
            {game.genres.map((el) => (
              <Chip
                sx={{ color: 'white' }}
                variant="outlined"
                label={el.name}
              />
            ))}
            <Typography color={'white'}>
              Time to beat: {game.playtime} hrs
            </Typography>
            <div>
              <Typography color={'white'}>Rating:</Typography>
              <Rating
                value={game.rating}
                precision={0.01}
                readOnly
                emptyIcon={
                  <StarBorderIcon fontSize="inherit" sx={{ color: 'white' }} />
                }
              />
              <Typography color={'white'}>Rating:</Typography>
            </div>
            <Typography color={'white'}>
              Release date: {game.released}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <ReviewContainer />
    </div>
  );
};

export default GameScreen;
