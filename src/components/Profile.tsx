import { Image } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetUserDetailQuery } from "../services/userApi";
import { setCredentials } from "../features/auth/userSignupSlice";
import { NavBar } from "./common/NavBar";

export const Profile = () => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const { data, isLoading, error } = useGetUserDetailQuery(userId || "", {
    skip: !userId, // Skip query if userId is null
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <>
      <NavBar />
      <Box
        sx={{
          textAlign: "center",
          justifyContent: "flex-start",

          border: "1px solid black",
          borderRadius: 2,
          width: "30%",
          margin: "auto",
          marginTop: 5,
          padding: 5,
        }}
      >
        <Image
          sx={{
            backgroundColor: "gray",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
          }}
        ></Image>
        <Box sx={{ alignItems: "flex-start" }}>
          <p>{data?.firstname}</p>
          <p>{data?.lastname}</p>
          <p>{data?.email}</p>
        </Box>
      </Box>
    </>
  );
};
