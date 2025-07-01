import { Box, Button, Grid, Typography } from "@mui/material";

import { NavBar } from "./NavBar";
import { Comment } from "./Comment";

const Book = {
  id: "1",
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  release_date: "1960-07-11",
  available: 5,
  short_description:
    "A classic novel exploring racial injustice in the American South.",
  long_description:
    "Set in the fictional town of Maycomb, Alabama, during the Great Depression, 'To Kill a Mockingbird' follows young Scout Finch and her father, lawyer Atticus Finch, as he defends a Black man accused of a crime he didn’t commit. Through Scout’s eyes, the novel examines themes of morality, empathy, and prejudice, delivering a powerful commentary on the human condition.",
  image: "https://covers.openlibrary.org/b/id/10519886-L.jpg",
  created_on: "2025-01-01",
};

export const BookDetailPage = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ px: { xs: 2, sm: 6 }, py: 6 }}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid size={{ md: 4, xs: 12 }}>
            <img
              style={{
                width: "100%",
                borderRadius: "4px",
              }}
              src={Book?.image}
              alt={Book?.title}
            ></img>
          </Grid>
          <Grid size={{ md: 8 }}>
            <Typography variant="h4">{Book.title}</Typography>
            <Typography variant="body1">Writer: {Book.author}</Typography>
            <Typography variant="body1">
              Published on: {Book.release_date}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              {Book.short_description}
            </Typography>
            <Typography variant="body1">{Book.long_description}</Typography>
            <Typography color="success" gutterBottom>
              {Book.available} books available
            </Typography>
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
      <Comment />
    </>
  );
};
