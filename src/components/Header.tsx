// import {  useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import React from "react";
import { useGetUserDetailsQuery } from "../services/auth/authService";
// import { AppDispatch, RootState } from "../store/store";
// import { useDispatch } from "react-redux";

import { Typography } from "@mui/material";

export const Header = () => {
  // const { userInfo } = useSelector((state: RootState) => state.login);
  // const dispatch = useDispatch();

  const { data } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  console.log(data);
  return (
    <Typography variant="h6" sx={{ margin: 1 }}>
      This is a header!
    </Typography>
  );
};
