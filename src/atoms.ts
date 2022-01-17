import { atom } from "recoil";

export interface IUser {
  id: string;
  password: string;
  email: string;
}

export const userState = atom<IUser[]>({
  key: "user",
  default: [],
});
