import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Header/Header";
import Pages from './components/mainPages/Pages';
import { DataProvider } from './GlobalState';

function App() {
  return (
    <DataProvider>

      <Router>
        <Header />
        <Pages/>
      </Router>
    </DataProvider>

  );
}

export default App;
