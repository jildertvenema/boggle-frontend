import React from 'react'

import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
    text-transform: none !important;
    span {
        font-size: large;
    }
`

export default props => <StyledButton variant='contained' color='primary' {...props} />
