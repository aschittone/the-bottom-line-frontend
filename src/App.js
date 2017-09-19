import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainDisplayContainer from './components/MainDisplayContainer'
import Navbar from './components/Navbar'


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <MainDisplayContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
