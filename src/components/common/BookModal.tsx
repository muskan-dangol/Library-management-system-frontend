import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Book } from "../../types";
import Carousel from "react-material-ui-carousel";

export const BookModal: React.FC<BookModalProp> = ({
  open,
  onClose,
  books,
  initialIndex,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ zIndex: 1 }}
        fullWidth
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 0,
            right: -50,
            backgroundColor: "#fff",
            borderRadius: "10%",
            zIndex: 1,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Carousel
          index={currentIndex}
          onChange={(now) => setCurrentIndex(now)}
          animation="fade"
          autoPlay={false}
          navButtonsAlwaysVisible
          indicators={false}
        >
          {books.map((book) => (
            <DialogContent>
              <Grid container spacing={2}>
                <Grid key={book?.id} size={{ xs: 12, md: 6 }}>
                  <img
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                    alt={book?.title}
                    src={book?.image}
                  />
                </Grid>
                <Grid key={book?.id} size={{ xs: 12, md: 6 }}>
                  <Typography variant="h4">{book?.title}</Typography>
                  <Typography variant="caption">
                    {book?.short_description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {book?.long_description}
                  </Typography>
                  {book?.available && (
                    <Typography color="success" gutterBottom>
                      {book?.available} books available
                    </Typography>
                  )}
                  <Button
                    onClick={() =>
                      navigate(
                        `detail/${book.title.replace(/ /g, "-").toLowerCase()}`
                      )
                    }
                    sx={{ color: "#000", mb: 1 }}
                  >
                    Show Detailed Information
                  </Button>
                  <Button
                    onClick={onClose}
                    sx={{
                      backgroundColor: "#031628",
                      color: "#fff",
                      alignItems: "end",
                    }}
                  >
                    Add to cart
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          ))}
        </Carousel>
      </BootstrapDialog>
    </>
  );
};

type BookModalProp = {
  open: boolean;
  onClose: () => void;
  books: Book[];
  initialIndex: number;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    position: "relative",
    overflow: "visible",
  },
}));
