import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Typography, Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import Button from './button'

import Gif, { Leave } from './gif'

const Disconnected = props => <Fragment>
  <Typography variant='display2'>Sorry!</Typography>
  <Typography variant='headline' gutterBottom>Your opponent disconnected..</Typography>
  <Gif src={Leave} />
  <Grid container direction='row' justify='flex-end' spacing={8}>
    <Grid item>
      <Button color='primary' onClick={() => props.history.push('/')}>Back</Button>
    </Grid>
  </Grid>
</Fragment>

Disconnected.propTypes = {
  history: PropTypes.object
}

export default withRouter(Disconnected)
