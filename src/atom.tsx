import { atom } from "recoil";

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

export const selectMovie = atom({
  key: "selectMovie",
  default: "",
});
