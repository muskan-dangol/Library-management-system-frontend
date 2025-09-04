import * as React from "react";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { Dialog, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type BookModalProp = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<BookModalProp> = ({ open, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

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
      {children}
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
