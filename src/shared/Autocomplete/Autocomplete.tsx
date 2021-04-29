import React from 'react';
import { AutocompleteList } from '../Autocomplete/AutocompleteList';
import { IUserData } from '../../hooks/useUsersData';

interface IProps {
  usersData: IUserData[];
}

export const Autocomplete: React.FC<IProps> = ({ usersData }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [autocompleteHints, setAutocompleteHints] = React.useState<IUserData[]>([]);
  const [showAutocomplete, setShowAutocomplete] = React.useState<Boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
    setShowAutocomplete(e.currentTarget.value.length > 0);
    setAutocompleteHints(
      usersData.filter((user: IUserData) => user.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
    );
  }

  const handleClickAutocomleteItem = (value: string): void => {
    setInputValue(value);
    setShowAutocomplete(false);
  }

  return (
    <div>
      <form className="search-form">
        <input
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
