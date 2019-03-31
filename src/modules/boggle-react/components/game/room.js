import React from 'react'

import BoggleContext from '../../context'

import { withRouter } from 'react-router'

import { Typography } from '@material-ui/core'

import Gif, { Waiting } from '../page/gif';

class Room extends React.Component {
    static contextType = BoggleContext
    
    componentDidMount() {
        if (!this.context.sessionID) {
            this.props.history.push('/')
        }
    }

    componentDidUpdate() {
        if (this.context.readyToPlay) {
            this.props.history.push('/settings')
        }
    }

    render() {
        const { sessionID } = this.context
        return (
            <div>
                <Typography variant='h2' gutterBottom >{sessionID}</Typography>
                <Typography variant='headline' gutterBottom >Give this code to your friend, he knows what to do..</Typography>
                <Gif src={Waiting} />
            </div>
        )
    }
}

export default withRouter(Room)