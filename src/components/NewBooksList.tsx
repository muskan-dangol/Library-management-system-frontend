import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BookSkeleton } from "./common/BookSkeleton";
import { useGetAllBooksDetailsQuery } from "../services/bookApi";

export const NewBooksList = () => {
  const { data: book, isLoading } = useGetAllBooksDetailsQuery("book");

  return (
    <Box
      sx={{
        p: 5,
        mb: 4,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        sx={{ borderBottom: "1px solid black", width: "fit-content" }}
      >
        Checkout the new additions:
      </Typography>
      <Grid container spacing={2}>
        {isLoading &&
          Array.from(new Array(10)).map((_, index) => (
            <Grid
              size={{ xs: 12, sm: 4, md: 3, lg: 2 }}
              sx={{
                mt: 3,
              }}
              key={index}
            >
              <BookSkeleton index={index} />
            </Grid>
          ))}

        {book?.map((book, index: number) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 4, md: 3, lg: 2 }}
            sx={{
              mt: 3,
            }}
          >
            <Item key={index}>
              <>
                <img
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  alt={book.title}
                  src={book.image}
                />
              </>
              <Box sx={{ pr: 2, justifyContent: "flex-start" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{
                    maxWidth: "100%",
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "block", color: "text.secondary" }}
                >
                  {book.short_description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <b>Author:</b> {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    display: "flex",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <b>Release:</b> {book.release_date.slice(0, 10)}
                </Typography>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  height: "100%",
  backgroundColor: "#F0F2F3",
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: "justify",
  cursor: "pointer",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
