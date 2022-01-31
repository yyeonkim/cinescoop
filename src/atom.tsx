import { atom } from "recoil";

export const inputState = atom({
  key: "inputState",
  default: "",
});

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
