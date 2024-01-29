import { AiOutlineSearch } from 'react-icons/ai';
import styles from './SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
};

const SearchInput = ({ value, setValue }: SearchInputProps) => {
  return (
    <div className={styles.searchWrapper}>
      <AiOutlineSearch />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default SearchInput;
