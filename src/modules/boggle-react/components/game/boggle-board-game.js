import React, { Fragment } from 'react'

import BoggleContext from '../../context'

import { Typography, Grid } from '@material-ui/core'

import Board from './board'
import Timer from './timer'

import { arrayContainsPoint } from '../../helpers'

import { withRouter } from 'react-router'

import Loader from '../page/loader'
import Button from '../page/button'
import Blocker from '../page/blocker'


class Join extends React.Component {
    static contextType = BoggleContext

    constructor() {
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
    }

    onSelect = pos => {

        let selected = []

        if (arrayContainsPoint(this.state.selected, pos)) {
            selected = this.state.selected.slice(0, this.state.selected.length - 1)
        } else {
            selected = this.state.selected.concat(pos)
        }
        
        this.context.actions.selectedLetters(selected)

        this.setState({ selected })
    }

    componentDidUpdate () {
        if (this.context.points !== this.prevPoints) {
            this.prevPoints = this.context.points
            this.setState({ selected: [] })
        }
    }

    render() {
        const { gameId, selected } = this.state
        const { actions, board, points, playerType, selectedLetters } = this.context

        if (!board) {
            return <Loader />
        }
        
        const yourTurn = playerType === board.currentTurn

        const endTime = board.endTime
        const word = (!yourTurn ? selectedLetters : selected).map(item => board.board[item.x][item.y]).join('')

        return (
           <Fragment>
               {
                   !yourTurn && <Blocker />
               }
                <Typography variant='h4'>{points} points</Typography>
                <Typography variant='h4'>{yourTurn ? `It's your turn!` : `Please wait for your opponent..`}</Typography>

                {
                    endTime && <Timer endTime={endTime}/>
                }


                <Board onSelect={this.onSelect} selected={yourTurn ? selected : selectedLetters} />

                <Typography variant='h3'>{word}</Typography>

                {
                    yourTurn && <Grid container direction='row' justify='flex-end' spacing={8}>
                        <Grid item>
                            <Button color='secondary' onClick={() => actions.checkWord(word)}>Check</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => this.setState({ selected: [] })}>Clear</Button>
                        </Grid>
                    </Grid>
                }
            </Fragment>
        )
    }
}

export default withRouter(Join)