import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Book } from "../../types";
import Carousel from "react-material-ui-carousel";

type BookModalProp = {
  open: boolean;
  onClose: () => void;
  books: Book[];
  initialIndex: number;
};

export const BookModal: React.FC<BookModalProp> = ({
  open,
  onClose,
  books = [],
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
    <BootstrapDialog
      onClose={onClose}
      open={open}
      slots={{ transition: Transition }}
      fullWidth
      scroll="paper"
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: { sm: 0, xs: -45 },
          right: { sm: -50, xs: 0 },
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
        animation="slide"
        autoPlay={false}
        navButtonsAlwaysVisible
        indicators={false}
      >
        {books.map((book) => (
          <DialogContent key={book.id}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <img
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  loading="lazy"
                  alt={book.title}
                  src={book.image}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="caption">
                  {book.short_description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {book.long_description}
                </Typography>
                {book.available && (
                  <Typography color="success" gutterBottom>
                    {book.available} books available
                  </Typography>
                )}
                <Button
                  onClick={() => {
                    navigate(`detail/${book.id}`);
                    onClose();
                  }}
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
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflowY: "auto",
    maxHeight: "calc(90vh - 64px)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    position: "relative",
    overflow: "visible",
    maxHeight: "90vh",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
