import { atom } from "recoil";

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
  id: string;
  name: string;
}

export const genreState = atom({
  key: "genre",
  default: {
    id: "27",
    name: "액션",
  },
});
