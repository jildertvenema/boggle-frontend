import React from 'react'

import HostJoinChoice from './host-join-choice'
import WaitRoom from './room'
import JoinRoom from './join'
import BoggleBoardGame from './boggle-board-game'
import Disconnected from '../page/disconnected'
import Settings from './settings'
import Results from './results'
import Finished from './finished'
import Scores from '../scores'

import { HashRouter as Router, Route } from 'react-router-dom'
import { Card, CardContent } from '@material-ui/core'

class Game extends React.Component {
  render () {
    return (
      <Router basename='/boggle'>
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
            <Route path='/scores' exact component={Scores} />
          </CardContent>
        </Card>
      </Router>
    )
  }
}

export default Game
