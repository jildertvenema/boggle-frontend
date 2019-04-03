import React from 'react'

import styled from 'styled-components'

const Spinner = styled.div`
 width: 70px;
  height: 100px;
  border-radius: 50%;
  background-color: #7de3f5;
  margin: 40px auto;
  position: relative;
  overflow: hidden;
  -webkit-animation: rotateGlass 4s infinite ease-in-out;
  
  &:before {
    content: "";
    width: 0; 
    height: 0; 
    display: block;
    position: absolute; 
    z-index: 30;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 30px solid transparent;
  }

  &:after {
    content: "";
    width: 0; 
    height: 0; 
    right: 0;
    display: block;
    position: absolute; 
    z-index: 30;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-right: 30px solid transparent;
  }

    @keyframes rotateGlass {
        40% {
            -webkit-transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        90% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(0deg);
        }
    }
`

const Sand = styled.div`
    &:before {
        content: "";
        width: 70px;

        background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
        background-size: 400% 400%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50%;
        z-index: 10;
        animation: dropsand 4s infinite ease-in-out, Gradient 10s ease infinite;
    }
    
    &:after {
        content: "";
        width: 0; 
        height: 0; 
        display: block;
        position: absolute; 
        border-left: 0px solid transparent;
        border-right: 70px solid transparent;
        border-top: 100px solid rgba(255,255,255, 0.4);
        z-index: 20;
        }

    @keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

    @keyframes dropsand {
        0% { 
            bottom: 50%; 
        }
        
        35% {
            bottom: 0%;
            top: 50%;
        }
        
        50% {
            bottom: 0%;
            top: 50%;
        }
        
        85% {
            top: 0;
            bottom: 50%; 
        }
    }
`

export default () => <Spinner><Sand /></Spinner>
