import styled from 'styled-components'

export default styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

  @media screen and (max-width: 500px) {
    
    height: 60px;
    background: lighten(#e73c7e, 10%);
    background-image: linear-gradient(to bottom, #e73c7e, rgba(0, 0, 0, 0));
    transform-origin: 50% 48%;
    border-bottom-left-radius: 43%;
    border-bottom-right-radius: 43%;
  }
`
