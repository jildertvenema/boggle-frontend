import React from 'react'
import { Typography } from '@material-ui/core'

class Timer extends React.Component {

    state = {
        timeLeft: 20
    }

    componentDidMount () {
        this.timer = setInterval(() => this.setState({ timeLeft: this.getSecondsLeft() }), 200);
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    getSecondsLeft = () => Math.round((new Date(this.props.endTime) - new Date()) / 1000)

    render() {
        const { timeLeft } = this.state
        return (
            <Typography variant='h4'>{timeLeft} seconds left</Typography>
        )
    }
}

export default Timer