import { useEffect, useRef, useState } from 'react';

import SearchInput from './SearchInput';
import useDebounce from '../../utils/useDebounce';

export type Props = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const wasUsed = useRef(false);

  useEffect(() => {
    if (!wasUsed.current && debouncedSearch !== '') {
      wasUsed.current = true;
    }
    if (wasUsed.current) {
      onSearch(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  return <SearchInput value={search} setValue={setSearch} />;
};

export default SearchBar;
