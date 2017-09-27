import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainDisplayContainer from './components/MainDisplayContainer'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route } from 'react-router-dom'


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
            <Route path="/" render={(props) => <Navbar {...props}/>} />
            <MainDisplayContainer />
            <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
