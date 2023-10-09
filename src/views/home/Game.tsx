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

import './game.scss';

interface ParentPlatform {
  platform: {
    id: number;
    name: string;
  };
  _id: string;
}

interface GameProps {
  gameId: string;
  name: string;
  release: string;
  image: string;
  rating: number;
  metacritic: number;
  playtime: number;
  ratings: number;
  parent: Array<ParentPlatform>;
  genres: any;
}

const Game: FunctionComponent<GameProps> = ({
  gameId,
  name,
  release,
  image,
  rating,
  metacritic,
  playtime,
  ratings,
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
    <div className="game" key={gameId}>
      <Link to={`/game/${gameId}`} title="See game details">
        <img src={image} alt={name} />
      </Link>

      <div className="game__info">
        <Link to={`/game/${gameId}`} title="See game details">
          <p className="info__name">{name}</p>
        </Link>

        <div className="info__release">
          <p>Released: </p>
          <span>{release}</span>
        </div>
        <div className="info__rating">
          <p>Rating: </p>
          <span>{rating}</span>
        </div>
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
        <div className="info__play">
          <p>Playtime: </p>
          <span>{playtime} Hours</span>
        </div>
        <div className="info__genres">
          <p>Genres: </p>
          <span>
            {genres.map((genre: any) => (
              <>
                <span>{genre.name},</span>
              </>
            ))}
          </span>
        </div>
        <div className="info__platforms">
          <p>Platforms: </p>
          <span>
            {parent.map((platforms: ParentPlatform) => (
              <>{getPlatformIconClass(platforms.platform.name)}</>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;
