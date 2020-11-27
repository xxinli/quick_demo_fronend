import React, { Component } from 'react';
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';
import { CompanyTable } from './components/dashboard';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
callBackendAPI = async () => {
  return fetch('/company', {
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
        <CompanyTable
        items={[
          { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
          { id: 2, name: 'Milk', price: 1.9, stock: 32 },
          { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
          { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
          { id: 5, name: 'Butter', price: 0.9, stock: 99 },
          { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
          { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
        ]}
      />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p className="App-intro">{this.state.data}</p>
    </div>
  );
}
  
}

export default App;
