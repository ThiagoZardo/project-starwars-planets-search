import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <main className="App">
      <PlanetProvider>
        <Home />
      </PlanetProvider>
    </main>
  );
}

export default App;
