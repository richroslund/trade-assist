import React, { Component } from 'react';
import {Container} from 'reactstrap';
import {Coin} from './Coin';
import './App.css';

class App extends Component {
  render() {
    return (
    <Container>
        <Coin price={600}/>
      </Container>
    );
  }
}

export default App;
