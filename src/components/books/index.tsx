import React from "react";

import { NavBar } from "../common/NavBar";
import { Typography } from "@mui/material";

export const Books = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <NavBar />
      {isAdmin && <Typography>This is admin content</Typography>}
    </>
  );
};
