import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import KanbanBoard from './components/KanbanBoard';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <KanbanBoard searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default App;
