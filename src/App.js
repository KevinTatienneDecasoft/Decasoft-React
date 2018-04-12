import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavigationComponent from './components/NavigationComponent/Navigation';
import LoginComponent from './components/LoginComponent/Login';
import MapComponent from './components/MapComponent/Map';
import AroundMeComponent from './components/AroundMeComponent/AroundMe';
import AboutComponent from './components/AboutComponent/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationComponent />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MyWorkCar to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
      </div>
    );
  }
}

export default App;
