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
