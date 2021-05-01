import React from 'react';
import { AutocompleteList } from './AutocompleteList';
import { useMountedState } from '../../hooks/useMountedState';

export interface IUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    },
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  },
};

export const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [data, setData] = React.useState<IUserData[]>([]);
  const [autocompleteHints, setAutocompleteHints] = React.useState<IUserData[]>([]);
  const [showAutocomplete, setShowAutocomplete] = React.useState<Boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isMounted = useMountedState()

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      if (isMounted()) {
        setData(data);
      }
    }

    fetchData();

    setAutocompleteHints(
      data.filter((user: IUserData) => user.name.toLowerCase().includes(inputValue.toLowerCase()))
    );

  }, [inputValue, data, isMounted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
    setShowAutocomplete(e.currentTarget.value.length > 0);
  }

  const handleClickAutocomleteItem = (value: string): void => {
    setInputValue(value);
    setShowAutocomplete(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <form className="search-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          className="search-form__input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
      </form>
      {
        showAutocomplete &&
        <AutocompleteList
          autocompleteHints={autocompleteHints}
          handleClickAutocomleteItem={handleClickAutocomleteItem}
        />
      }
    </div>
  )
};
