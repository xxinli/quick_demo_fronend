import React, { Component } from 'react';
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';
import { CompanyTable } from './components/dashboard';

class App extends Component {
  state = {
    data: [],
    init: false
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.items, init: true }))
    .catch(err => console.log(err));
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
callBackendAPI = async () => {
  return fetch('/api/company', {
    method: 'get'
  }).then(res => res.json());
};

render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit11 <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.init && 
          <CompanyTable
            items={this.state.data}
         />
        }
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <p className="App-intro">{this.state.data}</p> */}
    </div>
  );
}
  
}

export default App;
