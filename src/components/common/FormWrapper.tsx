import { FormControl, Grid } from "@mui/material";

type FormWrapperProps = {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FromWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid
          width={{ xs: "80%", sm: "70%", md: "50%", lg: "30%" }}
          size={{ xs: 12, sm: 12, md: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 15,
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
