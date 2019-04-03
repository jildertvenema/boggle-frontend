import React from 'react'
import PropTypes from 'prop-types'

import BoggleContext from '../../context'

import styled from 'styled-components'

import { Grid, Typography } from '@material-ui/core'
import button from '../page/button'

import { arrayContainsPoint, pointsTouch } from '../../helpers'

const Letter = styled(button)`
    min-width: 50px!important;
    max-width: 50px;
    margin-top: 5px;
    
    h1 {
        color: #ffffff;
    }
`

const Container = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
    width: 300px;
    margin:  0 auto;
`

class Board extends React.Component {
    static contextType = BoggleContext

    render () {
      const { board } = this.context
      const { selected } = this.props
      return (
        <Container >
          {
            board.board.map((row, x) => (
              <Grid container spacing={8} key={x}>
                {
                row.map((item, y) => {
                    const selectedItem = arrayContainsPoint(selected, { x, y })
                    const disabled = selected.length > 0 && !selectedItem && !pointsTouch({ x, y }, selected[selected.length - 1])

                    return <Grid item xs key={y}>
                      <Letter
                        color={selectedItem ? 'secondary' : 'primary'}
                        onClick={() => this.props.onSelect({ x, y })}
                        disabled={disabled}
                            >
                        <Typography variant='display1'>{item}</Typography>
                      </Letter>
                    </Grid>
                    })
                }
              </Grid>
            ))
        }
        </Container>
      )
    }
}

Board.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array
}

export default Board
