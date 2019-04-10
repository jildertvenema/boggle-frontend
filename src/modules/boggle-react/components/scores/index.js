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

    getTopThree = scores => {
      const result = []
      scores.forEach(score => {
        result.push({ name: score.hostName, points: score.host })
        if (score.player) {
          result.push({ name: score.playerName, points: score.player })
        }
      })
      
      return result.sort((a, b) => b.points - a.points).slice(0, 3)
    }

    render () {
      const { scores } = this.context
      const sortedScores = scores && scores.sort((a, b) => Math.max(b.host || 0, b.player || 0) - Math.max(a.host || 0, a.player || 0)) 
      return (
        <div>
          <Typography style={{ marginBottom: 4 }} variant='h4'>Best bogglers in the world 🌎</Typography>
          <Typography style={{ marginBottom: 12 }} variant='subheading'>(The number one gets free cake at the end)</Typography>
          <Divider />
          {
            sortedScores && <Grid container spacing={8} style={{ marginTop: 12 }}>
              {
                this.getTopThree(sortedScores).map((score, i) => <Fragment>
                  <Grid key={i} item xs={1}/>
                 <Grid key={i} item xs={2}><Typography style={{ float: 'left' }} variant='headline'>{i === 0 ? '1st. 🏆\t' : i === 1 ? '2nd.🥈\t' : i === 2 ? '3th.  🥉\t' : ''}</Typography></Grid>
                 <Grid key={i} item xs={6}><Typography style={{ float: 'left' }} variant='headline'>{score.name}</Typography></Grid>
                 <Grid key={i} item xs={3}><Typography style={{ float: 'left', fontWeight: 'bold' }} variant='title'>{score.points}</Typography></Grid>
                </Fragment>)
              }
            </Grid>
          }
          <Divider />
          <Typography style={{ marginTop: 60, marginBottom: 24 }} variant='h4'>Overall scores</Typography>
          <Divider />
          {
            !scores || scores.length === 0 ? <Loader /> : sortedScores.map((score, i) => <Fragment key={i}>
              <Grid container spacing={8} style={{ marginTop: 12 }}>
                <Grid item xs={12}>
                  <Typography variant='headline' style={ score.player > score.host ? {textDecoration: 'line-through'} : {}} gutterBottom >{score.hostName}: {score.host} point{getS(score.host)}</Typography>
                </Grid>
                {
                  score.player && <Grid item xs={12}>
                    <Typography variant='headline' style={ score.host > score.player ? {textDecoration: 'line-through'} : {}} gutterBottom >{score.playerName}: {score.player} point{getS(score.player)}</Typography>
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
