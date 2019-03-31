import React, { Fragment } from 'react'

import BoggleContext from '../../context'

import { Typography, Grid, Divider } from '@material-ui/core'

import Loader from '../page/loader'
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

    render() {
        const { sessionID, board, playerType, points, pointsOpponent } = this.context
        const { guessedWords, goodWords } = board

        const yourTurn = playerType === board.currentTurn
        const currentPoints = yourTurn ? points : pointsOpponent

        console.log(guessedWords, goodWords)
        return (
            <Fragment>
                <Typography gutterBottom variant='h4'>{currentPoints} point{getS(currentPoints)}</Typography>
                <Divider />
                <div 
                    style={!this.props.fullHeight ?{
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

export default WordList