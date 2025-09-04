import { FormControl, Grid } from "@mui/material";

type FormWrapperProps = {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  width: object;
  minHeight?: string;
};

export const FromWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  width,
  minHeight,
}) => {
  return (
    <form onSubmit={onSubmit} style={{overflow: "auto"}}>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        sx={{ minHeight: minHeight || "fit-content" }}
      >
        <Grid
          size={{ xs: 12, sm: 12, md: 12 }}
          sx={{
            width: width || { xs: "80%", sm: "70%", md: "50%", lg: "30%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pb: 5,
          }}
        >
          <FormControl
            defaultValue=""
            required
            sx={{
              border: "1px solid gray",
              p: 3,
              borderRadius: 2,
              width: "90%",
            }}
          >
            {children}
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
