import React from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import styled from 'styled-components'

import { Grid, Typography } from '@material-ui/core'
import Letter from './letter'

import { arrayContainsPoint, pointsTouch } from '../../helpers'

const Container = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
    width: 300px;
    margin:  0 auto;
`

const RandomizeLetters = 30
const abc = 'abcdefghijklmnopqrstuvwxyz'

class Board extends React.Component {
    static contextType = BoggleContext

    state = {
      random: 0
    }

    componentDidMount () {
      this.interval = setInterval(
        () => this.setState({ random: this.state.random + 1 }),
        100
      )
    }

    componentDidUpdate () {
      if (this.state.random >= RandomizeLetters) {
        clearInterval(this.interval)
      }
    }

    componentWillUnmount () {
      clearInterval(this.interval)
    }

    getCurrentY = (x, i) => {
      let current = 0
      while (i >= 5 && current <= x) {
        current++
        i -= 5
      }
      return i
    }

    render () {
      const { board } = this.context
      const { selected } = this.props
      return (
        <Container >
          <div style={{ height: board.board.length * 50 }}>
            {
              board.board.slice(0, this.state.random / 5).map((row, x) => (
                <Grid container spacing={8} key={x}>
                  {
                  row.slice(0, this.getCurrentY(x, this.state.random))
                  .map((item, y) => {
                      const selectedItem = arrayContainsPoint(selected, { x, y }) > -1
                      const disabled = selected.length > 0 && !selectedItem && !pointsTouch({ x, y }, selected[selected.length - 1])

                      return <Grid item key={x * board.board.length + y}>
                        <Letter
                          color={selectedItem ? 'secondary' : 'primary'}
                          onClick={() => this.props.onSelect({ x, y })}
                          disabled={disabled}
                              >
                          <Typography variant='display1'>
                            {this.state.random <
                            RandomizeLetters -
                              this.getCurrentY(x, this.state.random)
                              ? abc[Math.floor(Math.random() * abc.length)]
                              : item}
                          </Typography>
                        </Letter>
                      </Grid>
                      })
                  }
                </Grid>
              ))
            }

          </div>
        </Container>
      )
    }
}

Board.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array
}

export default Board
