import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import {
  resetFormData,
  setCredentials,
  updateFormData,
} from "../../features/auth/userSignupSlice";
import { useSignupMutation } from "../../services/authApi";
import { FromWrapper } from "../common/FormWrapper";

export const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { formData, loading } = useSelector((state: RootState) => state.signup);
  const [showPassword, setShowPassword] = React.useState(false);
  const [signup] = useSignupMutation();

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

    const user = await signup(formData).unwrap();
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
      <Button
        type="submit"
        variant="contained"
        sx={{ margin: 1 }}
        disabled={loading === true}
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
    </FromWrapper>
  );
};
