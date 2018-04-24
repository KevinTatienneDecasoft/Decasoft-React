import React, { Component } from 'react';
import logo from './logo.svg';
import logoMyWC from './image/logoMyWC.png';
import './App.css';
import NavigationComponent from './components/NavigationComponent/Navigation';
import LoginComponent from './components/LoginComponent/Login';
import FindDriverComponent from './components/FindDriverComponent/FindDriver';
import MessageComponent from './components/MessageComponent/Message';
import ListDestinatorComponent from './components/ListDestinatorComponent/ListDestinator';
import ListMessageComponent from './components/ListMessageComponent/ListMessage';
import ProfilComponent from './components/ProfilComponent/Profil';

import DestinatorComponent from './components/DestinatorComponent/Destinator';

const imageStyle = {
      width: '100%'
};

const session = localStorage.getItem("session");

class App extends Component {

  constructor() {
    super();
  }

  if(session) {
    console.log("connected !");
  }
  


  render() {
    return (
      <div className="App">
        <NavigationComponent />

        <img src={logoMyWC} style={imageStyle} alt="logoMyWC"  />
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MyWorkCar to React</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <FindDriverComponent />
        <div className="container-fluid">
          <ProfilComponent />
          <ListDestinatorComponent />
        </div>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
      </div>
    );
  }
}

export default App;
