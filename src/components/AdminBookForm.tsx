import * as React from "react";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import {
  Alert,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AppDispatch, RootState } from "../store/store";
import { FromWrapper } from "./common/FormWrapper";
import { FilterMenu } from "./common/FilterMenu";
import { useGetAllCategoriesQuery } from "../services/categoryApi";
import { useAddBookMutation } from "../services/bookApi";
import { resetBookFormData, updateBookFormData } from "../features/bookSlice";

type AdminBookFormProp = {
  open: boolean;
  onClose: () => void;
};

export const AdminBookForm: React.FC<AdminBookFormProp> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookFormData } = useSelector((state: RootState) => state.book);

  const [addBook, { isLoading }] = useAddBookMutation();
  const { data: categories } = useGetAllCategoriesQuery("category");

  const [selectedCategories, setSelectedCategories] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBookFormData({ [e.target.name]: e.target.value }));
  };

  const handleCloseAdminForm = () => {
    onClose();
    dispatch(resetBookFormData());
    setSelectedCategories("");
    setImageFile(null);
    setImageUrl("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
      }
    },
  });

  const categoryLists = useMemo(() => {
    return categories
      ? categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      : [];
  }, [categories]);

  const handleCategoryChange = (selected: string[]) => {
    const newCategory = selected[0] ?? "";
    setSelectedCategories(newCategory);
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleSubmitNewBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategories) {
      setOpenSnackBar(true);
      setSnackbarMessage("Category is missing!");
      setSnackbarSeverity("error");
      return;
    }

    if (!imageFile) {
      setOpenSnackBar(true);
      setSnackbarMessage("Image is missing!");
      setSnackbarSeverity("error");
      return;
    }

    try {
      await addBook({
        ...bookFormData,
        image: imageFile,
        category_id: selectedCategories,
      }).unwrap();

      dispatch(resetBookFormData());
      onClose();
      setSelectedCategories("");
      setImageFile(null);
      setImageUrl("");
      setSnackbarMessage("Book added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackBar(true);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        open={open}
        slots={{ transition: Transition }}
        fullWidth
        scroll="paper"
      >
        <IconButton
          onClick={handleCloseAdminForm}
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
        <Typography variant="h4" sx={{ margin: 1, p: 3, textAlign: "center" }}>
          Enter details of new book!
        </Typography>

        <FromWrapper
          onSubmit={handleSubmitNewBook}
          width={{ xs: "80%", sm: "70%", md: "80%", lg: "80%" }}
        >
          <FilterMenu
            label="Category"
            options={categoryLists}
            selected={selectedCategories ? [selectedCategories] : []}
            onChange={handleCategoryChange}
            checkBox={false}
            radioButton={true}
            search={true}
          />

          <TextField
            type="text"
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.title}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="author"
            label="Author"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.author}
            onChange={handleChange}
          />
          <TextField
            type="date"
            name="release_date"
            helperText="Please enter release date of the book"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.release_date}
            onChange={handleChange}
          />
          <TextField
            type="number"
            name="available"
            label="Available"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.available}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="short_description"
            label="Short Description"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.short_description}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="long_description"
            label="Long Description"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            required
            value={bookFormData.long_description}
            onChange={handleChange}
          />

          <Box
            {...getRootProps()}
            sx={{
              height: 40,
              p: 2,
              borderRadius: 2,
              width: "auto",
              border: "2px dashed #031628",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m: 1,
            }}
          >
            <input {...getInputProps()} />
            <Typography width={"100%"}>
              Click or drop an image or a gif file here
            </Typography>
            <CloudUploadIcon sx={{ color: "#031628", margin: 2 }} />
          </Box>

          {imageUrl && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={imageUrl}
                alt="Preview"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ backgroundColor: "#031628", width: "auto", margin: 1, mt: 2 }}
          >
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
        </FromWrapper>
      </BootstrapDialog>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
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
