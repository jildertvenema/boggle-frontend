import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

class Timer extends React.Component {
    state = {
      timeLeft: 20
    }

    componentDidMount () {
      this.timer = setInterval(() => this.setState({ timeLeft: this.getSecondsLeft() }), 200)
    }

    componentWillUnmount () {
      clearInterval(this.timer)
    }

    componentDidUpdate () {
      if (this.state.timeLeft <= 0) {
        this.props.onFinish()
      }
    }

    getSecondsLeft = () => Math.round((new Date(this.props.endTime) - new Date()) / 1000)

    render () {
      const { timeLeft } = this.state
      return (
        <Typography variant='h4' style={{ marginBottom: 12 }}>{Math.max(timeLeft, 0)} seconds left</Typography>
      )
    }
}

Timer.propTypes = {
  endTime: PropTypes.number,
  onFinish: PropTypes.func
}

export default Timer
