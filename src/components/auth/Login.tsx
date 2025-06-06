import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { AppDispatch, RootState } from "../../store/store";
import { userLogin, updateFormData } from "../../features/user/userLoginSlice";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { formData, loading } = useSelector((state: RootState) => state.login);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(userLogin(formData));
    navigate("/");
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
              Enter your login details!
            </Typography>

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
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                margin: "8px",
              }}
            >
              <Grid
                width={{ xs: "100%", sm: "50%" }}
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </FormGroup>
              </Grid>
              <Grid
                width={{ xs: "100%", sm: "50%" }}
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  sx={{ textTransform: "none", verticalAlign: "baseline " }}
                  onClick={() => navigate("/signup")}
                >
                  Forgot Password?
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 1 }}
              disabled={loading === true}
            >
              {loading === true ? "loading..." : "Login"}
            </Button>
            <FormHelperText id="my-helper-text">
              Don't have an account?
              <Button
                sx={{ textTransform: "none", verticalAlign: "baseline " }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
