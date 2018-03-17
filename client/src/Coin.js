import React from 'react';

import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
class Coin extends React.Component{
  
  render(){
     const {price, ticker, digit=2} = this.props;
     let cleanPrice = price===-1?0:price.toFixed(digit);
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{ticker}</CardTitle>
            <CardSubtitle>Price: {cleanPrice}</CardSubtitle>
            <CardText></CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  }
  const ConnectedCoin = connect((state, ownProps) => {
    const {ticker} = ownProps;
    let price = ticker && state.coins && state.coins[ticker] ? state.coins[ticker].price:-1;
    return {
      ...ownProps,
      price,
      ticker
    }
  },{})(Coin);
  export default ConnectedCoin;