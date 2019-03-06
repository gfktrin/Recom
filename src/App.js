import React, { Component } from 'react';

import Header from './components/header/header';
import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Layout />
      </div>
    );
  }
}

export default App;
