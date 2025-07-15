import { Stack, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

import { sortBookState } from "../../store/atom";
import { FilterMenu } from "../common/FilterMenu";

export const SortMenuList = () => {
  const [sortBy, setSortBy] = useRecoilState(sortBookState);

  const sortMenus = [
    { value: "title", label: "Alphabetically" },
    { value: "new-additions", label: "New Additions" },
    { value: "old-additions", label: "Old Additions" },
  ];

  const handleSortChange = (selected: string[]) => {
    const newSortValue = selected[0] ?? "";
    setSortBy(newSortValue);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2, mt: 2, alignItems: "center" }}
    >
      <Typography variant="h6">Sort:</Typography>

      <FilterMenu
        label="Default"
        options={sortMenus}
        selected={sortBy ? [sortBy] : []}
        onChange={handleSortChange}
        checkBox={false}
        radioButton={true}
      />
    </Stack>
  );
};
