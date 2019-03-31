import React from 'react'

import HostJoinChoice from './host-join-choice'
import WaitRoom from './room'
import JoinRoom from './join'
import BoggleBoardGame from './boggle-board-game'
import Disconnected from '../page/disconnected'
import Settings from './settings'
import Results from './results'
import Finished from './finished'

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
                        <Route path='/settings' exact component={Settings} />
                        <Route path='/results' exact component={Results} />
                        <Route path='/finish' exact component={Finished} />
                        <Route path='/disconnected' exact component={Disconnected} />
                    </CardContent>
                </Card>
            </Router>
        )
    }
}

export default Game