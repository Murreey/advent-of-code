const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

let points = []

input.split('\n').forEach((line) => {
    const firstBracket = line.indexOf('<')
    const position = line.substring(firstBracket + 1, line.indexOf('>', firstBracket)).replace(/ /g, '')
    const secondBracket = line.indexOf('<', firstBracket + 1)
    const velocity = line.substring(secondBracket + 1, line.indexOf('>', secondBracket)).replace(/ /g, '')

    points.push({
        posX: parseInt(position.split(',')[0]),
        posY: parseInt(position.split(',')[1]),
        velX: parseInt(velocity.split(',')[0]),
        velY: parseInt(velocity.split(',')[1])
    })
})

let smallestSize = 100000

function iterate(pointList, direction = 1) {
    return pointList.map((point) => {
        point.posX = point.posX + (point.velX * direction)
        point.posY = point.posY + (point.velY * direction)

        return point
    })
}

let stop = false
let seconds = 0
while(!stop) {
    points = iterate(points)

    const maxX = points.reduce((max, val) => max > val.posX ? max : val.posX, 0)
    if(maxX < smallestSize) {
        smallestSize = maxX
        seconds++
    } else {
        points = iterate(points, -1)
        stop = true
    }
}

const maxX = points.reduce((max, val) => max > val.posX ? max : val.posX, 0)
const maxY = points.reduce((max, val) => max > val.posY ? max : val.posY, 0)
const minX = points.reduce((min, val) => min < val.posX ? min : val.posX, 999999)
const minY = points.reduce((min, val) => min < val.posY ? min : val.posY, 999999)

const grid = new Array(maxY - minY + 1).fill().map(m => new Array(maxX - minX + 1).fill().map(n => ' '))

points.forEach((point) => {
    grid[point.posY - minY][point.posX - minX] = "#"
})
grid.forEach((line) => {
    console.log(line.join(''))
})

console.log(`Formation took ${seconds} seconds to appear.`)