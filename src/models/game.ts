export interface IGame {
  _id: string;
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  ratings: Array<IRating>;
  metacritic: number;
  playtime: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: Array<IParentPlatform>;
  genres: Array<IGenre>;
}

export interface IRating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface IParentPlatform {
  platform: {
    id: number;
    name: string;
  };
  _id: string;
}

export interface IGenre {
  id: number;
  name: string;
  _id: string;
}
