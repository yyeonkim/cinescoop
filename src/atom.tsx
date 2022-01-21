import { atom } from "recoil";

export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p";

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
