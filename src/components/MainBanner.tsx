import { useGetAllBooksDetailsQuery } from "../services/bookApi";
import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { NavBar } from "./common/NavBar";

interface RenderDotProps {
  selected: boolean;
  index: number;
}

const getCommonProps = () => {
  return {
    renderPrev: (btnProps: object) => (
      <Button variant="contained" {...btnProps}>
        Prev
      </Button>
    ),
    renderNext: (btnProps: object) => (
      <Button variant="contained" {...btnProps}>
        Next
      </Button>
    ),

    renderDot: ({ selected, index }: RenderDotProps) => (
      <Button variant={selected ? "contained" : "outlined"}>{index}</Button>
    ),
    dots: true,
    showSlides: 3,
    speed: 1000 * 1,
    spacing: 2,
    autoPlay: false,
    infinity: false,
    pauseOnHover: true,
    disableTransition: false,
    sx: {},
  };
};
export const MainBanner = () => {
  const { data, isLoading, error } = useGetAllBooksDetailsQuery("booksDetails");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <>
      <NavBar />
      <Box
        sx={{ p: 5, width: "100%", boxSizing: "border-box", borderRadius: 3 }}
      >
        <Carousel
          {...getCommonProps()}
          animation="slide"
          autoPlay
          interval={5000}
          sx={{ borderRadius: 3 }}
        >
          {data?.map((book) => (
            <Paper
              key={book.id}
              sx={{
                height: 400,
                background: "#fafafa",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography>{book.title}</Typography>
              {/* <p>Author: {book.author}</p>
              <p>Release Date: {book.release_date}</p>
              <p>{book.short_description}</p> */}
            </Paper>
          ))}
        </Carousel>
      </Box>
    </>
  );
};
