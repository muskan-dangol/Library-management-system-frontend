import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Checkbox,
  FormGroup,
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
import {
  resetFormData,
  setCredentials,
  updateFormData,
} from "../../features/auth/userLoginSlice";
import { useLoginMutation } from "../../services/authApi";
import { FromWrapper } from "../common/FormWrapper";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { formData } = useSelector((state: RootState) => state.login);
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, { isLoading }] = useLoginMutation();

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

    const user = await login(formData).unwrap();
    dispatch(setCredentials(user));
    localStorage.setItem("userToken", user.token);
    localStorage.setItem("userId", user.user.id);
    localStorage.setItem("isAdmin", user.user.is_admin ? "true" : "false");
    dispatch(resetFormData());
    navigate("/");
  };

  return (
    <FromWrapper onSubmit={handleSubmit}>
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
                    showPassword ? "hide the password" : "display the password"
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
            <FormControlLabel control={<Checkbox />} label="Remember me" />
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
        disabled={isLoading === !!true}
      >
        {isLoading === true ? "loading..." : "Login"}
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
    </FromWrapper>
  );
};
