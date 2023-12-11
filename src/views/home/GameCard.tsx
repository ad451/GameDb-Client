import React, { FunctionComponent } from 'react';
import {
  FaAndroid,
  FaAppStoreIos,
  FaApple,
  FaDesktop,
  FaLinux,
  FaPlaystation,
  FaXbox
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { IParentPlatform } from '../../models/game';
import './game.scss';
import { Chip, Grid } from '@mui/material';

interface GameCardProps {
  gameId: string;
  name: string;
  image: string;
  metacritic: number;
  parent: Array<IParentPlatform>;
  genres: Array<any>;
}

const GameCard: FunctionComponent<GameCardProps> = ({
  gameId,
  name,
  image,
  metacritic,
  parent,
  genres
}) => {
  const getPlatformIconClass = (platformName: string) => {
    switch (platformName) {
      case 'PlayStation':
        return <FaPlaystation />;
      case 'PC':
        return <FaDesktop />;
      case 'Apple Macintosh':
        return <FaApple />;
      case 'Linux':
        return <FaLinux />;
      case 'Xbox':
        return <FaXbox />;
      case 'iOS':
        return <FaAppStoreIos />;
      case 'Android':
        return <FaAndroid />;
      default:
        return '';
    }
  };

  return (
    <div className="game" key={gameId} style={{padding: "2px"}}>
      <Link to={`/game/${gameId}`} title="See game details">
        <img src={image} alt={name} style={{ 'maxHeight': '200px' }} />
      </Link>

      <div className="game__info">
        <Link to={`/game/${gameId}`} title="See game details">
          <p className="info__name">{name}</p>
        </Link>


        <div className="info__meta">
          <p>Metacritic: </p>
          <span
            className={
              metacritic >= 70
                ? 'above70'
                : metacritic >= 50
                  ? 'above50'
                  : 'under50'
            }
          >
            {metacritic}
          </span>
        </div>
        <div className="info__genres">
          <p>Genres: </p>
          <Grid container columnGap={1} rowGap={1}>
            {genres.slice(0,2).map((genre: any) => (
              <>
                <Chip style={{backgroundColor: "grey"}} label={genre.name}></Chip>
              </>
            ))}
          </Grid>
        </div>
        <div className="info__platforms">
          <p>Platforms: </p>
          <span>
            {parent.map((platforms: IParentPlatform) => (
              <>{getPlatformIconClass(platforms.platform.name)}</>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
