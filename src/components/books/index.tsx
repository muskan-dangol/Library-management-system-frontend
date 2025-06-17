import { Box, Button, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../NavBar";
import { useGetAllBooksDetailsQuery } from "../../services/bookApi";

export const Books = () => {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const { data, isLoading } = useGetAllBooksDetailsQuery("booksDetails");

  return (
    <>
      <NavBar />
      <Box sx={{ padding: 5 }}>
        {isAdmin && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#031628" }}
            onClick={() => navigate("/new-book")}
          >
            Add new book
          </Button>
        )}
        <Grid container spacing={2}>
          {isLoading &&
            Array.from(new Array(5)).map((_, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))}
          {data?.map((book, index: number) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 2, md: 2 }}
              sx={{
                mt: 3,
                display: "flex",
              }}
            >
              <Item sx={{ textAlign: "justify", padding: "12px" }}>
                <>
                  <img
                    style={{
                      width: 210,
                      height: 210,
                      backgroundColor: "black",
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
                      fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive font size
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      // whiteSpace: "nowrap",
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
                    Author: {book.author}
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
                    Release: {book.release_date.slice(0, 10)}
                  </Typography>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
