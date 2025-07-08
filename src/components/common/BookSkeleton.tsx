import { Box, Skeleton } from "@mui/material";
import React from "react";

type SkeletonProp = {
  index?: number;
};

export const BookSkeleton: React.FC<SkeletonProp> = ({ index }) => {
  return (
    <Box key={index} sx={{ width: { xs: "100%", md: "100%" } }}>
      <Skeleton variant="rectangular" height={300} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width={200} height={30} />
        <Skeleton width={150} height={30} />
        <Skeleton width={200} height={30} />
      </Box>
    </Box>
  );
};
