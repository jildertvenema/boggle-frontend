import React, { Fragment } from 'react'

import BoggleContext from '../../context'

import { withRouter } from 'react-router'

import { Typography, Grid, Divider } from '@material-ui/core'

class Room extends React.Component {
    static contextType = BoggleContext

    componentDidMount () {
      this.context.actions.getScores()
    }

    render () {
      const { scores } = this.context
      return (
        <div>
          {
            scores && scores.map(score => <Fragment>
              <Grid container spacing={8} style={{ marginTop: 12 }}>
                <Grid item xs={12}>
                  <Typography variant='headline' gutterBottom >Host: {score.host} points</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='headline' gutterBottom >Player: {score.player} points</Typography>
                </Grid>
              </Grid>
              <Divider />
            </Fragment>
            )
        }
        </div>
      )
    }
}

export default withRouter(Room)
