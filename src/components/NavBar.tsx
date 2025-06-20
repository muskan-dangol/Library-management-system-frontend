import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Menu,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  AccountCircleOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { AppDispatch } from "../store/store";
import { logout, setCredentials } from "../features/auth/userLoginSlice";
import { NavMenus } from "./common/NavMenu";
import { SearchBar } from "./common/SearchBar";

const navMenuAnchorConfig = {
  anchorOrigin: { vertical: "bottom", horizontal: "left" },
  transformOrigin: { vertical: "top", horizontal: "left" },
} as const;

export const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const isAuthenticated = !!localStorage.getItem("userToken");

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    isNavMenu: boolean
  ) => {
    if (isNavMenu) {
      setAnchorElNav(event.currentTarget);
    }
  };

  const handleMenuClose = (isNavMenu: boolean) => {
    if (isNavMenu) {
      setAnchorElNav(null);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.clear();
    dispatch(setCredentials(null));
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#031628" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, true)}
              color="inherit"
              sx={{ display: { xs: "flex", sm: "none" }, paddingRight: 0 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              {...navMenuAnchorConfig}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={() => handleMenuClose(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <NavMenus isMobile onClick={() => handleMenuClose(true)} />
            </Menu>
          </Box>
          <Button sx={{ color: "white" }} onClick={() => navigate("/")}>
            Home
          </Button>
          <SearchBar sx={{ display: { xs: "none", sm: "block" } }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <IconButton
              size="small"
              color="inherit"
              sx={{
                width: "auto",
                whiteSpace: "nowrap",
                alignContent: "center",
                justifyContent: "center",
                borderRadius: isAuthenticated ? 0 : 2,
                margin: isAuthenticated ? 0 : 1,
              }}
              onClick={
                isAuthenticated ? handleSignOut : () => handleNavigate("/login")
              }
            >
              {isAuthenticated ? <LogoutOutlined /> : <AccountCircleOutlined />}
              {isAuthenticated ? "Sign out" : "Login"}
            </IconButton>
            {isAuthenticated && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={() => navigate("/profile")}
                color="inherit"
                sx={{ borderRadius: 0 }}
              >
                <AccountCircle />
              </IconButton>
            )}
            <IconButton
              size="large"
              color="inherit"
              sx={{
                marginLeft: "auto",
                "&:hover": { backgroundColor: "transparent" },
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => navigate("/cart")}
            >
              <Badge>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}></Box>
        </Toolbar>
        <Box sx={{ display: { xs: "flex", sm: "none" }, padding: "0px 24px" }}>
          <SearchBar sx={{ width: "100%", marginBottom: 2 }} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            padding: "0px 24px",
          }}
        >
          <NavMenus />
          {isAuthenticated && (
            <IconButton
              size="large"
              color="inherit"
              sx={{
                marginLeft: "auto",
                "&:hover": { backgroundColor: "transparent" },
              }}
              onClick={() => navigate("/cart")}
            >
              <Badge>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          )}
        </Box>
      </AppBar>
    </Box>
  );
};
