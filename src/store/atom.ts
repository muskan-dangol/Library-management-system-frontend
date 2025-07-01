import { atom } from "recoil";

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
