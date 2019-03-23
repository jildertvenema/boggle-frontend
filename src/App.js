import React from 'react';
import Websocket from 'react-websocket';

class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      room: {}
    };
  }

  handleData = (data) => {
    let result = JSON.parse(data);
    console.log(result)
    this.setState(result);
  }

  sendMessage = (action, options) => {
    this.refWebSocket.sendMessage(JSON.stringify({ action, options }));
  }

  joinRoom = roomName => {
    this.sendMessage('joinRoom', { roomName })
  }

  render() {
    const { room, rooms } = this.state
    return (
      <div>
        <Websocket url='ws://localhost:3200'
            ref={Websocket => {
              this.refWebSocket = Websocket;
            }}
            onMessage={this.handleData}/>
            {
              room.roomName && `${room.roomName} (${room.count})`
            }
            {
             rooms.map(room => <div key={room.roomName}><button onClick={() => this.joinRoom(room.roomName)}>{`${room.roomName} (${room.count})`}</button></div>)
            }
      </div>
    );
  }
}

export default ProductDetail;