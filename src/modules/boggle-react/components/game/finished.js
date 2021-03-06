import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'
import { Grid, Typography } from '@material-ui/core'

import Button from '../page/button'

import { withRouter } from 'react-router'
import { getWordGrid } from './word-list'

import withRedirectIfNoSession from '../../hoc/with-redirect-if-no-session'
import Gif, { Draw, Win, Lose } from '../page/gif'

class Finished extends React.Component {
    static contextType = BoggleContext

    render () {
      const { points, pointsOpponent, board, playerType } = this.context

      const tie = points === pointsOpponent
      const win = points > pointsOpponent

      return (
        <Fragment>
          <Typography variant='display2' gutterBottom >{tie ? `It's a tie!` : win ? 'You have won!' : 'You have lost..'}</Typography>

          <Typography variant='display1' gutterBottom >{points} points</Typography>

          <Gif src={tie ? Draw : win ? Win : Lose} />

          <Grid container direction='row' justify='flex-end' spacing={8} style={{ marginTop: 12 }}>
            <Grid item>
              <Button onClick={() => this.props.history.push('/scores')}>To score board</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.props.history.push('/')}>Menu</Button>
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            {
              board.previousRounds.filter(round => round.playerType === playerType).map(round =>
                getWordGrid(round.guessedWords, round.goodWords)
              )
            }
          </Grid>
        </Fragment>
      )
    }
}

Finished.propTypes = {
  history: PropTypes.object
}

export default withRedirectIfNoSession(withRouter(Finished))
