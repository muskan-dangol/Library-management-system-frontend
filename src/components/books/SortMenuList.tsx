import { Stack, Typography } from "@mui/material";

import { SortState } from "../../types";
import { useRecoilState } from "recoil";
import { SortBookState } from "../../store/atom";
import { FilterMenu } from "../common/FilterMenu";

type SortMenuListProps = {
  onSortChange: (sort: SortState) => void;
};

export const SortMenuList: React.FC<SortMenuListProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useRecoilState(SortBookState);

  const sortMenus = [
    { value: "most-popular", label: "Most Popular" },
    { value: "alphabetically", label: "Alphabetically" },
    { value: "new-additions", label: "New Additions" },
    { value: "old-additions", label: "Old Additions" },
  ];

  const handleSortChange = (selected: string[]) => {
    const sortValue = selected[0] ?? "";
    const newSort = { sortBy: sortValue };
    setSelectedSort(newSort);
    onSortChange(newSort);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2, mt: 2, alignItems: "center" }}
    >
      <Typography variant="h6">Sort Books:</Typography>

      <FilterMenu
        label="Sort"
        options={sortMenus}
        selected={selectedSort.sortBy ? [selectedSort.sortBy] : []}
        onChange={handleSortChange}
        checkBox={false}
        radioButton={true}
      />
    </Stack>
  );
};
