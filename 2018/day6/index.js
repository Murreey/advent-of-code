const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const locations = []
let sizeX = 0
let sizeY = 0

input.split('\n').forEach((pair, index) => {
    const coords = pair.split(', ').map(c => parseInt(c))
    locations[index] = {
        x: parseInt(coords[0]),
        y: parseInt(coords[1]),
        area: 0
    }

    if(coords[0] > sizeX) {
        sizeX = coords[0]
    }

    if(coords[1] > sizeY) {
        sizeY = coords[1]
    }
})

const grid = new Array(sizeX + 1).fill().map(m => new Array(sizeY + 1))

for(let x = 0; x < sizeX; x++) {
    for(let y = 0; y < sizeX; y++) {
        let closestDistance = 99999999
        let closestPoint = "."

        locations.forEach((loc, index) => {
            const distance = Math.abs(x - loc.x) + Math.abs(y - loc.y)
            if(distance < closestDistance) {
                closestDistance = distance
                closestPoint = index
            } else if(distance == closestDistance) {
                closestPoint = "."
            }
        })

        if(closestPoint !== ".") {
            grid[x][y] = closestPoint
            locations[closestPoint].area++
        }
    }
}

const infinites = []
for(let x = 0; x < sizeX; x++) {
    infinites.push(grid[x][0])
}
for(let y = 0; y < sizeX; y++) {
    infinites.push(grid[0][y])
}

const areas = locations.filter((loc, index) => !infinites.includes(index))

const biggestArea = areas.reduce((max, area) => {
    if(area.area > max) {
        return area.area
    }

    return max
}, 0)

console.log(`Biggest area: ${biggestArea}`)

let regionSize = 0

for(let x = 0; x < sizeX; x++) {
    for(let y = 0; y < sizeX; y++) {
        let totalDistance = 0
        locations.forEach((loc) => {
            totalDistance = totalDistance + Math.abs(x - loc.x) + Math.abs(y - loc.y)
        })

        if(totalDistance < 10000) {
            regionSize++
        }
    }
}

console.log(`Region size of all points with total distance < 10,000: ${regionSize}`)