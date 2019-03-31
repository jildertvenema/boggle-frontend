import React, { Fragment } from 'react'

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
        if (board.currentRound < board.totalRounds || board.currentTurn === 'host') {
            return <Button onClick={() => actions.startGame()}>My turn</Button>
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

    componentDidUpdate() {
        this.checkRedirect()
    }

    componentDidMount () {
        this.checkRedirect()
    }

    render() {
        const { sessionID, playerType, board } = this.context
        
        console.log(this.context)

        const yourTurn = playerType === board.currentTurn
        const isHost = playerType === 'host'

        return (
            <Fragment>
                <Typography variant='headline' gutterBottom >{yourTurn ? 'Your' : 'Your opponents'} results of round {board.currentRound}</Typography>
                <WordList fullHeight/>
                {
                    !yourTurn && <Grid container direction='row' justify='flex-end' spacing={8}>
                        <Grid item>
                            {
                                this.getAction()
                            }
                        </Grid>
                    </Grid>
                }
            </Fragment>
        )
    }
}

export default withRedirectIfNoSession(withRouter(Results))