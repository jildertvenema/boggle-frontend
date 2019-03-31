import React, { Fragment } from 'react'

import BoggleContext from '../../context'

import { Typography, Grid } from '@material-ui/core'

import { withRouter } from 'react-router'

import TextField from '../page/text-field'
import Button from '../page/button'

class Join extends React.Component {
    static contextType = BoggleContext
    
    state = {
        gameId: ''
    }

    componentDidUpdate () {
        if (this.context.readyToPlay) {
            this.props.history.push('/settings')
        }
    }

    onJoin = () => {
        const { gameId } = this.state
        const { actions } = this.context
        if (gameId) {
            actions.joinSession(gameId.toLowerCase())
        }
    }

    render() {
        const { gameId } = this.state
        return (
           <Fragment>
               <Typography variant='headline'>Ask your friend for a secret code..</Typography>
               <TextField
                    autoFocus
                    label='Game id'
                    onChange={e => this.setState({ gameId: e.target.value })}
                    value={gameId}
                />
               <Grid container direction='row' justify='flex-end'>
                    <Grid item>
                        <Button onClick={this.onJoin}>Join</Button>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withRouter(Join)