import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Grow,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRef, useState } from "react";

type Option = { value: string; label: string };

type Props = {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
};

export const MultiSelectDropdown: React.FC<Props> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const anchorRef = useRef<HTMLButtonElement>(null);

  const toggleItem = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    )
      return;
    setOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        ref={anchorRef}
        sx={{
          borderBottom: "1px solid black",
          borderRadius: 0,
          color: "inherit",
          mt: 3,
          textTransform: "none",
        }}
        fullWidth
        variant="text"
        onClick={handleToggle}
      >
        {label}
        <ArrowDropDownIcon
          sx={{
            ml: "auto",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </Button>

      <Popper
        sx={{ zIndex: 1300 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ width: anchorRef.current?.offsetWidth || 200 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    autoFocus={open}
                    sx={{ p: 1 }}
                  />
                  <MenuList
                    autoFocusItem={false}
                    sx={{
                      maxHeight: "200px",
                      overflow: "auto",
                      minWidth: "200px",
                    }}
                  >
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          onClick={() => toggleItem(option.value)}
                        >
                          <Checkbox checked={selected.includes(option.value)} />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        <ListItemText primary="No results" />
                      </MenuItem>
                    )}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};