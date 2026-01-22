import { Stack, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import { sortBookState, filterBookState } from "../../store/atom";
import { FilterMenu } from "../common/FilterMenu";
import { FiltersState } from "../../types";

export const SortMenuList: React.FC<SortMenuListProps> = ({ onSortApply }) => {
  const [sortBy, setSortBy] = useRecoilState(sortBookState);
  const filterBy = useRecoilValue(filterBookState);

  const sortMenus = [
    { value: "title", label: "Alphabetically" },
    { value: "new-additions", label: "New Additions" },
    { value: "old-additions", label: "Old Additions" },
  ];

  const handleSortChange = (selected: string[]) => {
    const newSortValue = selected[0] ?? "";
    setSortBy(newSortValue);
    onSortApply({ sortBy: newSortValue, filterBy });
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
        search={false}
      />
    </Stack>
  );
};

type SortMenuListProps = {
  onSortApply: (params: { sortBy?: string; filterBy?: FiltersState }) => void;
};
