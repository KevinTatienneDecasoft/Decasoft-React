import React, { Component } from 'react';

class Session extends Component {

  setSession(value) {
    localStorage.setItem("session", value);
  }

  removeSession() {
      localStorage.removeItem("session");
  }

  getSession() {
      return localStorage.getItem("session");
  }
  
}

export default Session;
