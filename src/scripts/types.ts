export interface IMovies {
  results: IMovieData[];
}

export interface IMovieData {
  id: number;
  first_air_date: string;
  release_date: string;
  backdrop_path: string;
  name: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export interface IActors {
  cast: IActorData[];
}

export interface IActorData {
  name: string;
  profile_path: string;
}

export interface IVideos {
  results: IVideoData[];
}

export interface IVideoData {
  key: string;
}

export interface IGenres {
  genres: IGenresData[];
}

export interface IGenresData {
  name: string;
}
