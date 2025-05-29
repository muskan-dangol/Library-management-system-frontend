import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { userSignup, updateFormData } from "../../features/user/userSignupSlice";

// import { userSignupState } from "../../store/atom";

export const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { formData, loading } = useSelector((state: RootState) => state.signup);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userSignup(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
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
              // width: "20%",
              border: "1px solid gray",
              p: 3,
              borderRadius: 2,
              width: "90%",
            }}
          >
            <Typography variant="h6" sx={{ margin: 1 }}>
              Sign Up
            </Typography>

            <TextField
              type="text"
              name="firstname"
              label="Firstname"
              variant="outlined"
              size="small"
              sx={{ margin: 1 }}
              required
              value={formData.firstname}
              onChange={handleChange}
            />

            <TextField
              type="text"
              name="lastname"
              label="LastName"
              variant="outlined"
              size="small"
              sx={{ margin: 1 }}
              required
              value={formData.lastname}
              onChange={handleChange}
            />
            <TextField
              type="Email"
              name="email"
              label="Email"
              variant="outlined"
              size="small"
              sx={{ margin: 1 }}
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              size="small"
              required
              sx={{ margin: 1 }}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 1 }}
              disabled={loading === true}
              onClick={() => navigate("/profile")}
            >
              {loading === true ? "Signing up..." : "Sign Up"}
            </Button>
            <FormHelperText id="my-helper-text">
              Already have an account?
              <Button
                sx={{ textTransform: "none", verticalAlign: "baseline " }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
