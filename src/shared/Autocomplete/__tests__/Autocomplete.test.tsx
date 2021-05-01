import { render, fireEvent, waitFor } from '@testing-library/react';
import path from 'path';
import fs from 'fs/promises';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect'
import { Autocomplete } from '../Autocomplete';

const getFixturePath = (name: String) => path.join(__dirname, '__fixtures__', name);
const readFile = (filename: String) => fs.readFile(getFixturePath(filename), 'utf-8');

const server = setupServer(
  rest.get('/users', async (req, res, ctx) => {
    const users = await readFile('users.json');
    return res(ctx.json(users))
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Autocomplete empty data', async () => {
  const { container } = render(<Autocomplete />);

  await waitFor(() => expect(container.querySelector('.autocomplete-list')).toBeNull());
});

test('Autocomplete with data', async () => {
  const { container } = render(<Autocomplete />);
  fireEvent.change(container.querySelector('.search-form__input'), { target: { value: 'Leanne' } });
  
  await waitFor(() => {
    expect(container.querySelector('.search-form__input')).toHaveDisplayValue('Leanne');
    expect(container.querySelector('.autocomplete-list')).toHaveTextContent('Leanne');
  })
});

test('Autocomplete no match found', async () => {
  const { container } = render(<Autocomplete />);

  fireEvent.change(container.querySelector('.search-form__input'), { target: { value: 'Leanne123' } });

  await waitFor(() => {
    expect(container.querySelector('.search-form__input')).toHaveDisplayValue('Leanne123');
    expect(container.querySelector('.autocomplete-list')).toBeEmptyDOMElement();
  });
});
