import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
  InputBase,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  AccountCircleOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { AppDispatch } from "../store/store";
import { resetLoginState } from "../features/user/userLoginSlice";

const pages = ["Books", "New Arrivals", "Best Sellers"];
const navMenuAnchorConfig = {
  anchorOrigin: { vertical: "bottom", horizontal: "left" },
  transformOrigin: { vertical: "top", horizontal: "left" },
} as const;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface SearchBarProps {
  sx?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({ sx }) => (
  <Search sx={sx}>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
    />
  </Search>
);

interface NavLinksProps {
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile = false, onClick }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path.replace(/ /g, "-").toLowerCase());
    onClick?.();
  };

  return (
    <>
      {pages.map((page) =>
        isMobile ? (
          <MenuItem key={page} onClick={() => handleNavigate(page)}>
            <Typography sx={{ textAlign: "center" }}>{page}</Typography>
          </MenuItem>
        ) : (
          <Button
            key={page}
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={() => handleNavigate(page)}
          >
            {page}
          </Button>
        )
      )}
    </>
  );
};

interface AuthButtonProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isAuthenticated,
  onSignOut,
  onNavigate,
}) => (
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
    onClick={isAuthenticated ? onSignOut : () => onNavigate("/login")}
  >
    {isAuthenticated ? <LogoutOutlined /> : <AccountCircleOutlined />}
    {isAuthenticated ? "Sign out" : "Login"}
  </IconButton>
);

// Main Component
export default function NavBar() {
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
    dispatch(resetLoginState());
    localStorage.removeItem("userToken");
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
              <NavLinks isMobile onClick={() => handleMenuClose(true)} />
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
            <AuthButton
              isAuthenticated={isAuthenticated}
              onSignOut={handleSignOut}
              onNavigate={handleNavigate}
            />
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
          <NavLinks />
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
}
