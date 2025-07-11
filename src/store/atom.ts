import { atom } from "recoil";
import { FiltersState } from "../types";

export const filterBookState = atom<FiltersState>({
  key: "filterBookState",
  default: {
    Category: [],
    Author: [],
    ReleaseDate : [0, 0]
  },
});

export const sortBookState = atom({
  key: "sortBookState",
  default: "",
});


export const selectedBookIndex = atom({
  key: "selectedBookIndex",
  default: 0,
});
