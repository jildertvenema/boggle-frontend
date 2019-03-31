import React from 'react'

import BoggleContext from '../context'

const withRedirectIfNoSession = Comp => {
    return class extends React.Component {
        static contextType = BoggleContext

  
        componentDidMount() {
            this.checkSession()
        }

        componentDidUpdate() {
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

        render() {
            return this.context.sessionID ? <Comp  {...this.props} /> : null
        }
    }
  }

export default withRedirectIfNoSession