import React from 'react';
import AddPlayer from './components/AddPlayer';
import AddTournament from './components/AddTournament';
import TournamentTable from './components/TournamentTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tournament App</h1>
      </header>
      <main>
        <AddPlayer />
        <AddTournament />
        <TournamentTable />
      </main>
    </div>
  );
}

export default App;
