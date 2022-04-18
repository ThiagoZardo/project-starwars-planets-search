import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlanetProvider from './context/PlanetProvider';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <PlanetProvider>
            <Route path="/" exact component={ Home } />
          </PlanetProvider>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
