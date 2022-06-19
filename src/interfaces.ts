import { User } from "firebase/auth";

export interface ITrending {
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  id: number;
  title: string;
  genre_ids: object;
  vote_count: number;
  video: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  media_type: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieCredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

export interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface IForm {
  email: string;
  password: string;
}

export interface IJoinForm {
  username: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface IPasswordCheckForm {
  newPassword: string;
  newPasswordCheck: string;
}

export interface IPasswordForm {
  password: string;
}
export interface IUserMovies {
  watch: number[];
  good: number[];
  bad: number[];
}

export interface IMovieBtn {
  movieId: number;
  genres: IGenre[];
}

export interface IPageTitle {
  title: string;
  subtitle: string;
}

export interface IFriend {
  friendId: string;
  friendUsername: string;
}

export interface IFriendList {
  friends: IFriend[];
}

export interface IUserDB {
  username: string;
  id: string;
  friends: IFriend[];
  movies: IUserMovies;
  genres: object;
}

export interface IUser {
  user: User | null;
}
