import React from 'react'

import BoggleContext from './context'
import Boggle from '../boggle'

import BasePage from './components/page/base-page'
import PageContent from './components/page/page-content'

import Game from './components/game'
import Loader from './components/page/loader'

class BoggleProvider extends React.Component {
    constructor () {
        super()
        this.boggle = {}
    }

    initialState = {  
        points: 0,
        connected: false,
        selectedLetters: [],
        pointsOpponent: 0,
        readyToPlay: false
    }

    state = this.initialState

    componentDidMount() {
        this.setState(this.initialState)
        this.boggle = new Boggle(this.onMessage, this.setState({ connected: true }), console.log)
    }

    onMessage = data => {
        this.setState(data)
    }


    joinGame = () => {
        this.setState({
            joinGame: true
        })
    }


    render() {
        const { connected } = this.state
        console.log(connected)
        return (
            <BoggleContext.Provider value={{
                ...this.state,
                actions: this.boggle.actions
            }}>
                <BasePage>
                    <PageContent>
                        { !connected ? <Loader /> : <Game /> }
                    </PageContent>
                </BasePage>
            </BoggleContext.Provider>
        )
    }
}

export default BoggleProvider