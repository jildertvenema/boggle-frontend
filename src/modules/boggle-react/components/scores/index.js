import React, { Fragment } from 'react'

import BoggleContext from '../../context'
import { getS } from '../../helpers'

import { withRouter } from 'react-router'

import { Typography, Grid, Divider } from '@material-ui/core'
import Loader from '../page/loader'

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
            !scores || scores.length === 0 ? <Loader /> : scores.sort((a, b) => Math.max(b.host || 0, b.player || 0) - Math.max(a.host || 0, a.player || 0)).map((score, i) => <Fragment key={i}>
              <Grid container spacing={8} style={{ marginTop: 12 }}>
                <Grid item xs={12}>
                  <Typography variant='headline' gutterBottom >{score.hostName}: {score.host} point{getS(score.host)}</Typography>
                </Grid>
                {
                  score.player && <Grid item xs={12}>
                    <Typography variant='headline' gutterBottom >{score.playerName}: {score.player} point{getS(score.player)}</Typography>
                  </Grid>
                }
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
