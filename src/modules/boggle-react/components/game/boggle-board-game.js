import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import { Typography, Grid } from '@material-ui/core'

import Board from './board'
import Timer from './timer'
import WordList from './word-list'

import { arrayContainsPoint } from '../../helpers'

import { withRouter } from 'react-router'

import Loader from '../page/loader'
import Button from '../page/button'
import Blocker from '../page/blocker'

class Join extends React.Component {
    static contextType = BoggleContext

    constructor () {
      super()
      this.prevPoints = 0
    }

    state = {
      gameId: '',
      selected: [],
      timeLeft: 20
    }

    componentDidMount () {
      if (!this.context.board) {
        this.props.history.push('/')
      }
      this.context.actions.selectedLetters([])
      this.setState({ selected: [] })
    }

    onSelect = pos => {
      let selected = []

      const index = arrayContainsPoint(this.state.selected, pos)

      if (this.state.selected.length === 0) {
        selected = [pos]
      } else if (index > -1) {
        selected = this.state.selected.slice(0, index)
      } else {
        selected = this.state.selected.concat(pos)
      }

      this.context.actions.selectedLetters(selected)

      this.setState({ selected })
    }

    clearLetters = () => {
      this.context.actions.selectedLetters([])
      this.setState({ selected: [] })
    }

    setSelected = selected => {
      this.setState({ selected })
    }

    componentDidUpdate () {
      if (this.context.points !== this.prevPoints) {
        this.prevPoints = this.context.points
        this.setSelected([])
      }
      if (this.context.opponentDisconnected) {
        this.props.history.push('/disconnected')
      }
      if (!this.context.gameStarted) {
        this.props.history.push('/results')
      }
    }

    checkWord = word => {
      this.context.actions.checkWord(word)
      this.clearLetters()
    }

    render () {
      const { selected } = this.state
      const { board, playerType } = this.context

      if (!board) {
        return <Loader />
      }

      const yourTurn = playerType === board.currentTurn
      const endTime = board.endTime

      const selectedLetters = !yourTurn ? this.context.selectedLetters : selected

      const word = selectedLetters.map(item => board.board[item.x][item.y]).join('')

      return (
        <Fragment>
          {
            !yourTurn && <Blocker />
          }
          <Typography style={{ maxWidth: 310 }} variant='h4'>{yourTurn ? `It's your turn!` : `Please wait for your opponent..`}</Typography>

          {
            endTime && <Timer endTime={endTime} onFinish={console.log} />
          }

          <Board onSelect={this.onSelect} selected={selectedLetters} />

          <Typography style={{ height: 50, wordBreak: 'break-all', margin: 8 }} variant='h3'>{word}</Typography>

          {
            yourTurn && <Grid container direction='row' justify='flex-end' spacing={8} style={{ marginBottom: 12 }}>
              <Grid item>
                <Button color='secondary' onClick={() => this.checkWord(word)}>Check</Button>
              </Grid>
              <Grid item>
                <Button onClick={this.clearLetters}>Clear</Button>
              </Grid>
            </Grid>
          }
          <WordList />
        </Fragment>
      )
    }
}

Join.propTypes = {
  history: PropTypes.any
}

export default withRouter(Join)
