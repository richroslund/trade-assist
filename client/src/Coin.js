import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import socketIOClient from "socket.io-client";
export class Coin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      price: -1
    };
    
  }
  componentDidMount() {
    const socket = socketIOClient('http://localhost:3030');
    this.setState({socket: socket});
    socket.on('price update', (data) => {
      this.setState( {
        ...this.state,
        price: parseFloat(data['ETHUSDT']).toFixed(2)});
    })
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  render(){
     const {price} = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Ethereum</CardTitle>
            <CardSubtitle>Price: {price}</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  };