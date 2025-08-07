import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Comment } from "./Comment";
import { useGetBookByIdQuery } from "../services/bookApi";
import { useGetAllBookReviewsQuery } from "../services/reviewApi";
import { BookSkeleton } from "./common/BookSkeleton";

export const BookDetailPage = () => {
  const { id: bookId } = useParams<{ id: string }>();

  const { data: reviews = [] } = useGetAllBookReviewsQuery(bookId || "", {
    skip: !bookId,
  });

  const { data: book = Object, isLoading } = useGetBookByIdQuery(bookId || "", {
    skip: !bookId,
  });

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            gap: 2,
            px: { xs: 2, sm: 6 },
            py: 6,
          }}
        >
          <BookSkeleton />
        </Box>
      ) : (
        <Box sx={{ px: { xs: 2, sm: 6 }, py: 6 }}>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <img
                style={{
                  width: "100%",
                  maxHeight: "60vh",
                  borderRadius: "4px",
                }}
                src={book.image}
                alt={book.title}
              ></img>
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              <Typography variant="h4">{book.title}</Typography>
              <Typography variant="body1">Writer: {book.author}</Typography>
              <Typography variant="body1">
                Published on: {book.release_date}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {book.short_description}
              </Typography>
              <Typography variant="body1">{book.long_description}</Typography>
              <Typography color="success" gutterBottom>
                {book.available} books available
              </Typography>
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Rating
                  name="read-only"
                  value={reviews.average_rating}
                  readOnly
                />
              </Box>

              <Button
                sx={{
                  backgroundColor: "#031628",
                  color: "#fff",
                  alignItems: "end",
                  mt: 2,
                }}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <Comment />
    </>
  );
};
