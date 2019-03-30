import React from 'react'

import HostJoinChoice from './host-join-choice'
import WaitRoom from './room'
import JoinRoom from './join'
import BoggleBoardGame from './boggle-board-game'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Card, CardContent } from '@material-ui/core'

class Game extends React.Component {
    render() {
        return (
            <Router>
                <Card>
                    <CardContent>
                        <Route path='/' exact component={HostJoinChoice} />
                        <Route path='/room' exact component={WaitRoom} />
                        <Route path='/join' exact component={JoinRoom} />
                        <Route path='/game' exact component={BoggleBoardGame} />
                    </CardContent>
                </Card>
            </Router>
        )
    }
}

export default Game