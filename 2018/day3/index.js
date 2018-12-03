const fs = require('fs');
const input = fs.readFileSync('input.txt', "utf8")

const areas = input.split('\n').map((square) => ({
    id: parseInt(square.substring(1, square.indexOf(' '))),
    top: parseInt(square.substring(square.indexOf('@ ') + 2, square.indexOf(','))),
    left: parseInt(square.substring(square.indexOf(',') + 1, square.indexOf(':'))),
    height: parseInt(square.substring(square.indexOf(': ') + 2, square.indexOf('x'))),
    width: parseInt(square.substring(square.indexOf('x') + 1)),
    overlapped: false
}))

const fabric = []
let count = 0

areas.forEach((area) => {
    for(let h = 0; h < area.height; h++) {
        for(let w = 0; w < area.width; w++) {
            const x = area.top + h
            const y = area.left + w
            if(fabric[x] === undefined) {
                fabric[x] = []
            }

            if(fabric[x][y] > 0) {
                fabric[x][y] = "X"
                count++
                area.overlapped = true
                areas[fabric[x][y] - 1].overlapped = true
            } else if(fabric[x][y] === "X") {
                area.overlapped = true
            } else if(!fabric[x][y]) {
                fabric[x][y] = area.id
            }
        }
    }
})

console.log(`Overlap: ${count} square inches`)
console.log(`ID ${areas.filter(area => !area.overlapped)[0].id} did not overlap!`)
