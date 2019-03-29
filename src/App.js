import React from 'react';
import Websocket from 'react-websocket';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  Button: {
    margin: 12
  },
  letter: {
    margin: 8
  }
});

class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      room: {},
      board: {
        board: []
      },
      wordToCheck: ''
    };
  }

  create = () => {
    this.sendMessage('createRoom', {})
  }

  checkWord = () => {
    this.sendMessage('checkWord', { word: this.state.wordToCheck })
  }

  handleData = (data) => {
    let result = JSON.parse(data);
    console.log(result)
    this.setState(result);
  }

  sendMessage = (action, options) => {
    this.refWebSocket.sendMessage(JSON.stringify({ action, options }));
  }

  joinRoom = () => {
    this.sendMessage('joinRoom', { sessionID: this.state.wordToCheck })
  }

  start = () => {
    this.sendMessage('startGame', {})
  }

  render() {
    // const { room, rooms } = this.state
    const { classes } = this.props

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Boggle
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper className={classes.root} elevation={1}>
          {this.state.sessionID}
          <h4>{this.state.error}</h4>
          <h3>points: {this.state.points}</h3>
          <br />
          <Websocket url='ws://localhost:3200'
              ref={Websocket => {
                this.refWebSocket = Websocket;
              }}
              onMessage={this.handleData}/>
              
            
              {              
              this.state.board.board.map((row, rowI) => <div style={{ width: 400 }}><Grid container key={rowI}>
                {
                  row.map((item, i) => <Grid xs><Fab color="primary" style={{marginBottom: 12 }}>{item}{'\t'}</Fab ></Grid>)
                }
                </Grid></div>
                )
              }

            <TextField variant='outlined' onChange={e => this.setState({ wordToCheck: e.target.value })}/>
            <br />
            <Button className={classes.Button} variant="contained" color="primary" onClick={this.checkWord}>Check</Button>
            <Button className={classes.Button} variant="contained" color="primary" onClick={this.create}>Create</Button>
            <Button className={classes.Button} variant="contained" color="primary" onClick={this.joinRoom}>Join</Button>

            <Button className={classes.Button} variant="contained" color="primary" onClick={this.start}>Start</Button>
          </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ProductDetail);