import React, { Component } from 'react';

import Coin from './Coin';
import { Provider, connect } from 'react-redux';
import {Row, Col, Container} from 'reactstrap';
import _ from 'lodash';
import {updatePrice} from './actions';

import socketIOClient from "socket.io-client";
//import DevTools from './DevTools';
class CoinList extends Component {
  componentDidMount() {
    const socket = socketIOClient('http://localhost:3030');
    this.setState({socket: socket});
    socket.on('price update', (data) => {
      _.forEach(data, (v, k) => {
        this.props.updatePrice(k, parseFloat(v));
      });
  });
  }
  render() {
    return (
      <Container>
          <Row>
          <Col><Coin ticker={'BTCUSDT'}/></Col>
          <Col><Coin ticker={'ETHUSDT'}/></Col>
          <Col><Coin ticker={'GVTETH'} digit={5}/></Col>
          <Col><Coin ticker={'FUNETH'} digit={7}/></Col>
          <Col><Coin ticker={'REQETH'} digit={7}/></Col>
        </Row>
            
          </Container>
    );
  }
}

const ConnectedCoinList = connect(() => {return {}},(dispatch) =>{
  return {
    updatePrice: (ticker, price) => dispatch(updatePrice(ticker, price))
  }
})(CoinList);

class App extends Component {
  
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <ConnectedCoinList />
      </Provider>
      );
  }
}

export default App;
