import React from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../context'

const withRedirectIfNoSession = Comp => {
  class WithRedirectIfNoSession extends React.Component {
    static contextType = BoggleContext

    componentDidMount () {
      this.checkSession()
    }

    componentDidUpdate () {
      this.checkSession()
    }

    checkSession = () => {
      if (this.context.opponentDisconnected) {
        this.props.history.push('/disconnected')
      }
      if (!this.context.sessionID) {
        this.props.history.push('/')
      }
    }

    render () {
      return this.context.sessionID ? <Comp {...this.props} /> : null
    }
  }
  WithRedirectIfNoSession.propTypes = {
    history: PropTypes.object
  }
  return WithRedirectIfNoSession
}

export default withRedirectIfNoSession
