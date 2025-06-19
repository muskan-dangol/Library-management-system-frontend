import { useNavigate } from "react-router-dom";

import { Button, MenuItem, Typography } from "@mui/material";

const pages = ["Books", "New Arrivals", "Best Sellers"];

interface NavLinksProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavMenus: React.FC<NavLinksProps> = ({ isMobile = false }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    const formattedPath = path.replace(/ /g, "-").toLowerCase();

    if (location.pathname !== `/${formattedPath}`) {
      navigate(`/${formattedPath}`);
    }
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
