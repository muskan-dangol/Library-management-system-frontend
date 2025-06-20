import { Image } from "@mui/icons-material";
import { Box, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRedirectIfNotAuthenticated } from "../constant";
import { useGetUserDetailQuery } from "../services/userApi";
import { setCredentials } from "../features/auth/userSignupSlice";
import { NavBar } from "./NavBar";

export const Profile = () => {
  useRedirectIfNotAuthenticated();
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

  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <NavBar />
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: 2,
          width: "30%",
          margin: "auto",
          marginTop: 5,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton variant="circular" width={300} height={300} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width={200} height={30} />
              <Skeleton width={150} height={30} />
              <Skeleton width={250} height={30} />
            </Box>
          </>
        ) : (
          <>
            <Image
              sx={{
                backgroundColor: "gray",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
              }}
            ></Image>
            <Box sx={{ textAlign: "flex-start" }}>
              <p>{data?.firstname}</p>
              <p>{data?.lastname}</p>
              <p>{data?.email}</p>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
