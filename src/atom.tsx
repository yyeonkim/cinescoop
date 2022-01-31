import { atom, selector } from "recoil";
import useFetchMovieDetails from "../pages/api/useFetchMovieDetails";

const inputState = atom({
  key: "inputState",
  default: [],
});
const movieDataState = atom({
  key: "movieDataState",
  default: [],
});

export { inputState, movieDataState };
export const genreState = atom({
  key: "genre",
  default: {
    id: "27",
    name: "액션",
  },
});

export const movieIDState = atom({
  key: "movieIDState",
  default: 568124,
});

export const movieInfoState = atom({
  key: "movieInfoState",
  default: {
    details: {}, 
    videos: {},
  
    credits: {},

  }
});