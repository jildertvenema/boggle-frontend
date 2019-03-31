import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    text-align:center;
    margin-top: 1rem;
`

const Content = styled.div`
    display: inline-block;
    max-width: 92%;
    margin: 0 auto;
`

export default ({ children }) => <Container>
    <Content>
        {children}
    </Content>
</Container>