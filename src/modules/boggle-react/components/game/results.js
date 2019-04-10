import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import { withRouter } from 'react-router'

import { Typography, Grid } from '@material-ui/core'
import Button from '../page/button'

import withRedirectIfNoSession from '../../hoc/with-redirect-if-no-session'
import WordList from './word-list'

class Results extends React.Component {
    static contextType = BoggleContext

    getAction = () => {
      const { board, actions } = this.context
      if (board.currentRound < board.totalRounds || (board.currentTurn === 'host' && !board.singlePlayer)) {
        return <Button onClick={() => actions.startGame()}>{board.singlePlayer ? 'Next round' : 'My turn'}</Button>
      } else {
        return <Button onClick={this.finishGame}>Finish</Button>
      }
    }

    finishGame = () => {
      this.context.actions.finishGame()
    }

    checkRedirect = () => {
      if (this.context.gameStarted) {
        this.props.history.push('/game')
      }
      if (this.context.gameFinshed) {
        this.props.history.push('/finish')
      }
    }

    componentDidUpdate () {
      this.checkRedirect()
    }

    componentDidMount () {
      this.checkRedirect()
    }

    render () {
      const { playerType, board } = this.context

      const yourTurn = playerType === board.currentTurn

      return (
        <Fragment>
          <Typography variant='headline' gutterBottom >{yourTurn ? 'Your' : 'Your opponents'} results of round {board.currentRound}</Typography>
          {
            (!yourTurn || board.singlePlayer) && <Grid container direction='row' justify='flex-end' spacing={8}>
              <Grid item>
                {
                  this.getAction()
                }
              </Grid>
            </Grid>
          }
          <WordList fullHeight />
        </Fragment>
      )
    }
}

Results.propTypes = {
  history: PropTypes.object
}

export default withRedirectIfNoSession(withRouter(Results))
