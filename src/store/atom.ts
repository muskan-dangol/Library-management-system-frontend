import { atom } from "recoil";
import { FiltersState } from "../types";

// export const userSignupState = atom({
//   key: "userSignupState",
//   default: {
//     email: "",
//     password: "",
//     firstname: "",
//     lastname: "",
//   },
// });

export const selectedBookIndex = atom({
  key: "selectedBookIndex",
  default: 0,
});

export const filterBookState = atom<FiltersState>({
  key: "filterBookState",
  default: {
    Category: [],
    Author: [],
  },
});

export const sortBookState = atom({
  key: "sortBookState",
  default: "",
});
