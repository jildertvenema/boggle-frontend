import styled from 'styled-components'
import Button from '../page/button'

export default styled(Button)`
    min-width: 50px!important;
    max-width: 50px;
    margin-top: 5px;
    
    h1 {
        color: #ffffff;
    }

    animation: spaceboots 0.2s;
    transform-origin: 50% 50%;
    animation-iteration-count: 3;
    animation-timing-function: linear;

    @keyframes spaceboots {
        0% {
            transform: translate(2px, 1px) rotate(0deg);
        }
        10% {
            transform: translate(-1px, -2px) rotate(-1deg);
        }
        20% {
            transform: translate(-3px, 0px) rotate(1deg);
        }
        30% {
            transform: translate(0px, 2px) rotate(0deg);
        }
        40% {
            transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
            transform: translate(-1px, 2px) rotate(-1deg);
        }
        60% {
            transform: translate(-3px, 1px) rotate(0deg);
        }
        70% {
            transform: translate(2px, 1px) rotate(-1deg);
        }
        80% {
            transform: translate(-1px, -1px) rotate(1deg);
        }
        90% {
            transform: translate(2px, 2px) rotate(0deg);
        }
        100% {
            transform: translate(1px, -2px) rotate(-1deg);
        }
  }
`
