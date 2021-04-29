import React from 'react';
import { IUserData } from "../Autocomplete";

interface IAutocompleteListProps {
  autocompleteHints: IUserData[];
  handleClickAutocomleteItem: (value: string) => void;
}

export const AutocompleteList: React.FC<IAutocompleteListProps> = (props) => {
  const { autocompleteHints, handleClickAutocomleteItem } = props;

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLElement>,
    hintName: string
  ) => {
    if (e.charCode === 13 || e.charCode === 32) {
      handleClickAutocomleteItem(hintName);
    }
  };

  return (
    <ul className="autocomplete-list">
      {autocompleteHints.map((hint: IUserData) => {
        return (
          <li
            className="autocomplete-list__item"
            tabIndex={0}
            key={String(hint.id)}
            onClick={() => handleClickAutocomleteItem(hint.name)}
            onKeyPress={(e: React.KeyboardEvent<HTMLElement>) => handleKeyPress(e, hint.name)}
          >
            {hint.name}
          </li>
        )
      })}
    </ul>
  )
}
