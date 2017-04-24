import React, { Component } from 'react';
import circleLogo from './mets-circle-logo.png';
import scriptLogo from './mets-script-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="question-container">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="did-the">
            Did the
          </div>
          <div className="mets-logo"><img src={scriptLogo} className="circle-logo" alt="logo" /></div>
          <div className="hit-a-homerun">
            hit a home run today?
          </div>
        </div>
      </div>
    );
  }
}

export default App;
