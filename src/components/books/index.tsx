import React from "react";

import { NavBar } from "../NavBar";
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
