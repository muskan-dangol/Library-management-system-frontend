import { useState } from "react";
import { useMemo } from "react";
import { Stack, Typography } from "@mui/material";

import { FilterMenu } from "../common/FilterMenu";
import { Book, FiltersState } from "../../types";
import { useGetAllCategoriesQuery } from "../../services/categoryApi";

export const FilterMenuList: React.FC<FilterMenuListProps> = ({ books }) => {
  const { data: allCategories } = useGetAllCategoriesQuery("category");

  const [selectedFilters, setSelectedFilters] = useState<FiltersState>({
    Category: [],
    Author: [],
  });

  const filterMenus = useMemo(() => {
    const categories = (allCategories || [])?.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    const authors = Array.from(new Set(books?.map((book) => book.author)))
      .filter(Boolean)
      .map((author) => ({
        value: author.toLowerCase().replace(/\s+/g, "-"),
        label: author,
      }));

    return {
      Category: categories,
      Author: authors,
    };
  }, [allCategories, books]);

  const handleFilterChange = (type: string, selected: string[]) => {
    const newFilters = { ...selectedFilters, [type]: selected };
    setSelectedFilters(newFilters);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2, mt: 2, alignItems: "center" }}
    >
      <Typography variant="h6">Filters:</Typography>

      {Object.entries(filterMenus).map(([type, options]) => (
        <FilterMenu
          key={type}
          label={type}
          options={options}
          selected={selectedFilters[type as keyof FiltersState]}
          onChange={(selected) => handleFilterChange(type, selected)}
          checkBox={true}
          radioButton={false}
        />
      ))}
    </Stack>
  );
};

type FilterMenuListProps = {
  books: Book[] | undefined;
};
