import { useMemo } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useTheme, useMediaQuery } from "@mui/material";

import { useGetAllBooksDetailsQuery } from "../services/bookApi";
import { NavBar } from "./NavBar";
import { NewBooksList } from "./NewBooksList";
import { data } from "../constant";
import { BookCard } from "./common/BookCard";
import { BookSkeleton } from "./common/BookSkeleton";
import { ScrollTopArrow } from "./common/ScrollTopArrow";

interface RenderDotProps {
  selected: boolean;
  index: number;
}

export const MainBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const booksPerSlide = isMobile ? 1 : isMedium ? 3 : 5;

  const { isLoading, error } = useGetAllBooksDetailsQuery("booksDetails");

  const bookGroups = useMemo(
    () => chunkArray(data, booksPerSlide),
    [data, booksPerSlide]
  );

  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <NavBar />
      <Box
        sx={{ p: 5, width: "100%", boxSizing: "border-box", borderRadius: 3 }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            margin: 4,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            fontWeight: { xs: "500", sm: "500", md: "400" },
          }}
        >
          Welcome to the digital library
        </Typography>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              gap: 2,
              px: 2,
            }}
          >
            {[...new Array(booksPerSlide)].map((_, index) => (
              <BookSkeleton index={index} />
            ))}
          </Box>
        ) : (
          <Carousel
            {...getCommonProps()}
            animation="slide"
            autoPlay
            interval={5000}
            indicators={true}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            duration={500}
          >
            {bookGroups.map((group, groupIndex) => (
              <Box key={groupIndex}>
                <Grid container spacing={2}>
                  {group?.map((book) => (
                    <Grid
                      size={{
                        xs: 12 / booksPerSlide,
                        sm: 12 / booksPerSlide,
                        md: 12 / booksPerSlide,
                      }}
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <BookCard book={book} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
      <NewBooksList />
      <ScrollTopArrow />
    </>
  );
};

export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
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
    infinity: false,
    pauseOnHover: true,
    disableTransition: false,
  };
};
