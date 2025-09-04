import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import {
  Box,
  Checkbox,
  ListItemText,
  Paper,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import { AppDispatch, RootState } from "../../store/store";
import { CustomButton } from "./Button";
import { useAddCategoryMutation } from "../../services/categoryApi";
import {
  resetCategoryFormData,
  updateCategoryFormData,
} from "../../features/categorySlice";

export const FilterMenu: React.FC<FilterMenuProps> = ({
  options,
  selected,
  onChange,
  checkBox,
  radioButton,
  search,
  label,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryFormData } = useSelector(
    (state: RootState) => state.category
  );

  const [addCategory, { error }] = useAddCategoryMutation();

  const [openMenu, setOpenMenu] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenMenu(false);
    setSearchTerm("");
  };

  const handleOptionSelect = (value: string) => {
    let newSelected: string[];

    if (radioButton) {
      if (selected.includes(value)) {
        newSelected = [];
      } else {
        newSelected = [value];
      }
    } else {
      newSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
    }

    onChange(newSelected);
    setOpenMenu(false);
    setSearchTerm("");
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();

      setOpenMenu(false);
      setSearchTerm("");
    }
  };

  const prevOpen = React.useRef(openMenu);

  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewCategory = async () => {
    try {
      await addCategory({
        ...categoryFormData,
      }).unwrap();

      dispatch(resetCategoryFormData());
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          variant="outlined"
          ref={anchorRef}
          id="composition-button"
          aria-controls={openMenu ? "composition-menu" : undefined}
          aria-expanded={openMenu ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            margin: 1,
            color: "#031628",
            border: "1px, solid, #031628",
            textTransform: "none",
          }}
        >
          {selected.length > 0
            ? options.find((opt) => opt.value === selected[0])?.label ||
              "Default"
            : label}
        </Button>

        <Popper
          open={openMenu}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{ zIndex: 1200 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", zIndex: 1 }}
                  >
                    {search && (
                      <TextField
                        name="name"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          dispatch(
                            updateCategoryFormData({
                              [e.target.name]: e.target.value,
                            })
                          );
                        }}
                        size="small"
                        autoFocus={openMenu}
                        sx={{ p: 1, zIndex: 1 }}
                      />
                    )}

                    <MenuList
                      id="composition-menu"
                      sx={{ maxHeight: "200px", overflow: "auto" }}
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <MenuItem
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                          >
                            {checkBox && (
                              <Checkbox
                                checked={selected.includes(option.value)}
                                size="small"
                              />
                            )}
                            {radioButton && (
                              <Radio
                                checked={selected.includes(option.value)}
                                value="a"
                              />
                            )}

                            <ListItemText primary={option.label} />
                          </MenuItem>
                        ))
                      ) : (
                        <>
                          <MenuItem disabled>
                            <ListItemText primary="No results" />
                          </MenuItem>
                          <MenuItem>
                            <CustomButton
                              placeholder="Add New Category Type"
                              onClick={handleAddNewCategory}
                              sx={{
                                backgroundColor: "#031628",
                                width: "auto",
                              }}
                            />
                          </MenuItem>
                          {error && (
                            <Typography color="error">
                              Error: {JSON.stringify(error)}
                            </Typography>
                          )}
                        </>
                      )}
                    </MenuList>
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

type FilterOption = {
  value: string;
  label: string;
};

type FilterMenuProps = {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  checkBox: boolean;
  radioButton: boolean;
  search: boolean;
};
