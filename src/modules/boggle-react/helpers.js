export const pointsAreEqual = (a, b) => a.x === b.x && a.y === b.y

export const arrayContainsPoint = (xs, x) => xs.some(item => pointsAreEqual(item, x))


export const pointsTouch = (a, b) => {
    const disX = a.x - b.x;
    const disY = a.y - b.y;
    const distance = Math.sqrt( disX*disX + disY*disY );
    return distance < 2
}

export const pointTouchesAny = (p, xs) => xs.some(item => pointsTouch(item, p))

export const getS = xs => xs === 1 ? '' : 's'

export const isMobile = () => window.innerWidth <= 500
