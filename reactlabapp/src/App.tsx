import React from 'react';
import logo from './logo.svg';
import Horoscope from './Horoscope';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Horoscope/>
      </header>
    </div>
  );
}

export default App;
