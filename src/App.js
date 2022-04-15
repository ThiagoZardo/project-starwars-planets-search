import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlanetProvider from './context/PlanetProvider';
import Home from './pages/Home';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <PlanetProvider>
            <Route exact path="/" component={ Home } />
            <Table />
          </PlanetProvider>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
