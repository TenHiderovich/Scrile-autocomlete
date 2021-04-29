import { render, fireEvent } from '@testing-library/react';
import path from 'path';
import fs from 'fs/promises';
import { Autocomplete } from '../Autocomplete';

const getFixturePath = (name: String) => path.join(__dirname, '__fixtures__', name);
const readFile = (filename: String) => fs.readFile(getFixturePath(filename), 'utf-8');

test('Autocomplete empty data', async () => {
  const { container } = render(<Autocomplete usersData={[]} />);

  expect(container.querySelector('.autocomplete-list')).toBeNull();
});

test('Autocomplete with data', async () => {
  const users = await readFile('users.json');

  const { container } = render(<Autocomplete usersData={JSON.parse(users)} />);

  fireEvent.change(container.querySelector('.search-form__input'), { target: { value: 'Leanne' } });

  expect(container.querySelector('.search-form__input')).toHaveDisplayValue('Leanne');
  expect(container.querySelector('.autocomplete-list')).toHaveTextContent('Leanne');
});

test('Autocomplete no match found', async () => {
  const users = await readFile('users.json');

  const { container } = render(<Autocomplete usersData={JSON.parse(users)} />);

  fireEvent.change(container.querySelector('.search-form__input'), { target: { value: 'Leanne123' } });

  expect(container.querySelector('.search-form__input')).toHaveDisplayValue('Leanne123');
  expect(container.querySelector('.autocomplete-list')).toBeEmptyDOMElement();
});
