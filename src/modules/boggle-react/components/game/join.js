import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import { Typography, Grid } from '@material-ui/core'

import { withRouter } from 'react-router'

import TextField from '../page/text-field'
import Button from '../page/button'
import Gif, { Secret } from '../page/gif'
import { isMobile } from '../../helpers'

import Kahoot from '../../../../files/kahoot.mp3'
import Sound from '../../../../sound'

class Join extends React.Component {
    static contextType = BoggleContext

    state = {
      gameId: '',
      name: ''
    }

    componentDidUpdate () {
      if (this.context.readyToPlay) {
        this.props.history.push('/settings')
      }
    }

    onJoin = () => {
      const { gameId, name } = this.state
      const { actions } = this.context

      if (gameId.toLowerCase() === 'kahoot') {
        var music = new Sound(Kahoot, 100, true);
        music.start();
      }

      // Set player name
      actions.setName(name || 'Anonymous boggler')

      if (gameId) {
        actions.joinSession(gameId.toLowerCase())
      }
    }

    render () {
      const { gameId, name } = this.state
      const { history } = this.props

      return (
        <Fragment>
          <Typography variant='headline'>Ask your friend for a secret code..</Typography>
          <Gif src={Secret} />
          <TextField
            autoFocus
            label='Your name'
            fullWidth={isMobile()}
            onChange={e => this.setState({ name: e.target.value })}
            value={name}
          />
          <TextField
            autoFocus
            label='Game id'
            fullWidth={isMobile()}
            onChange={e => this.setState({ gameId: e.target.value })}
            value={gameId}
          />
          <Grid container direction='row' justify='flex-end' spacing={8} style={{ marginTop: 12 }}>
            <Grid item>
              <Button onClick={this.onJoin}>Join</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => history.push('/')}>Back</Button>
            </Grid>
          </Grid>
        </Fragment>
      )
    }
}

Join.propTypes = {
  history: PropTypes.object
}

export default withRouter(Join)
