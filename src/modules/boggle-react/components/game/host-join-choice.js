import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '../page/button'

import BoggleContext from '../../context'
import { Grid, Typography } from '@material-ui/core'

import { withRouter } from 'react-router'
import HourGlass from '../page/hour-glass'

class HostJoin extends React.Component {
    static contextType = BoggleContext

    componentDidUpdate () {
      if (this.context.sessionID) {
        this.props.history.push('/room')
      }
    }

    render () {
      const actions = this.context.actions
      return (
        <Fragment>
          <Typography variant='headline' gutterBottom >Do you want to host or join a game?</Typography>
          <HourGlass />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Button onClick={() => this.props.history.push('/scores')}>Score board</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => actions.createSession()}>Host game</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => this.props.history.push('/join')}>Join game</Button>
            </Grid>
          </Grid>
        </Fragment>
      )
    }
}

HostJoin.propTypes = {
  history: PropTypes.object
}

export default withRouter(HostJoin)
