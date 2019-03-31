import React from 'react'


const random = xs => xs[Math.floor(Math.random() * xs.length)]

export const Leave = random([ 's0FsE5TsEF8g8','ef0zYcOodmbTMQZjkU', 'RHS4uBLwvRNUA','7DzlajZNY5D0I', '3XiQswSmbjBiU'])

export const Waiting = random(['LXHJRRjnviw7e', 'tXL4FHPSnVJ0A', 'A6YO96sBmr1te', 'bkcbX8SqTCXHG'])

export const Secret = random(['ejP8zPAorQPYs', '26FL7sQXG1oT6qBy0'])

export const Lose = random(['sRJ3wPAyIxICA', '3o7TKnrXco2SC0XM1q', 'gXhBZfzijya76', 'atbiDI1fXpYUU'])

export const Win = random(['4jc0C6sRsKcFO', 'b09xElu8in7Lq', '3fk9lvhoApWww', 'eHxnl41nTrY4w'])

export const Draw = random(['26gQZVvtZ6TR1EMlW'])

export default props => <img width='100%' src={`https://media.giphy.com/media/${props.src}/giphy.gif`} />
