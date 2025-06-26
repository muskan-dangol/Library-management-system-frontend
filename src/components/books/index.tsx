import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { NavBar } from "../NavBar";
import {
  useGetAllBooksDetailsQuery,
  useFilteredBooksByKeywordQuery,
} from "../../services/bookApi";
import { CustomButton } from "../common/Button";
import { useGetUserDetailQuery } from "../../services/userApi";
import { FilterMenuList } from "./FilterMenuList";
import { SortMenuList } from "./SortMenuList";
import { sortBookState } from "../../store/atom";
import { BookSkeleton } from "../common/BookSkeleton";

export const Books = () => {
  const navigate = useNavigate();

  const sortBy = useRecoilValue(sortBookState);

  const { data: filteredBooks } = useFilteredBooksByKeywordQuery(
    { sortBy },
    {
      skip: !sortBy,
    }
  );

  const userId = localStorage.getItem("userId");
  const { data: user } = useGetUserDetailQuery(userId || "", {
    skip: !userId,
  });

  const { data: book, isLoading } = useGetAllBooksDetailsQuery("book");

  return (
    <>
      <NavBar />
      <Box sx={{ padding: 5 }}>
        {user?.is_admin && (
          <CustomButton
            placeholder="Add new book"
            onClick={() => navigate("/new-book")}
            sx={{ backgroundColor: "#031628" }}
          />
        )}
        <Grid container>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 6,
            }}
            sx={{
              display: "flex",
            }}
          >
            <FilterMenuList books={book} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 6,
            }}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <SortMenuList />
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2}>
          {isLoading &&
            Array.from(new Array(10)).map((_, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                sx={{
                  mt: 3,
                }}
                key={index}
              >
                <BookSkeleton index={index} />
              </Grid>
            ))}

          {(filteredBooks ?? book)?.map((book, index: number) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
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
                      fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive font size
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
    </>
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
