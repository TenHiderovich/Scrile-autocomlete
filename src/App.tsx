import React from 'react';
import './App.css';
import { Autocomplete } from './shared/Autocomplete';
import { useUsersData } from './hooks/useUsersData';

function App() {
  const [usersData] = useUsersData();

  return (
    <div className="app">
      <Autocomplete usersData={usersData} />
    </div>
  );
}

export default App;
