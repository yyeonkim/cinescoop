import { atom } from "recoil";

export const genreState = atom({
  key: "genre",
  default: {
    id: "27",
    name: "액션",
  },
});
