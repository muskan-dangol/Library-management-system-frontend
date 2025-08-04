import { useMemo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Stack, Typography, FormControl, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRecoilValue } from "recoil";

import { sortBookState } from "../../store/atom";
import { MultiSelectDropdown } from "../common/MultiSelectDropDown";
import { Book, FiltersState } from "../../types";
import { filterBookState } from "../../store/atom";
import { useGetAllCategoriesQuery } from "../../services/categoryApi";
import { CustomButton } from "../common/Button";

export const FilterMenuList: React.FC<FilterMenuListProps> = ({
  books,
  onFilterApply,
}) => {
  const { data: allCategories } = useGetAllCategoriesQuery("category");
  const [selectedFilters, setSelectedFilters] = useRecoilState(filterBookState);
  const sortBy = useRecoilValue(sortBookState);

  const filterMenus = useMemo(() => {
    const categories = (allCategories || []).map((category) => ({
      value: category.id,
      label: category.name,
    }));

    const authors = Array.from(new Set(books?.map((book) => book.author)))
      .filter(Boolean)
      .map((author) => ({
        value: author,
        label: author,
      }));

    return {
      Category: categories,
      Author: authors,
    };
  }, [allCategories, books]);

  const latestYear = useMemo(() => {
    if (!books?.length) return new Date().getFullYear();
    return Math.max(
      ...books.map((b) => new Date(b.release_date).getFullYear())
    );
  }, [books]);

  const oldestYear = useMemo(() => {
    if (!books?.length) return new Date().getFullYear();
    return Math.min(
      ...books.map((b) => new Date(b.release_date).getFullYear())
    );
  }, [books]);

  useEffect(() => {
    if (
      books?.length &&
      selectedFilters.ReleaseDate[0] === selectedFilters.ReleaseDate[1]
    ) {
      setSelectedFilters((prev) => ({
        ...prev,
        ReleaseDate: [oldestYear, latestYear],
      }));
    }
  }, [books, oldestYear, latestYear]);

  const handleSubmitFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    onFilterApply({ filterBy: selectedFilters, sortBy });
  };

  return (
    <Stack direction="column" spacing={2} sx={{ mb: 2, mt: 2 }}>
      <Typography
        variant="h6"
        sx={{ borderBottom: "1px solid black", width: "fit-content" }}
      >
        Filter Options:
      </Typography>

      <FormContent>
        <CustomButton
          placeholder="Update Filter"
          onClick={handleSubmitFilter}
          sx={{ backgroundColor: "#031628", width: "fit-content" }}
        />

        <MultiSelectDropdown
          label="Categories"
          options={filterMenus.Category}
          selected={selectedFilters.Category}
          onChange={(newSelected) =>
            setSelectedFilters((prev) => ({ ...prev, Category: newSelected }))
          }
        />

        <MultiSelectDropdown
          label="Authors"
          options={filterMenus.Author}
          selected={selectedFilters.Author}
          onChange={(newSelected) =>
            setSelectedFilters((prev) => ({ ...prev, Author: newSelected }))
          }
        />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Book Release Date:
        </Typography>
        <Slider
          sx={{ mt: 1 }}
          getAriaLabel={() => "Year range"}
          value={selectedFilters.ReleaseDate}
          min={oldestYear}
          max={latestYear}
          step={1}
          onChange={(event: Event, newValue: number[]) =>
            setSelectedFilters((prev) => ({
              ...prev,
              ReleaseDate: newValue,
            }))
          }
          valueLabelDisplay="auto"
        />
      </FormContent>
    </Stack>
  );
};

type FilterMenuListProps = {
  books: Book[] | undefined;
  onFilterApply: (params: { sortBy?: string; filterBy?: FiltersState }) => void;
};

const FormContent = styled(FormControl)`
  width: 100%;
`;
