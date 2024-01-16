import { useEffect, useState } from 'react';

import SearchInput from './SearchInput';

export type Props = {
  onSearch: (query: string | null) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [search, setSearch] = useState('');
  console.log(search);
  useEffect(() => {
    console.log('onsearch called in useffect in search bar');
    onSearch(search);
  }, [search]);
  return <SearchInput value={search} setValue={setSearch} />;
};

export default SearchBar;
