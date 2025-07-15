import { useMemo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Stack, Typography, FormControl, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

import { MultiSelectDropdown } from "../common/MultiSelectDropDown";
import { Book } from "../../types";
import { filterBookState } from "../../store/atom";
import { useGetAllCategoriesQuery } from "../../services/categoryApi";

export const FilterMenuList: React.FC<FilterMenuListProps> = ({ books }) => {
  const { data: allCategories } = useGetAllCategoriesQuery("category");

  const [selectedFilters, setSelectedFilters] = useRecoilState(filterBookState);

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
    if (!books || books.length === 0) return new Date().getFullYear();

    const years = books.map((book) =>
      new Date(book.release_date).getFullYear()
    );
    return Math.max(...years);
  }, [books]);

  const oldestYear = useMemo(() => {
    if (!books || books.length === 0) return new Date().getFullYear();

    const years = books.map((book) =>
      new Date(book.release_date).getFullYear()
    );
    return Math.min(...years);
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

  return (
    <Stack direction="column" spacing={2} sx={{ mb: 2, mt: 2 }}>
      <Typography
        variant="h6"
        sx={{ borderBottom: "1px solid black", width: "fit-content" }}
      >
        Filter Options:
      </Typography>

      <FormContent>
        <MultiSelectDropdown
          label="Categories"
          options={filterMenus.Category}
          selected={selectedFilters.Category}
          onChange={(newSelected) =>
            setSelectedFilters((prev) => ({ ...prev, Category: newSelected }))
          }
        />
      </FormContent>

      <FormContent>
        <MultiSelectDropdown
          label="Authors"
          options={filterMenus.Author}
          selected={selectedFilters.Author}
          onChange={(newSelected) =>
            setSelectedFilters((prev) => ({ ...prev, Author: newSelected }))
          }
        />
      </FormContent>
      <FormContent>
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
};

const FormContent = styled(FormControl)`
  width: 100%;
`;
