import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Hooks
import { useDebounce } from '.';

// Constants
import { SEARCH_PARAMS } from '@/constants';

// Types
import { IProduct } from '@/interface';

export type TUseSearch = {
  data: IProduct[];
  searchValue: string;
  category: string;
  onChangeSearchInput: (value: string) => void;
};

export const useSearch = (data: IProduct[]): TUseSearch => {
  const [search, setSearch] = useState<string>('');
  const [param, setSearchParam] = useSearchParams();

  // Get 'name' from param
  const currentSearchValue: string = (
    param.get(SEARCH_PARAMS.NAME) || ''
  ).trim();

  // Get 'category' from param
  const currentCategory: string = param.get(SEARCH_PARAMS.CATEGORY) || '';

  const isIncludeName = useCallback(
    (nameParam: string, data: IProduct): boolean => {
      const { name } = data;
      const lowerCaseName: string = name.toLowerCase();
      const lowerCaseValue: string = nameParam.toLowerCase();
      const isIncludes: boolean = lowerCaseName.includes(lowerCaseValue);

      return isIncludes;
    },
    [],
  );

  // Filter data by 'condition'
  const result: IProduct[] = useMemo(
    (): IProduct[] =>
      data.filter((product: IProduct): boolean => {
        const { category } = product;

        if (!currentCategory || currentCategory === 'all')
          return isIncludeName(currentSearchValue, product);

        return (
          isIncludeName(currentSearchValue, product) &&
          currentCategory === category
        );
      }),
    [currentCategory, currentSearchValue, data, isIncludeName],
  );

  // Handle update search param
  const handleSetSearchParam = useCallback((value: string) => {
    setSearchParam((prev) => {
      if (!value) {
        prev.delete(SEARCH_PARAMS.NAME);

        return prev;
      }

      prev.set(SEARCH_PARAMS.NAME, value);
      return prev;
    });
  }, []);

  // Create debounce handler
  const searchParamDebounce = useDebounce(handleSetSearchParam);

  // Change search state
  const onChangeSearchInput = useCallback(
    (value: string) => {
      setSearch(value);
      searchParamDebounce(value.trim());
    },
    [searchParamDebounce],
  );

  return {
    data: result,
    searchValue: search,
    category: currentCategory,
    onChangeSearchInput,
  };
};
