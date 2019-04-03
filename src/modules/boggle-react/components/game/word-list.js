import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import { Typography, Grid, Divider } from '@material-ui/core'

import { getS } from '../../helpers'

export const getWordGrid = (guessedWords, goodWords) => {
  return guessedWords.slice().reverse().map(guessed => {
    const goodWord = goodWords.find(item => item.word === guessed)
    if (goodWord) {
      return <Grid container spacing={8} key={guessed}>
        <Grid item xs><Typography variant='display1' gutterBottom color='primary'>{goodWord.word}</Typography></Grid>
        <Grid item xs><Typography variant='display1' gutterBottom >{goodWord.points} point{getS(goodWord.points)}</Typography></Grid>
      </Grid>
    } else {
      return <Typography key={guessed} variant='display1' gutterBottom color='secondary' >{guessed}</Typography>
    }
  })
}

class WordList extends React.Component {
    static contextType = BoggleContext

    render () {
      const { board, playerType, points, pointsOpponent } = this.context
      const { guessedWords, goodWords } = board

      const yourTurn = playerType === board.currentTurn
      const currentPoints = yourTurn ? points : pointsOpponent

      return (
        <Fragment>
          <Typography gutterBottom variant='h4'>{currentPoints} point{getS(currentPoints)}</Typography>
          <Divider />
          <div
            style={
                !this.props.fullHeight ? {
                marginTop: 12,
                maxHeight: 300,
                overflowY: 'auto',
                overflowX: 'hidden'
            } : {}}
                >
            {
                getWordGrid(guessedWords, goodWords)
            }
          </div>
        </Fragment>
      )
    }
}

WordList.propTypes = {
  fullHeight: PropTypes.bool
}

export default WordList
