import { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";

import { NavBar } from "../NavBar";
import {
  useGetAllBooksQuery,
  useGetFilteredBooksByKeywordQuery,
} from "../../services/bookApi";
import { CustomButton } from "../common/Button";
import { useGetUserDetailQuery } from "../../services/userApi";
import { FilterMenuList } from "./FilterMenuList";
import { SortMenuList } from "./SortMenuList";
import {
  filterBookState,
  openModalState,
  sortBookState,
  selectedBookIndex,
} from "../../store/atom";
import { BookSkeleton } from "../common/BookSkeleton";
import { ScrollTopArrow } from "../common/ScrollTopArrow";
import { BookModal } from "../common/BookModal";

const drawerWidth = 240;

export const Books = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [open, setOpen] = useRecoilState(openModalState);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedBookIndex);
  const sortBy = useRecoilValue(sortBookState);
  const filterBy = useRecoilValue(filterBookState);
  const userId = localStorage.getItem("userId");

  const { data: filteredBooks } = useGetFilteredBooksByKeywordQuery(
    { sortBy, filterBy },
    {
      skip: !sortBy && !filterBy,
    }
  );

  const { data: user } = useGetUserDetailQuery(userId || "", {
    skip: !userId,
  });

  const { data: book, isLoading } = useGetAllBooksQuery("books");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <>
      <NavBar />
      <AppBar
        position="relative"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
          backgroundColor: "#031628D9",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Typography variant="h6" noWrap component="div">
              Open filters
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 5 }}>
        <Grid container>
          <Grid
            sx={{ mb: 2, mt: 2 }}
            size={{
              xs: 12,
              sm: 4,
              md: 3,
            }}
          >
            {user?.is_admin && (
              <CustomButton
                placeholder="Add new book"
                onClick={() => navigate("/new-book")}
                sx={{ backgroundColor: "#031628" }}
              />
            )}
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 8,
              md: 9,
            }}
            sx={{
              display: { xs: "none", sm: "flex" },

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

          <Grid
            size={{
              xs: 12,
              sm: 4,
              md: 3,
            }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  padding: 2,
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              slotProps={{
                root: {
                  keepMounted: true,
                },
              }}
            >
              <FilterMenuList books={book} />
              <SortMenuList />
            </Drawer>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: "100%",
                maxHeight: "80vh",
                overflowY: "visible",
              }}
            >
              <FilterMenuList books={book} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9 }}>
            <Grid container spacing={2}>
              {(filteredBooks ?? book)?.map((book, index: number) => (
                <Grid
                  key={book.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  sx={{
                    mt: 3,
                  }}
                >
                  <Item
                    key={book.id}
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpen(true);
                    }}
                  >
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
          </Grid>
          <ScrollTopArrow />
        </Grid>
      </Box>
      <BookModal
        open={open}
        onClose={() => setOpen(false)}
        books={filteredBooks || []}
        initialIndex={selectedIndex}
      />
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
