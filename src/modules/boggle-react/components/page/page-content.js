import React from 'react'
import PropTypes from 'prop-types'
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

const PageContent = ({ children }) => <Container>
  <Content>
    {children}
  </Content>
</Container>

PageContent.propTypes = {
  children: PropTypes.node
}

export default PageContent
