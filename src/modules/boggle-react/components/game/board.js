import React, { Fragment } from 'react'

import BoggleContext from '../../context'

import styled from 'styled-components'

import { Grid, Typography } from '@material-ui/core'
import button from '../page/button'

import { arrayContainsPoint, pointsTouch } from '../../helpers'


const Letter = styled(button)`
    min-width: 50px!important;
    max-width: 50px;
    
    h1 {
        color: #ffffff;
    }
`

const Container = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
`

class Board extends React.Component {
    static contextType = BoggleContext

    render() {
        const { board } = this.context
        const { selected } = this.props
        return (
            <Container >
                {
                    board.board.map((row, x) => (
                        <Grid container spacing={8} key={x}>
                            {
                                row.map((item, y) => {
                                    const selectedItem = arrayContainsPoint(selected, {x, y})
                                    const disabled = selected.length > 0 && !selectedItem && !pointsTouch({x,y}, selected[selected.length - 1])

                                    return <Grid item xs key={y}>
                                        <Letter 
                                            color={selectedItem ? 'secondary' : 'primary'}
                                            onClick={() => this.props.onSelect({x, y})}
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

export default Board