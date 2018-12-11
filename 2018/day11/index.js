const input = 5153

const gridSize = 300

const grid = new Array(gridSize + 1).fill().map(m => new Array(gridSize + 1).fill().map(n => 0))

for(let x = 0; x < gridSize; x++) {
    for(let y = 0; y < gridSize; y++) {
        let rackID = x + 10
        let power = ((rackID * y) + input) * rackID
        if(power >= 100) {
            power = power.toString().substr(power.toString().length - 3, 1)
        } else {
            power = 0
        }
        power = power - 5

        grid[x][y] = power
    }
}

let highestPowerSquare = {
    power: 0,
    x: 0,
    y: 0,
    size: 0
}

for(let s = 1; s < gridSize; s++) {
    for(let x = 0; x < gridSize - s + 1; x++) {
        for(let y = 0; y < gridSize - s + 1; y++) {
            let power = 0 
            for(let i = 0; i < s; i++) {
                for(let j = 0; j < s; j++) {
                    let xCoord = x + i > gridSize ? gridSize : x + i
                    let yCoord = y + j > gridSize ? gridSize : y + j
                    power = power + grid[xCoord][yCoord]
                }
            }

            if(power > highestPowerSquare.power) {
                highestPowerSquare = { power, x, y, size: s }
                console.log(highestPowerSquare)
            }
        }
    }
}