import React from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import { withRouter } from 'react-router'

import { Typography, Grid } from '@material-ui/core'

import Button from '../page/button'
import TextField from '../page/text-field'
import { isMobile } from '../../helpers'

class Room extends React.Component {
    static contextType = BoggleContext

    componentDidMount () {
      if (!this.context.sessionID || !this.context.readyToPlay) {
        this.props.history.push('/')
      }
    }

    state = {
      totalRounds: this.context.totalRounds,
      playTime: this.context.playTime,
      name: ''
    }

    handleChange = (key, value) => {
      this.setState({ [key]: value })
    }

    componentDidUpdate () {
      if (this.context.opponentDisconnected) {
        this.props.history.push('/disconnected')
      }
      if (this.context.gameStarted) {
        this.props.history.push('/game')
      }
    }

    startGame = () => {
      const { actions } = this.context
      const { name } = this.state

      actions.setName(name || 'Anonymous boggler')
      actions.startGame()
    }

    render () {
      const { playerType } = this.context
      const { totalRounds, playTime, name } = this.state

      const isHost = playerType === 'host'

      return (
        <div>
          <Typography variant='h2' gutterBottom >Game settings</Typography>

          <TextField
            autoFocus
            label='Your name'
            fullWidth={isMobile()}
            onChange={e => this.setState({ name: e.target.value })}
            value={name}
          />

          <TextField fullWidth={isMobile()} InputProps={{ inputProps: { min: 20, max: 120 } }} type='number' label='Round play time' value={playTime} onChange={(e) => this.handleChange('playTime', e.target.value)} />
          <TextField fullWidth={isMobile()} InputProps={{ inputProps: { min: 1, max: 10 } }} type='number' label='Total rounds' value={totalRounds} onChange={(e) => this.handleChange('totalRounds', e.target.value)} />

          {
            isHost && <Grid container direction='row' justify='flex-end'>
              <Grid item>
                <Button onClick={this.startGame}>Start</Button>
              </Grid>
            </Grid>
            }

        </div>
      )
    }
}

Room.propTypes = {
  history: PropTypes.object
}

export default withRouter(Room)
